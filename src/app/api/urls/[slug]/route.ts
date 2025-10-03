// src/app/api/urls/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const url = await prisma.url.findUnique({
      where: { slug },
    });

    if (!url) {
      return NextResponse.json(
        { error: "URL not found" },
        { status: 404 }
      );
    }

    // Check if expired
    if (url.expiresAt && new Date() > url.expiresAt) {
      return NextResponse.json(
        { error: "This short URL has expired" },
        { status: 410 }
      );
    }

    // Check max clicks
    if (url.maxClicks && url.clicks >= url.maxClicks) {
      return NextResponse.json(
        { error: "This short URL has reached its maximum clicks" },
        { status: 410 }
      );
    }

    return NextResponse.json({
      slug: url.slug,
      originalUrl: url.originalUrl,
      title: url.title,
      clicks: url.clicks,
      hasPassword: !!url.passwordHash,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
    });

  } catch (error) {
    console.error("Error fetching URL:", error);
    return NextResponse.json(
      { error: "Failed to fetch URL" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Increment click count
    const url = await prisma.url.update({
      where: { slug },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true, clicks: url.clicks });

  } catch (error) {
    console.error("Error incrementing clicks:", error);
    return NextResponse.json(
      { error: "Failed to increment clicks" },
      { status: 500 }
    );
  }
}
