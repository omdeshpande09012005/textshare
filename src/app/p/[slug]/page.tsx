// src/app/p/[slug]/page.tsx
import React from "react";
import ProtectedPasteClient from "@/components/ProtectedPasteClient";
import MarkdownWrapper from "@/components/MarkdownWrapper";
import PasteActions from "@/components/PasteActions";
import AutoIncrementView from "@/components/AutoIncrementView";
import ExpiryBadge from "@/components/ExpiryBadge";
import SlugCopyButton from "@/components/SlugCopyButton";

type PasteMeta = {
  slug: string;
  title?: string | null;
  content?: string | null;
  contentType: string;
  protected: boolean;
  maxViews?: number | null;
  viewCount: number;
  createdAt: string;
  expiresAt?: string | null;
};

function looksLikeMarkdown(text?: string) {
  if (!text) return false;
  const t = text.trim();
  // simple heuristics:
  if (/^#{1,6}\s+/m.test(t)) return true; // headings
  if (/^>\s+/m.test(t)) return true; // blockquote
  if (/^-\s+/m.test(t) || /^\*\s+/m.test(t) || /^\d+\.\s+/m.test(t)) return true; // lists
  if (/```[\s\S]*?```/.test(t)) return true; // fenced code blocks
  if (/\[.+\]\(.+\)/.test(t)) return true; // links like [text](url)
  return false;
}

async function fetchPasteMeta(slug: string) {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL !== ""
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "http://localhost:3000";

  const url = `${base}/api/pastes/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    let body: any = null;
    try {
      body = await res.json();
    } catch {
      body = await res.text();
    }
    return { ok: res.ok && body?.ok, paste: body?.paste, status: res.status, body };
  } catch (err: any) {
    return { ok: false, status: 500, body: err?.message ?? "fetch error" };
  }
}

export default async function PastePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  if (!slug) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="p-6 bg-yellow-50 rounded">Missing slug in URL.</div>
      </main>
    );
  }

  const result = await fetchPasteMeta(slug);

  if (!result.ok || !result.paste) {
    return (
      <main className="min-h-screen bg-surface-900 text-white flex items-start justify-center py-12 px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float-slow" />
        </div>

        <div className="relative z-10 w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-glow-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Paste Not Found</h1>
            <div className="text-sm text-red-400 mb-4">Status: {result.status}</div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <pre className="text-sm overflow-auto text-white/70">
              {JSON.stringify(result.body, null, 2)}
            </pre>
          </div>
          
          <div className="text-center text-sm text-white/60">
            This paste may have expired, been deleted, or never existed. 
            {result.status === 404 && " Try creating a new one!"}
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-semibold transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  const paste = result.paste as PasteMeta;
  const displayPath = `/p/${paste.slug}`;

  // Auto-detect markdown: either explicit contentType or heuristics on the content text
  const isMarkdown =
    String(paste.contentType).toLowerCase() === "markdown" || looksLikeMarkdown(paste.content || undefined);

  // server-side quick check: will expire within 1 hour?
  const willExpireSoon =
    paste.expiresAt && new Date(paste.expiresAt).getTime() - Date.now() < 60 * 60 * 1000 && new Date(paste.expiresAt).getTime() > Date.now();

  return (
    <main className="min-h-screen bg-surface-900 text-white py-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[56rem]">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-glow-md">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {paste.title ?? paste.slug}
              </h1>
              {/* Expiry badge (client) — hides itself if no expiry */}
              <ExpiryBadge expiresAt={paste.expiresAt ?? null} />
            </div>

            {/* Created date + Views: the Views area is client-driven for non-protected */}
            <div className="text-right text-xs text-white/60">
              <div>Created: {new Date(paste.createdAt).toLocaleString()}</div>

              {paste.protected ? (
                // For protected pastes show server value (will update after unlock)
                <div>Views: {paste.viewCount}</div>
              ) : (
                // For public pastes, mount client component to auto-increment & display updated count
                <AutoIncrementView slug={paste.slug} initial={paste.viewCount} />
              )}
            </div>
          </div>

          {/* Optional banner when expiring soon */}
          {willExpireSoon && (
            <div className="mb-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4 text-sm text-yellow-300 flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>This paste will expire within an hour. Save it now if you need it! ⏰</span>
            </div>
          )}

          <div className="mt-6">
            {paste.protected ? (
              <>
                <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>This paste is password protected</span>
                </div>
                <ProtectedPasteClient slug={paste.slug} />
              </>
            ) : (
              <>
                {isMarkdown ? (
                  <div className="prose prose-invert prose-brand max-w-none mt-4 bg-white/5 border border-white/10 rounded-xl p-6">
                    <MarkdownWrapper content={paste.content ?? ""} />
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap break-words bg-white/5 border border-white/10 p-6 rounded-xl font-mono text-sm mt-4 text-white/90 overflow-x-auto">
{paste.content}
                  </pre>
                )}

                {/* Slug Code Display - Prominent */}
                <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/20">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Share Code</div>
                      <div className="flex items-center gap-3">
                        <code className="text-2xl font-bold font-mono bg-white/10 px-4 py-2 rounded-lg text-brand-300 border border-white/20">
                          {paste.slug}
                        </code>
                        <SlugCopyButton slug={paste.slug} />
                      </div>
                      <p className="text-xs text-white/50 mt-2">Share this code with others to let them view this paste</p>
                    </div>

                    <PasteActions slug={paste.slug} path={displayPath} content={paste.content ?? undefined} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
