// src/app/about/page.tsx
"use client";

import Link from "next/link";
import FloatingActionMenu from "@/components/FloatingActionMenu";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-sm font-medium">Our Story</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white via-brand-300 to-accent bg-clip-text text-transparent">
            About TextShare
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            The story behind your all-in-one sharing platform ✨
          </p>
        </div>

        {/* Story Content */}
        <div className="space-y-12">
          {/* The Beginning */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🚀</div>
              <h2 className="text-3xl font-bold">The Beginning</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                TextShare was born out of a simple frustration: <span className="text-white font-semibold">sharing stuff online was way too complicated</span>. 
                Need to share code? Upload to Pastebin. Need to share files? Use Dropbox. Need a bio link? Pay for Linktree. 
                Need a QR code? Find some random generator. It was exhausting.
              </p>
              <p>
                We thought, <span className="text-brand-400 font-semibold">"What if there was ONE place that could do ALL of this?"</span> And not just do it, 
                but do it <span className="text-accent font-semibold">beautifully, fast, and without making you create an account</span>.
              </p>
            </div>
          </div>

          {/* The Build */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">⚡</div>
              <h2 className="text-3xl font-bold">The Build</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                We built TextShare with <span className="text-brand-400 font-semibold">Next.js 15, TypeScript, and modern web technologies</span>. 
                The goal was simple: create a platform that's lightning-fast, secure, and incredibly easy to use.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h3 className="font-semibold text-white">Tech Stack</h3>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Next.js 15 (App Router)</li>
                    <li>• TypeScript for type safety</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Edge Runtime for speed</li>
                  </ul>
                </div>
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="font-semibold text-white">Security First</h3>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Optional password protection</li>
                    <li>• Expiry settings</li>
                    <li>• Secure file storage</li>
                    <li>• No data tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* The Vision */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">✨</div>
              <h2 className="text-3xl font-bold">The Vision</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p className="text-lg">
                TextShare isn't just a tool—it's a <span className="text-brand-400 font-semibold">philosophy</span>:
              </p>
              <div className="grid gap-4 mt-6">
                <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Simplicity First</h4>
                    <p className="text-sm">No accounts, no complex setup. Just paste, upload, or create and share.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                  <div className="text-2xl">🚀</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Speed Matters</h4>
                    <p className="text-sm">Built on the edge for lightning-fast performance worldwide.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Privacy Respected</h4>
                    <p className="text-sm">We don't track you, sell your data, or show you ads. Ever.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                  <div className="text-2xl">💎</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Beautiful Design</h4>
                    <p className="text-sm">Modern, clean UI that works perfectly on any device.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div className="bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🎁</div>
              <h2 className="text-3xl font-bold">What We Offer</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-6 text-white/80">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📝</span>
                <span>Text & Code Sharing with Syntax Highlighting</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📁</span>
                <span>File Upload & Sharing (up to 50MB)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔗</span>
                <span>URL Shortening with Custom Aliases</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <span>QR Code Generator with Custom Styles</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <span>Bio Link Pages (LinkTree Alternative)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔐</span>
                <span>Password Protection & Expiry Options</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-12 backdrop-blur-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Sharing?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust TextShare for all their sharing needs. 
              No signup required—just start sharing!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl text-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started Now
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      <FloatingActionMenu />
    </div>
  );
}
