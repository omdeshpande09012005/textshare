// src/app/api/files/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LIMITS, formatFileSize, calculateExpiryDate } from "@/lib/limits";
import { checkRateLimit, checkUploadRateLimit } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";
import path from "path";

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
    const uploadLimit = checkUploadRateLimit(req);

    if (!generalLimit.success) {
      return NextResponse.json(
        { 
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((generalLimit.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": generalLimit.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(generalLimit.reset).toISOString(),
            "Retry-After": Math.ceil((generalLimit.reset - Date.now()) / 1000).toString(),
          }
        }
      );
    }

    if (!uploadLimit.success) {
      return NextResponse.json(
        { 
          error: `Upload limit exceeded. Maximum ${LIMITS.RATE_LIMIT.MAX_UPLOADS_PER_HOUR} uploads per hour.`,
          retryAfter: Math.ceil((uploadLimit.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": uploadLimit.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(uploadLimit.reset).toISOString(),
            "Retry-After": Math.ceil((uploadLimit.reset - Date.now()) / 1000).toString(),
          }
        }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const password = formData.get("password") as string | null;
    const expiresIn = formData.get("expiresIn") as string | null;
    const maxDownloads = formData.get("maxDownloads") as string | null;
    const customSlug = formData.get("customSlug") as string | null;
    const bundleSlug = formData.get("bundleSlug") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > LIMITS.FILES.MAX_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${formatFileSize(LIMITS.FILES.MAX_SIZE)} limit` },
        { status: 400 }
      );
    }

    // Validate file type
    if (!LIMITS.FILES.ALLOWED_TYPES.includes(file.type as never) && file.type !== "") {
      return NextResponse.json(
        { error: `File type ${file.type} is not allowed` },
        { status: 400 }
      );
    }

    // Generate or use custom slug
    let slug = customSlug?.trim() || generateSlug();
    
    if (customSlug) {
      const existing = await prisma.file.findUnique({ where: { slug } });
      if (existing) {
        return NextResponse.json(
          { error: "Custom slug already taken" },
          { status: 409 }
        );
      }
    } else {
      let attempts = 0;
      while (attempts < 5) {
        const existing = await prisma.file.findUnique({ where: { slug } });
        if (!existing) break;
        slug = generateSlug();
        attempts++;
      }
    }

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.name);
    const filename = `${slug}_${timestamp}${ext}`;
    
    // Convert file to base64 for database storage (Vercel-compatible)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileData = buffer.toString('base64');

    // Hash password if provided
    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    // Calculate expiry date (enforce automatic expiry for free tier)
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
          expiresAt = calculateExpiryDate(LIMITS.EXPIRATION.DEFAULT_FILE_EXPIRY_DAYS);
      }
    } else {
      // Always set expiry for free tier (default 7 days)
      expiresAt = calculateExpiryDate(LIMITS.EXPIRATION.DEFAULT_FILE_EXPIRY_DAYS);
    }

    // Create file record in database with base64 data
    const fileRecord = await prisma.file.create({
      data: {
        slug,
        filename,
        originalName: file.name,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        fileData, // Store base64 encoded file data
        title: title || null,
        passwordHash,
        expiresAt,
        maxDownloads: maxDownloads ? parseInt(maxDownloads) : null,
        bundleSlug: bundleSlug || null,
      },
    });

    return NextResponse.json({
      slug: fileRecord.slug,
      fileUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/f/${fileRecord.slug}`,
      filename: fileRecord.originalName,
      size: fileRecord.size,
      createdAt: fileRecord.createdAt,
      expiresAt: fileRecord.expiresAt,
    }, { status: 201 });

  } catch (error) {
    console.error("Error uploading file:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Log detailed error for debugging in production
    console.error("Detailed error:", {
      message: errorMessage,
      stack: errorStack,
      error: JSON.stringify(error, null, 2)
    });
    
    return NextResponse.json(
      { 
        error: "Failed to upload file",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
