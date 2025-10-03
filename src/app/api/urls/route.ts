// src/app/api/urls/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LIMITS, isValidUrl as validateUrl, calculateExpiryDate } from "@/lib/limits";
import { checkRateLimit, checkUrlRateLimit } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";

// Generate a random short code (slug)
function generateSlug(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";
  for (let i = 0; i < 6; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}

export async function POST(req: NextRequest) {
  try {
    // Check rate limits
    const generalLimit = checkRateLimit(req);
    const urlLimit = checkUrlRateLimit(req);

    if (!generalLimit.success || !urlLimit.success) {
      const limit = !urlLimit.success ? urlLimit : generalLimit;
      return NextResponse.json(
        { 
          error: !urlLimit.success 
            ? `URL shortening limit exceeded. Maximum ${LIMITS.RATE_LIMIT.MAX_URLS_PER_HOUR} URLs per hour.`
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
    const { originalUrl, title, password, expiresIn, maxClicks, customSlug } = body;

    // Validate required fields
    if (!originalUrl) {
      return NextResponse.json(
        { error: "Original URL is required" },
        { status: 400 }
      );
    }

    // Validate URL length
    if (originalUrl.length > LIMITS.URL.MAX_URL_LENGTH) {
      return NextResponse.json(
        { error: `URL exceeds maximum length of ${LIMITS.URL.MAX_URL_LENGTH} characters` },
        { status: 400 }
      );
    }

    // Validate title length
    if (title && title.length > LIMITS.URL.MAX_TITLE_LENGTH) {
      return NextResponse.json(
        { error: `Title exceeds maximum length of ${LIMITS.URL.MAX_TITLE_LENGTH} characters` },
        { status: 400 }
      );
    }

    // Validate URL format
    if (!validateUrl(originalUrl)) {
      return NextResponse.json(
        { error: "Invalid URL format. Must start with http:// or https://" },
        { status: 400 }
      );
    }

    // Generate or use custom slug
    let slug = customSlug?.trim() || generateSlug();
    
    // Check if custom slug is already taken
    if (customSlug) {
      const existing = await prisma.url.findUnique({ where: { slug } });
      if (existing) {
        return NextResponse.json(
          { error: "Custom slug already taken" },
          { status: 409 }
        );
      }
    } else {
      // Ensure generated slug is unique
      let attempts = 0;
      while (attempts < 5) {
        const existing = await prisma.url.findUnique({ where: { slug } });
        if (!existing) break;
        slug = generateSlug();
        attempts++;
      }
    }

    // Hash password if provided
    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    // Calculate expiry date (always set expiry for free tier)
    let expiresAt: Date;
    if (expiresIn && expiresIn !== "never") {
      const now = new Date();
      switch (expiresIn) {
        case "1h":
          expiresAt = new Date(now.getTime() + 60 * 60 * 1000);
          break;
        case "24h":
          expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case "7d":
          expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case "30d":
          expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          expiresAt = calculateExpiryDate(LIMITS.EXPIRATION.DEFAULT_URL_EXPIRY_DAYS);
      }
    } else {
      // Always set expiry for free tier (default 30 days)
      expiresAt = calculateExpiryDate(LIMITS.EXPIRATION.DEFAULT_URL_EXPIRY_DAYS);
    }

    // Create URL in database
    const url = await prisma.url.create({
      data: {
        slug,
        originalUrl,
        title: title || null,
        passwordHash,
        expiresAt,
        maxClicks: maxClicks || null,
      },
    });

    return NextResponse.json({
      slug: url.slug,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/u/${url.slug}`,
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { error: "Failed to create short URL" },
      { status: 500 }
    );
  }
}
