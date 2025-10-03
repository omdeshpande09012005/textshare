// src/components/LinkTreeClient.tsx
"use client";
import { useState } from "react";

interface Link {
  title: string;
  url: string;
}

interface LinkTreeData {
  slug: string;
  username: string;
  bio: string | null;
  links: Link[];
  views: number;
  createdAt: Date;
}

export default function LinkTreeClient({ linkTree }: { linkTree: LinkTreeData }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleLinkClick = async (url: string, title: string) => {
    // Track click (optional - could add API call here)
    console.log(`Clicked: ${title}`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 via-purple-900/20 to-surface-900 dark:from-surface-900 dark:via-purple-900/20 dark:to-surface-900 light:from-gray-50 light:via-blue-50 light:to-gray-50 text-white dark:text-white light:text-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-30 dark:opacity-30 light:opacity-5" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 dark:bg-brand-500/20 light:bg-blue-200/30 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 dark:bg-accent/20 light:bg-indigo-200/30 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
        {/* Header - Profile Section */}
        <div className="text-center mb-8 animate-fade-up">
          {/* Avatar Placeholder */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-accent dark:from-brand-500 dark:to-accent light:from-brand-600 light:to-brand-500 mb-4 text-4xl font-bold shadow-glow-md text-white dark:text-white light:text-white">
            {linkTree.username.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-white dark:text-white light:text-gray-900">
            @{linkTree.username}
          </h1>

          {linkTree.bio && (
            <p className="text-lg text-white/70 dark:text-white/70 light:text-gray-700 max-w-md mx-auto leading-relaxed">
              {linkTree.bio}
            </p>
          )}

          {/* View Count */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 backdrop-blur-md shadow-sm">
            <svg className="w-4 h-4 text-brand-400 dark:text-brand-400 light:text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-sm text-white/60 dark:text-white/60 light:text-gray-700">{linkTree.views.toLocaleString()} views</span>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-4 mb-8">
          {linkTree.links.map((link, index) => (
            <button
              key={index}
              onClick={() => handleLinkClick(link.url, link.title)}
              className="group w-full relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 light:from-white light:to-gray-50 border border-white/20 dark:border-white/20 light:border-gray-300 hover:border-white/30 dark:hover:border-white/30 light:hover:border-brand-500 p-6 backdrop-blur-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 active:scale-95 overflow-hidden animate-fade-up shadow-lg light:shadow-md"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500/0 via-accent/0 to-brand-500/0 group-hover:from-brand-500/10 group-hover:via-accent/10 group-hover:to-brand-500/10 transition-all duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-shine animate-shimmer" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-lg font-semibold text-white dark:text-white light:text-gray-900 group-hover:text-brand-200 dark:group-hover:text-brand-200 light:group-hover:text-brand-700 transition-colors">
                  {link.title}
                </span>
                <svg className="w-5 h-5 text-white/40 dark:text-white/40 light:text-gray-600 group-hover:text-white dark:group-hover:text-white light:group-hover:text-brand-700 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Share Section */}
        <div className="relative rounded-2xl bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-white light:to-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 p-6 backdrop-blur-xl overflow-hidden shadow-lg light:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 via-accent/5 to-brand-500/5 animate-gradient-xy" />
          
          <div className="relative z-10">
            <h3 className="text-sm font-semibold text-white/80 dark:text-white/80 light:text-gray-900 mb-3 text-center">Share This Page</h3>
            
            <button
              onClick={handleCopyLink}
              className="w-full group relative px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 overflow-hidden text-white shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {copiedLink ? (
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
                    Copy Link
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 dark:text-white/40 light:text-gray-600 hover:text-white/60 dark:hover:text-white/60 light:hover:text-brand-600 transition-colors"
          >
            <span>Made with</span>
            <span className="text-red-400 dark:text-red-400 light:text-red-500">✨</span>
            <span className="font-medium text-brand-500 dark:text-brand-400 light:text-brand-600">
              TextShare
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
