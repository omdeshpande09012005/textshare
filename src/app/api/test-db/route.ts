// src/app/api/test-db/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Try to create a test paste
    const testPaste = await prisma.paste.create({
      data: {
        slug: `test-${Date.now()}`,
        content: "Database connection test",
        contentType: "text",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    // Try to fetch it back
    const fetched = await prisma.paste.findUnique({
      where: { slug: testPaste.slug },
    });

    // Delete the test paste
    await prisma.paste.delete({
      where: { slug: testPaste.slug },
    });

    return NextResponse.json({
      success: true,
      message: "Database is working correctly!",
      testSlug: testPaste.slug,
      fetched: !!fetched,
    });
  } catch (error) {
    console.error("Database test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
