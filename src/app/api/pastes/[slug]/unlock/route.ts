// src/app/api/pastes/[slug]/unlock/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type UnlockBody = { password?: string };

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return NextResponse.json({ error: "missing_slug" }, { status: 400 });

  // parse body
  const body = (await req.json().catch(() => ({}))) as UnlockBody;
  const password = (body.password ?? "").toString();

  // fetch paste
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

  // If paste is NOT protected (no passwordHash), reveal content and increment viewCount atomically
  if (!paste.passwordHash) {
    // transaction: increment and return content
    const [updated] = await prisma.$transaction([
      prisma.paste.update({
        where: { id: paste.id },
        data: { viewCount: { increment: 1 } },
        select: { viewCount: true },
      }),
    ]);
    return NextResponse.json({ ok: true, content: paste.content, contentType: paste.contentType, viewCount: updated.viewCount });
  }

  // For protected paste: verify password
  const ok = await bcrypt.compare(password, paste.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "invalid_password" }, { status: 401 });
  }

  // password correct -> increment viewCount transactionally and return content
  const [updated] = await prisma.$transaction([
    prisma.paste.update({
      where: { id: paste.id },
      data: { viewCount: { increment: 1 } },
      select: { viewCount: true },
    }),
  ]);

  return NextResponse.json({ ok: true, content: paste.content, contentType: paste.contentType, viewCount: updated.viewCount });
}
