"use client";

import React, { useState } from "react";
import Link from "next/link";
import QRCodeGenerator from "@/components/QRCodeGenerator";

const expiryOptions = [
  { label: "Never", value: "" },
  { label: "10 minutes", value: "10m" },
  { label: "1 hour", value: "1h" },
  { label: "1 day", value: "1d" },
  { label: "1 week", value: "7d" },
];

const codeLanguages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "PHP", value: "php" },
  { label: "Ruby", value: "ruby" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JSON", value: "json" },
  { label: "SQL", value: "sql" },
  { label: "Bash", value: "bash" },
  { label: "YAML", value: "yaml" },
  { label: "XML", value: "xml" },
  { label: "Markdown", value: "markdown" },
  { label: "Plain Text", value: "text" },
];

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState("text");
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ slug?: string; url?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!content.trim()) {
      setError("Paste content can't be empty.");
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        title: title || undefined,
        content,
        contentType: contentType === "code" ? `code-${codeLanguage}` : contentType,
        password: password || undefined,
        expiresIn: expiry || undefined,
      };

      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setError(body?.error ?? `Create failed (${res.status})`);
      } else {
        const slug = body?.paste?.slug ?? body?.slug;
        const url = slug ? `${window.location.origin}/p/${slug}` : undefined;
        setResult({ slug, url });
      }
    } catch (err: any) {
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  }

  const [urlCopied, setUrlCopied] = useState(false);
  const [slugCopied, setSlugCopied] = useState(false);

  const copyLink = async () => {
    if (result?.url) {
      await navigator.clipboard.writeText(result.url);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
      
      const el = document.createElement("div");
      el.textContent = "✓ Link copied to clipboard!";
      el.className = "fixed top-4 right-4 bg-green-500/90 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-up z-50";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }
  };

  const copySlug = async () => {
    if (result?.slug) {
      await navigator.clipboard.writeText(result.slug);
      setSlugCopied(true);
      setTimeout(() => setSlugCopied(false), 2000);
      
      const el = document.createElement("div");
      el.textContent = "✓ Slug copied to clipboard!";
      el.className = "fixed top-4 right-4 bg-green-500/90 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-up z-50";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setContentType("text");
    setCodeLanguage("javascript");
    setPassword("");
    setExpiry("");
    setResult(null);
    setError(null);
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
          <div className="text-center mb-8 animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500/40 mb-6 animate-bounce-slow shadow-glow-green">
              <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
              Paste Created! 🎉
            </h1>
            <p className="text-lg text-white/70">Your paste is ready to share with the world</p>
          </div>

          <div className="relative bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-8 backdrop-blur-xl space-y-6 animate-fade-up overflow-hidden" style={{ animationDelay: "0.1s" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 via-accent/5 to-brand-500/5 animate-gradient-xy" />
            
            <div className="relative z-10 space-y-6">
              {/* Paste URL Display */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Paste URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={result.url}
                    readOnly
                    onClick={(e) => e.currentTarget.select()}
                    className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent cursor-pointer transition-all hover:bg-white/15"
                  />
                  <button
                    onClick={copyLink}
                    className={`group relative px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden ${
                      urlCopied 
                        ? "bg-gradient-to-r from-green-600 to-green-500 shadow-glow-green" 
                        : "bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent shadow-glow-sm hover:shadow-glow-md"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
                    <span className="relative z-10 flex items-center gap-2">
                      {urlCopied ? (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>

              {/* Slug Code */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/20">
                <div className="flex flex-col items-start gap-3">
                  <div className="text-xs text-white/50 uppercase tracking-wider">
                    SHARE CODE
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <code className="flex-1 text-2xl font-bold font-mono bg-white/10 px-4 py-3 rounded-lg text-brand-300 border border-white/20 text-center">
                      {result.slug}
                    </code>
                    <button
                      onClick={copySlug}
                      className="flex-shrink-0 p-3 bg-brand-500 hover:bg-brand-600 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
                      title="Copy code"
                    >
                      {slugCopied ? (
                        <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-white/40">
                    💡 Share this code for quick access on the home page
                  </p>
                </div>
              </div>

              {/* QR Code */}
              <div className="relative pt-4 pb-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-surface-900 px-3 py-1 rounded-full text-white/50 border border-white/10">
                    Scan to Access
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-accent rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative bg-white p-5 rounded-2xl shadow-2xl transform transition-transform group-hover:scale-105">
                    <QRCodeGenerator 
                      value={result.url || ""} 
                      size={240}
                      title={`Paste_${result.slug}`}
                    />
                  </div>
                </div>
                
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
                              await navigator.share({
                                files: [file],
                                title: 'QR Code',
                                text: `Scan this QR code to access: ${result.url}`
                              });
                            }
                          });
                        }
                      } catch (err) {
                        console.error('Error sharing QR code:', err);
                      }
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-brand-500 to-accent hover:from-brand-400 hover:to-blue-500 rounded-xl text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share QR Code
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-6">
                <Link
                  href={result.url || "#"}
                  className="group relative px-6 py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-brand-500/50 rounded-xl font-semibold transition-all duration-300 text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-500/0 via-brand-500/10 to-brand-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Paste
                  </span>
                </Link>
                <button
                  onClick={resetForm}
                  className="group relative px-6 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-semibold transition-all duration-300 shadow-glow-sm hover:shadow-glow-md overflow-hidden transform hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Another
                  </span>
                </button>
              </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Text Sharing</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">
            Create a Paste
          </h1>
          <p className="text-xl text-white/60 dark:text-white/60 light:text-text-dark/70">
            Share code, text, or markdown with optional security
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <div className="space-y-6">
            {/* Title & Content Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title (optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My awesome code"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white border border-white/20 dark:border-white/20 light:border-brand-300 text-black dark:text-white placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Content Type
                </label>
                <div className="relative">
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white border border-white/20 dark:border-white/20 light:border-brand-300 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all cursor-pointer appearance-none"
                  >
                    <option value="text" className="bg-surface-800">Plain text</option>
                    <option value="markdown" className="bg-surface-800">Markdown</option>
                    <option value="code" className="bg-surface-800">Code</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Language Selector (only shown when contentType is "code") */}
            {contentType === "code" && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Programming Language
                </label>
                <div className="relative">
                  <select
                    value={codeLanguage}
                    onChange={(e) => setCodeLanguage(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white border border-white/20 dark:border-white/20 light:border-brand-300 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all cursor-pointer appearance-none"
                  >
                    {codeLanguages.map((lang) => (
                      <option key={lang.value} value={lang.value} className="bg-surface-800">
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Content Textarea */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Content <span className="text-red-400">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={contentType === "code" ? "// Paste your code here..." : contentType === "markdown" ? "# Paste your markdown here..." : "Paste your text here..."}
                rows={14}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white border border-white/20 dark:border-white/20 light:border-brand-300 text-black dark:text-white placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all font-mono text-sm resize-none"
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
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white border border-white/20 dark:border-white/20 light:border-brand-300 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all cursor-pointer appearance-none"
                  >
                    {expiryOptions.map((o) => (
                      <option key={o.value} value={o.value} className="bg-surface-800">
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
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
                  className="w-full px-4 py-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white border border-white/20 dark:border-white/20 light:border-brand-300 text-black dark:text-white placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>
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
              disabled={loading}
              className="w-full group relative px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-md hover:shadow-glow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Create Paste
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
                To keep TextShare free for everyone: <strong>20 pastes/hour</strong>, <strong>500KB max text</strong>. Pastes expire after <strong>7 days</strong> (max 90 days).
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
