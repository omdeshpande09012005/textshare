// src/app/docs/getting-started/page.tsx
"use client";
import Link from "next/link";
import FloatingActionMenu from "@/components/FloatingActionMenu";

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-20 dark:opacity-20 light:opacity-10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/10 light:bg-white rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 dark:bg-accent/10 light:bg-accent/5 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/20 border-2 border-brand-500/30 mb-6">
            🚀
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">
            Getting Started
          </h1>
          <p className="text-lg text-white/60 dark:text-white/60 light:text-text-dark/70">
            Learn how to use TextShare in minutes
          </p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 text-xl">1</span>
              What is TextShare?
            </h2>
            <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 leading-relaxed mb-4">
              TextShare is your go-to platform for sharing content quickly and securely. No signup required, no hassle - just share and go!
            </p>
            <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4">
              <p className="text-sm text-brand-300 dark:text-brand-300 light:text-brand-700">
                💡 <strong>Pro Tip:</strong> All shares are ephemeral - they expire automatically to keep your data secure.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 text-xl">2</span>
              Quick Start Guide
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  A
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Share Text</h3>
                  <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 text-sm">
                    Click "Create Paste" → Type or paste your content → Get a shareable link
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  B
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Upload Files</h3>
                  <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 text-sm">
                    Click "Upload File" → Select your files → Share the generated link
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  C
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shorten URLs</h3>
                  <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 text-sm">
                    Click "Shorten URL" → Paste your long link → Get a tiny URL
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  D
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Generate QR Codes</h3>
                  <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 text-sm">
                    Click "QR Generator" → Enter URL → Customize & download
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  E
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Create LinkTree</h3>
                  <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 text-sm">
                    Click "LinkTree" → Add your links & social profiles → Get a bio link page
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 text-xl">3</span>
              Using Access Codes
            </h2>
            <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 leading-relaxed mb-4">
              Every share gets a unique code. Share this code with others to give them access to your content.
            </p>
            <div className="bg-surface-800/50 rounded-xl p-4 border border-white/10">
              <code className="text-brand-400 text-sm">
                Example: abc123def456
              </code>
            </div>
            <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 text-sm mt-4">
              Recipients can enter this code on the homepage to instantly access your shared content.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 text-xl">4</span>
              Security Features
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="font-semibold">Password Protection</h3>
                </div>
                <p className="text-sm text-white/70">Optionally protect your shares with a password</p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-semibold">Auto-Expiry</h3>
                </div>
                <p className="text-sm text-white/70">Shares automatically expire after set duration</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent rounded-xl font-semibold hover:shadow-glow-md transition-all duration-300"
              >
                Start Sharing Now
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/docs/features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-all duration-300 border border-white/10"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FloatingActionMenu />
    </div>
  );
}
