// src/app/api/files/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const fileRecord = await prisma.file.findUnique({
      where: { slug },
    });

    if (!fileRecord) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Check if expired
    if (fileRecord.expiresAt && new Date() > fileRecord.expiresAt) {
      return NextResponse.json(
        { error: "This file has expired" },
        { status: 410 }
      );
    }

    // Check max downloads
    if (fileRecord.maxDownloads && fileRecord.downloadCount >= fileRecord.maxDownloads) {
      return NextResponse.json(
        { error: "This file has reached its maximum downloads" },
        { status: 410 }
      );
    }

    // If file is part of a bundle, fetch all bundle files
    let bundleFiles = null;
    if (fileRecord.bundleSlug) {
      const allBundleFiles = await prisma.file.findMany({
        where: { bundleSlug: fileRecord.bundleSlug },
        select: {
          slug: true,
          originalName: true,
          size: true,
          mimeType: true,
        },
      });
      bundleFiles = allBundleFiles.map((f: { slug: string; originalName: string; size: number; mimeType: string }) => ({
        slug: f.slug,
        filename: f.originalName,
        size: f.size,
        mimeType: f.mimeType,
      }));
    }

    return NextResponse.json({
      slug: fileRecord.slug,
      filename: fileRecord.originalName,
      mimeType: fileRecord.mimeType,
      size: fileRecord.size,
      title: fileRecord.title,
      downloads: fileRecord.downloadCount,
      hasPassword: !!fileRecord.passwordHash,
      createdAt: fileRecord.createdAt,
      expiresAt: fileRecord.expiresAt,
      bundleSlug: fileRecord.bundleSlug,
      bundleFiles: bundleFiles,
    });

  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}

// Download file
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const fileRecord = await prisma.file.findUnique({
      where: { slug },
    });

    if (!fileRecord) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Check expiry and limits
    if (fileRecord.expiresAt && new Date() > fileRecord.expiresAt) {
      return NextResponse.json(
        { error: "This file has expired" },
        { status: 410 }
      );
    }

    if (fileRecord.maxDownloads && fileRecord.downloadCount >= fileRecord.maxDownloads) {
      return NextResponse.json(
        { error: "This file has reached its maximum downloads" },
        { status: 410 }
      );
    }

    // Increment download count
    await prisma.file.update({
      where: { slug },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    });

    // Decode base64 file data from database
    const fileBuffer = Buffer.from(fileRecord.fileData, 'base64');

    // Return file
    return new NextResponse(fileBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": fileRecord.mimeType,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(fileRecord.originalName)}"`,
        "Content-Length": fileRecord.size.toString(),
      },
    });

  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}
