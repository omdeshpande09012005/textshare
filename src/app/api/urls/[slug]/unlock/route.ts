// src/app/api/urls/[slug]/unlock/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { password } = await req.json();

    const url = await prisma.url.findUnique({
      where: { slug },
    });

    if (!url) {
      return NextResponse.json(
        { error: "URL not found" },
        { status: 404 }
      );
    }

    if (!url.passwordHash) {
      return NextResponse.json(
        { error: "This URL is not password protected" },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(password, url.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      originalUrl: url.originalUrl,
      slug: url.slug,
      title: url.title,
    });

  } catch (error) {
    console.error("Error unlocking URL:", error);
    return NextResponse.json(
      { error: "Failed to unlock URL" },
      { status: 500 }
    );
  }
}
