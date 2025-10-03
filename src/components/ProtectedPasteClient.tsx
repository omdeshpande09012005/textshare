"use client";

import { useState } from "react";

export default function ProtectedPasteClient({ slug }: { slug: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewCount, setViewCount] = useState<number | null>(null);

  async function unlock(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/pastes/${encodeURIComponent(slug)}/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // show helpful errors
        if (data?.error === "invalid_password") setError("Incorrect password.");
        else if (data?.error === "expired") setError("This paste has expired.");
        else if (data?.error === "max_views_reached") setError("This paste reached its maximum views.");
        else if (data?.error === "not_found") setError("Paste not found.");
        else setError(data?.error || "Failed to unlock paste.");
        setLoading(false);
        return;
      }

      // success - display content
      setContent(data.content ?? "");
      if (typeof data.viewCount === "number") setViewCount(data.viewCount);
    } catch (err) {
      console.error("Unlock error", err);
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (content !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 px-4 py-3 rounded-xl">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Unlocked successfully! 🔓</span>
        </div>
        
        <pre className="whitespace-pre-wrap break-words bg-white/5 border border-white/10 p-6 rounded-xl font-mono text-sm text-white/90 overflow-x-auto">
{content}
        </pre>
        
        {viewCount !== null && (
          <div className="text-sm text-white/60 text-right">
            Views: <span className="text-brand-300 font-semibold">{viewCount}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={unlock} className="space-y-4 max-w-md">
      <div className="relative">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to unlock"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all pr-12"
          aria-label="Paste password"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      <button 
        type="submit" 
        disabled={loading}
        className="group relative w-full px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-sm hover:shadow-glow-md overflow-hidden"
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Unlocking...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              Unlock Paste
            </>
          )}
        </span>
      </button>
    </form>
  );
}
