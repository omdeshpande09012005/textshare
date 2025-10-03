// src/app/api/pastes/[slug]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return NextResponse.json({ error: "missing_slug" }, { status: 400 });

  const paste = await prisma.paste.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
      contentType: true,
      passwordHash: true,
      maxViews: true,
      viewCount: true,
      createdAt: true,
      expiresAt: true,
    },
  });

  if (!paste) return NextResponse.json({ error: "not_found" }, { status: 404 });

  // expiry check
  if (paste.expiresAt && paste.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "expired" }, { status: 410 });
  }

  // if protected, do not return content
  const isProtected = !!paste.passwordHash;
  const response = {
    slug: paste.slug,
    title: paste.title,
    content: isProtected ? null : paste.content,
    contentType: paste.contentType,
    protected: isProtected,
    maxViews: paste.maxViews,
    viewCount: paste.viewCount,
    createdAt: paste.createdAt,
    expiresAt: paste.expiresAt,
  };

  return NextResponse.json({ ok: true, paste: response });
}
