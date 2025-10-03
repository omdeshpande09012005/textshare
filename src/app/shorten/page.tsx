// src/app/shorten/page.tsx
"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QRCodeGenerator from "@/components/QRCodeGenerator";

export default function ShortenPage() {
  const router = useRouter();
  const [originalUrl, setOriginalUrl] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [expiresIn, setExpiresIn] = useState("never");
  const [maxClicks, setMaxClicks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    shortUrl: string;
    slug: string;
    originalUrl: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalUrl,
          title: title || undefined,
          password: password || undefined,
          customSlug: customSlug || undefined,
          expiresIn,
          maxClicks: maxClicks ? parseInt(maxClicks) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create short URL");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.shortUrl);
    }
  };

  const resetForm = () => {
    setOriginalUrl("");
    setTitle("");
    setPassword("");
    setCustomSlug("");
    setExpiresIn("never");
    setMaxClicks("");
    setResult(null);
    setError("");
  };



  if (result) {
    return (
      <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40 dark:opacity-40 light:opacity-20" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 dark:bg-brand-500/20 light:bg-white rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 dark:bg-accent/20 light:bg-accent/10 rounded-full blur-[120px] animate-float-slow" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-4 animate-pop">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Short URL Created!</h1>
            <p className="text-white/60">Your shortened URL is ready to share</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl space-y-6">
            {/* Short URL Display */}
            <div>
              <label className="block text-sm text-white/60 mb-2">Short URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={result.shortUrl}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Original URL */}
            <div>
              <label className="block text-sm text-white/60 mb-2">Original URL</label>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 break-all">
                {result.originalUrl}
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center gap-3 py-4">
              <QRCodeGenerator 
                value={result.shortUrl} 
                size={200}
                title={`URL_${result.slug}`}
              />
              {/* Share QR Code Button */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={async () => {
                    try {
                      const canvas = document.querySelector('canvas');
                      if (canvas) {
                        canvas.toBlob(async (blob) => {
                          if (blob) {
                            const file = new File([blob], `qr-code-${result.slug}.png`, { type: 'image/png' });
                            try {
                              await navigator.share({
                                files: [file],
                                title: 'QR Code',
                                text: `QR Code for: ${result.shortUrl}`
                              });
                            } catch (shareErr) {
                              const error = shareErr as Error;
                              if (error.name !== 'AbortError') {
                                await navigator.share({
                                  title: 'Short URL',
                                  url: result.shortUrl
                                });
                              }
                            }
                          }
                        });
                      }
                    } catch (err) {
                      console.error('Error sharing:', err);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-white"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share QR Code
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Link
                href={`/u/${result.slug}`}
                className="flex-1 text-center px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl font-semibold transition-all duration-300"
              >
                View Short URL
              </Link>
              <button
                onClick={resetForm}
                className="flex-1 px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-xl font-semibold transition-all duration-300"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40 dark:opacity-40 light:opacity-20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 dark:bg-brand-500/20 light:bg-white rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 dark:bg-accent/20 light:bg-accent/10 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        {/* Back to Home Button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/5 dark:bg-white/5 light:bg-white hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-50 border border-white/10 dark:border-white/10 light:border-brand-300 hover:border-brand-500/50 backdrop-blur-md transition-all duration-300 group text-white dark:text-white light:text-text-dark text-sm"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 backdrop-blur-md mb-6">
            <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="text-sm font-medium">URL Shortener</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">
            Shorten Your URL
          </h1>
          <p className="text-xl text-white/60 dark:text-white/60 light:text-text-dark/70">
            Create short, memorable links with optional security features
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <div className="space-y-6">
            {/* Original URL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Long URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/very/long/url/that/needs/shortening"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Custom Alias */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/30">
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                Custom Alias (optional)
              </label>
              <div className="flex items-stretch gap-2">
                <div className="flex items-center px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white/60 text-sm font-mono">
                  {window.location.origin}/u/
                </div>
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                  placeholder="my-custom-link"
                  pattern="[a-z0-9-_]+"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all font-mono"
                />
              </div>
              <p className="text-xs text-white/50 mt-2 flex items-start gap-1">
                <svg className="w-3 h-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Create a memorable, custom link. Leave empty for auto-generated short code.</span>
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Title (optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My awesome link"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Advanced Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expiry */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Expires in
                </label>
                <div className="relative">
                  <select
                    value={expiresIn}
                    onChange={(e) => setExpiresIn(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all cursor-pointer appearance-none"
                  >
                    <option value="never" className="bg-surface-800">Never</option>
                    <option value="1h" className="bg-surface-800">1 hour</option>
                    <option value="24h" className="bg-surface-800">24 hours</option>
                    <option value="7d" className="bg-surface-800">7 days</option>
                    <option value="30d" className="bg-surface-800">30 days</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Max Clicks */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Max clicks (optional)
                </label>
                <input
                  type="number"
                  value={maxClicks}
                  onChange={(e) => setMaxClicks(e.target.value)}
                  placeholder="Unlimited"
                  min="1"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password (optional)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Protect with password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-md hover:shadow-glow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Shorten URL
                  </>
                )}
              </span>
            </button>
          </div>
        </form>

        {/* Usage Limits Info Banner */}
        <div className="mt-8 bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/20 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-2xl">ℹ️</div>
            <div>
              <h3 className="font-semibold text-white dark:text-white light:text-text-dark mb-1">Fair Usage Limits</h3>
              <p className="text-sm text-white/70 dark:text-white/70 light:text-text-dark/80 mb-2">
                To keep TextShare free for everyone: <strong>30 URLs/hour</strong>, <strong>2048 chars max</strong>. URLs expire after <strong>30 days</strong> (max 90 days).
              </p>
              <Link 
                href="/docs/limits"
                className="inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
              >
                View all limits
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-white/60 dark:text-white/60 light:text-text-dark/70 hover:text-white dark:hover:text-white light:hover:text-text-dark transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
