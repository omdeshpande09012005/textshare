// src/app/docs/limits/page.tsx
"use client";
import FloatingActionMenu from "@/components/FloatingActionMenu";

export default function LimitsPage() {
  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-20 dark:opacity-20 light:opacity-10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/10 light:bg-white rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 dark:bg-accent/10 light:bg-accent/5 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/20 border-2 border-brand-500/30 mb-6">
            ⚖️
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">
            Usage Limits & Fair Use
          </h1>
          <p className="text-lg text-white/60 dark:text-white/60 light:text-text-dark/70 max-w-2xl mx-auto">
            To keep TextShare free, fast, and sustainable for everyone, we've implemented fair usage limits. Most users never hit these during normal use! 🚀
          </p>
        </div>

        {/* Why Limits? */}
        <div className="mb-12 bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/20 rounded-2xl p-6 sm:p-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center text-2xl">
              💡
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Why do we have limits?</h2>
              <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 leading-relaxed mb-4">
                TextShare is completely free with no ads or premium tiers. These limits help us:
              </p>
              <ul className="space-y-2 text-white/70 dark:text-white/70 light:text-text-dark/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand-400 mt-1">✓</span>
                  <span>Prevent abuse and spam that could affect all users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-400 mt-1">✓</span>
                  <span>Keep the service fast and reliable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-400 mt-1">✓</span>
                  <span>Maintain sustainable hosting costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-400 mt-1">✓</span>
                  <span>Ensure fair access for everyone</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">⏱️</span>
            Rate Limits
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* General Rate Limit */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl hover:shadow-glow-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-xl">
                  🌐
                </div>
                <h3 className="text-xl font-bold">General Requests</h3>
              </div>
              <p className="text-3xl font-bold text-brand-400 mb-2">50 requests</p>
              <p className="text-white/60 dark:text-white/60 light:text-text-dark/70 mb-4">per 15 minutes</p>
              <p className="text-sm text-white/50 dark:text-white/50 light:text-text-dark/60">
                Applies to all API calls including viewing shares, downloading files, and accessing pages.
              </p>
            </div>

            {/* File Upload Limit */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl hover:shadow-glow-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-xl">
                  📁
                </div>
                <h3 className="text-xl font-bold">File Uploads</h3>
              </div>
              <p className="text-3xl font-bold text-accent mb-2">10 uploads</p>
              <p className="text-white/60 dark:text-white/60 light:text-text-dark/70 mb-4">per hour</p>
              <p className="text-sm text-white/50 dark:text-white/50 light:text-text-dark/60">
                Covers all file upload operations including single files and bundles.
              </p>
            </div>

            {/* Paste Limit */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl hover:shadow-glow-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center text-xl">
                  📝
                </div>
                <h3 className="text-xl font-bold">Text Pastes</h3>
              </div>
              <p className="text-3xl font-bold text-brand-400 mb-2">20 pastes</p>
              <p className="text-white/60 dark:text-white/60 light:text-text-dark/70 mb-4">per hour</p>
              <p className="text-sm text-white/50 dark:text-white/50 light:text-text-dark/60">
                For creating text shares, code snippets, and notes.
              </p>
            </div>

            {/* URL Shortener Limit */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl hover:shadow-glow-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-xl">
                  🔗
                </div>
                <h3 className="text-xl font-bold">URL Shortening</h3>
              </div>
              <p className="text-3xl font-bold text-cyan-400 mb-2">30 URLs</p>
              <p className="text-white/60 dark:text-white/60 light:text-text-dark/70 mb-4">per hour</p>
              <p className="text-sm text-white/50 dark:text-white/50 light:text-text-dark/60">
                For creating shortened links and QR codes.
              </p>
            </div>

            {/* Contact Form Limit */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl hover:shadow-glow-sm transition-all duration-300 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-xl">
                  📧
                </div>
                <h3 className="text-xl font-bold">Contact Form</h3>
              </div>
              <p className="text-3xl font-bold text-green-400 mb-2">50 submissions</p>
              <p className="text-white/60 dark:text-white/60 light:text-text-dark/70 mb-4">per 15 minutes</p>
              <p className="text-sm text-white/50 dark:text-white/50 light:text-text-dark/60">
                Prevents spam while allowing legitimate contact requests.
              </p>
            </div>
          </div>
        </div>

        {/* Content Limits */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">📦</span>
            Content Limits
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* File Size */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="text-lg font-bold mb-2">File Size</h3>
              <p className="text-2xl font-bold text-brand-400 mb-1">10 MB</p>
              <p className="text-sm text-white/60 dark:text-white/60 light:text-text-dark/70">per file</p>
            </div>

            {/* Total Upload Size */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl">
              <div className="text-4xl mb-3">📦</div>
              <h3 className="text-lg font-bold mb-2">Total Upload</h3>
              <p className="text-2xl font-bold text-accent mb-1">25 MB</p>
              <p className="text-sm text-white/60 dark:text-white/60 light:text-text-dark/70">max 5 files</p>
            </div>

            {/* Text Paste Size */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-lg font-bold mb-2">Text Paste</h3>
              <p className="text-2xl font-bold text-brand-400 mb-1">500 KB</p>
              <p className="text-sm text-white/60 dark:text-white/60 light:text-text-dark/70">~500,000 chars</p>
            </div>

            {/* URL Length */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl">
              <div className="text-4xl mb-3">🔗</div>
              <h3 className="text-lg font-bold mb-2">URL Length</h3>
              <p className="text-2xl font-bold text-cyan-400 mb-1">2048</p>
              <p className="text-sm text-white/60 dark:text-white/60 light:text-text-dark/70">characters max</p>
            </div>

            {/* LinkTree Links */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl">
              <div className="text-4xl mb-3">🌳</div>
              <h3 className="text-lg font-bold mb-2">LinkTree</h3>
              <p className="text-2xl font-bold text-green-400 mb-1">10 links</p>
              <p className="text-sm text-white/60 dark:text-white/60 light:text-text-dark/70">per page</p>
            </div>

            {/* Storage Total */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl">
              <div className="text-4xl mb-3">💾</div>
              <h3 className="text-lg font-bold mb-2">Storage Cap</h3>
              <p className="text-2xl font-bold text-purple-400 mb-1">500 MB</p>
              <p className="text-sm text-white/60 dark:text-white/60 light:text-text-dark/70">total limit</p>
            </div>
          </div>
        </div>

        {/* Expiry Times */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">⏰</span>
            Auto-Expiry
          </h2>
          
          <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl p-6 backdrop-blur-xl">
            <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 mb-6">
              All content automatically expires to keep the service sustainable. Here are the default and maximum expiry times:
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 dark:bg-white/5 light:bg-brand-500/5 rounded-lg">
                <div className="text-2xl mb-2">📁</div>
                <h4 className="font-bold mb-1">Files</h4>
                <p className="text-brand-400 font-semibold">7 days</p>
                <p className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60 mt-1">default</p>
              </div>
              
              <div className="text-center p-4 bg-white/5 dark:bg-white/5 light:bg-brand-500/5 rounded-lg">
                <div className="text-2xl mb-2">📝</div>
                <h4 className="font-bold mb-1">Pastes</h4>
                <p className="text-brand-400 font-semibold">7 days</p>
                <p className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60 mt-1">default</p>
              </div>
              
              <div className="text-center p-4 bg-white/5 dark:bg-white/5 light:bg-brand-500/5 rounded-lg">
                <div className="text-2xl mb-2">🔗</div>
                <h4 className="font-bold mb-1">URLs</h4>
                <p className="text-brand-400 font-semibold">30 days</p>
                <p className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60 mt-1">default</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-brand-500/10 border border-brand-500/20 rounded-lg">
              <p className="text-sm text-white/70 dark:text-white/70 light:text-text-dark/80">
                <strong className="text-brand-400">Maximum expiry:</strong> 90 days for all content types. You can set custom expiry when creating shares.
              </p>
            </div>
          </div>
        </div>

        {/* What happens when you hit a limit */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">🚦</span>
            What happens if I hit a limit?
          </h2>
          
          <div className="bg-gradient-to-br from-accent/10 to-brand-500/10 border border-accent/20 rounded-2xl p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-xl">
                  ⚠️
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Rate Limit Reached</h3>
                  <p className="text-white/70 dark:text-white/70 light:text-text-dark/80">
                    You'll see a friendly message like "Too many requests. Please try again in X minutes." Just wait for the cooldown period to reset!
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center text-xl">
                  ⏱️
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Cooldown Periods</h3>
                  <p className="text-white/70 dark:text-white/70 light:text-text-dark/80">
                    Rate limits reset automatically after the specified time (15 minutes for general requests, 1 hour for specific features).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-xl">
                  💚
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">No Permanent Blocks</h3>
                  <p className="text-white/70 dark:text-white/70 light:text-text-dark/80">
                    We never permanently block users. Limits automatically reset, and you can continue using TextShare as normal!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/20 rounded-2xl p-6 sm:p-8 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Tips for staying within limits
          </h2>
          <ul className="space-y-3 text-white/70 dark:text-white/70 light:text-text-dark/80">
            <li className="flex items-start gap-3">
              <span className="text-brand-400 text-xl flex-shrink-0">→</span>
              <span>Combine multiple small files into a bundle instead of uploading separately</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-400 text-xl flex-shrink-0">→</span>
              <span>Use shorter expiry times if you don't need content to last long</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-400 text-xl flex-shrink-0">→</span>
              <span>Compress large files before uploading to save space</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-400 text-xl flex-shrink-0">→</span>
              <span>For code snippets, use Markdown formatting instead of uploading text files</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-400 text-xl flex-shrink-0">→</span>
              <span>Bookmark your share links instead of recreating the same content</span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center text-white/60 dark:text-white/60 light:text-text-dark/70 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <p className="mb-4">
            Need higher limits for a specific use case?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent rounded-xl font-semibold text-white hover:shadow-glow-md transition-all duration-300"
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      <FloatingActionMenu />
    </div>
  );
}
