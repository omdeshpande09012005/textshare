// src/app/api/pastes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { LIMITS, calculateExpiryDate } from "@/lib/limits";
import { checkRateLimit, checkPasteRateLimit } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";

/** Simple slug generator — lowercase letters + numbers */
function genSlug(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < length; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

const CreatePasteSchema = z.object({
  title: z.string().max(LIMITS.PASTE.MAX_TITLE_LENGTH).optional().transform((v) => (v === "" ? undefined : v)),
  content: z.string().min(1, "Content cannot be empty").max(LIMITS.PASTE.MAX_LENGTH, `Content exceeds maximum length of ${LIMITS.PASTE.MAX_LENGTH} characters`),
  contentType: z.enum(["text", "markdown", "html"]).default("text"),
  password: z.string().optional().transform((v) => (v === "" ? undefined : v)),
  maxViews: z.number().int().positive().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    // Check rate limits
    const generalLimit = checkRateLimit(req);
    const pasteLimit = checkPasteRateLimit(req);

    if (!generalLimit.success || !pasteLimit.success) {
      const limit = !pasteLimit.success ? pasteLimit : generalLimit;
      return NextResponse.json(
        { 
          error: !pasteLimit.success 
            ? `Paste limit exceeded. Maximum ${LIMITS.RATE_LIMIT.MAX_PASTES_PER_HOUR} pastes per hour.`
            : "Too many requests. Please try again later.",
          retryAfter: Math.ceil((limit.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(limit.reset).toISOString(),
          }
        }
      );
    }

    const body = await req.json();
    const parsed = CreatePasteSchema.parse(body);

    // generate unique-ish slug with small retry loop
    let slug = genSlug(6);
    let tries = 0;
    while (tries < 8) {
      const exists = await prisma.paste.findUnique({ where: { slug } });
      if (!exists) break;
      slug = genSlug(6);
      tries++;
    }
    if (tries >= 8) {
      return NextResponse.json({ error: "Could not generate slug" }, { status: 500 });
    }

    // hash password if present
    let passwordHash: string | null = null;
    if (parsed.password) {
      passwordHash = await bcrypt.hash(parsed.password, 10);
    }

    // Calculate expiry (always set expiry for free tier)
    const expiresAt = parsed.expiresAt 
      ? new Date(parsed.expiresAt)
      : calculateExpiryDate(LIMITS.EXPIRATION.DEFAULT_PASTE_EXPIRY_DAYS);

    const created = await prisma.paste.create({
      data: {
        slug,
        title: parsed.title ?? null,
        content: parsed.content,
        contentType: parsed.contentType,
        passwordHash,
        maxViews: parsed.maxViews ?? null,
        expiresAt,
      },
      select: {
        id: true,
        slug: true,
        createdAt: true,
        maxViews: true,
      },
    });

    return NextResponse.json({ ok: true, paste: { slug: created.slug, createdAt: created.createdAt } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "validation", details: err.flatten() }, { status: 400 });
    }
    console.error("/api/pastes error:", err);
    
    // Return detailed error for debugging
    const errorMessage = err instanceof Error ? err.message : String(err);
    const errorStack = err instanceof Error ? err.stack : undefined;
    
    // Log detailed error info
    console.error("Detailed paste error:", {
      message: errorMessage,
      stack: errorStack,
      error: JSON.stringify(err, null, 2)
    });
    
    return NextResponse.json({ 
      error: "internal",
      message: errorMessage,
      details: process.env.NODE_ENV === "development" ? errorStack : undefined
    }, { status: 500 });
  }
}
