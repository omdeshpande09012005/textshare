// src/app/api/qr/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, title, qrStyle, qrColor, bgColor } = body;

    // Validate required fields
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Generate unique slug
    const slug = nanoid(8);

    // Create QR code entry in database
    const qrCode = await prisma.qRCode.create({
      data: {
        slug,
        url,
        title: title || null,
        qrStyle: qrStyle || "squares",
        qrColor: qrColor || "#7c3aed",
        bgColor: bgColor || "#ffffff",
      },
    });

    // Return the slug and shareable URL
    const shareableUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/qr/${slug}`;

    return NextResponse.json({
      success: true,
      slug: qrCode.slug,
      url: shareableUrl,
    });
  } catch (error) {
    console.error("Error creating QR code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
