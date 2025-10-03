// src/app/api/pastes/[slug]/raw/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return NextResponse.json({ error: "missing_slug" }, { status: 400 });

  // read password from querystring if provided
  const url = new URL(req.url);
  const password = url.searchParams.get("password") ?? "";

  // load paste metadata + content + passwordHash
  const paste = await prisma.paste.findUnique({
    where: { slug },
    select: {
      id: true,
      content: true,
      passwordHash: true,
      viewCount: true,
      maxViews: true,
      expiresAt: true,
      contentType: true,
    },
  });

  if (!paste) return NextResponse.json({ error: "not_found" }, { status: 404 });

  // expiry check
  if (paste.expiresAt && paste.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "expired" }, { status: 410 });
  }

  // check maxViews
  if (typeof paste.maxViews === "number" && paste.viewCount >= paste.maxViews) {
    return NextResponse.json({ error: "max_views_reached" }, { status: 410 });
  }

  // if protected, verify password
  if (paste.passwordHash) {
    const ok = await bcrypt.compare(password, paste.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "invalid_password" }, { status: 401 });
    }
  }

  // At this point we can return content — but increment viewCount atomically
  // Use a transaction to increment and then return content.
  // Note: we only need the updated viewCount here; content is already loaded.
  try {
    const [updated] = await prisma.$transaction([
      prisma.paste.update({
        where: { id: paste.id },
        data: { viewCount: { increment: 1 } },
        select: { viewCount: true },
      }),
    ]);

    // respond as plain text
    return new NextResponse(paste.content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-View-Count": String(updated.viewCount ?? 0),
      },
    });
  } catch (err) {
    console.error("/api/pastes/[slug]/raw error:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
