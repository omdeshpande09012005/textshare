// src/app/api/linktree/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, bio, links } = body;

    if (!username || !username.trim()) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    if (!links || !Array.isArray(links) || links.length === 0) {
      return NextResponse.json(
        { error: "At least one link is required" },
        { status: 400 }
      );
    }

    // Validate links
    for (const link of links) {
      if (!link.title || !link.url) {
        return NextResponse.json(
          { error: "All links must have a title and URL" },
          { status: 400 }
        );
      }
    }

    const slug = nanoid(8);

    // Store in database (we'll add a LinkTree model)
    const linkTree = await prisma.linkTree.create({
      data: {
        slug,
        username: username.trim(),
        bio: bio?.trim() || null,
        links: links,
        views: 0,
      },
    });

    return NextResponse.json({
      slug: linkTree.slug,
      url: `/l/${linkTree.slug}`,
    });
  } catch (error: any) {
    console.error("Error creating LinkTree:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create LinkTree" },
      { status: 500 }
    );
  }
}
