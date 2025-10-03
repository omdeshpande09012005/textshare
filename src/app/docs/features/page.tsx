// src/app/docs/features/page.tsx
"use client";
import Link from "next/link";
import FloatingActionMenu from "@/components/FloatingActionMenu";

export default function FeaturesPage() {
  const features = [
    {
      icon: "📝",
      title: "Text Paste",
      description: "Share code snippets, notes, or any text content with syntax highlighting support",
      color: "from-brand-500 to-brand-600",
      link: "/create",
      features: [
        "Markdown support",
        "Syntax highlighting",
        "Password protection",
        "Custom expiry times",
        "One-time view option"
      ]
    },
    {
      icon: "📁",
      title: "File Upload",
      description: "Upload and share files up to 10MB with anyone, anywhere",
      color: "from-accent to-orange-600",
      link: "/upload",
      features: [
        "Multiple file support",
        "Drag & drop interface",
        "File bundles",
        "Direct downloads",
        "Mobile sharing"
      ]
    },
    {
      icon: "🔗",
      title: "URL Shortener",
      description: "Convert long URLs into short, shareable links",
      color: "from-purple-500 to-purple-600",
      link: "/shorten",
      features: [
        "Custom short codes",
        "Click analytics",
        "QR code generation",
        "Link expiry options",
        "Bulk URL shortening"
      ]
    },
    {
      icon: "📱",
      title: "QR Code Generator",
      description: "Create customizable QR codes for URLs, text, and more",
      color: "from-cyan-500 to-cyan-600",
      link: "/qr",
      features: [
        "Customizable colors",
        "Multiple styles",
        "High resolution",
        "Download & share",
        "Direct mobile scanning"
      ]
    },
    {
      icon: "🌳",
      title: "LinkTree",
      description: "Create a bio link page with all your important links in one place",
      color: "from-green-500 to-green-600",
      link: "/linktree",
      features: [
        "Unlimited links",
        "Custom themes",
        "Social media icons",
        "Analytics tracking",
        "Mobile optimized"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-20 dark:opacity-20 light:opacity-10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/10 light:bg-white rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 dark:bg-accent/10 light:bg-accent/5 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/20 border-2 border-brand-500/30 mb-6">
            ✨
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">
            Features
          </h1>
          <p className="text-lg text-white/60 dark:text-white/60 light:text-text-dark/70">
            Everything you need to share content like a pro
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 backdrop-blur-xl shadow-xl hover:shadow-glow-md transition-all duration-300 animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
                  <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {feature.features.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={feature.link}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${feature.color} rounded-lg font-semibold text-sm hover:shadow-glow-sm transition-all duration-300`}
              >
                Try it Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Features Section */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-2xl font-bold mb-6 text-center">What Makes Us Different?</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-white/60">Share content in seconds with our optimized platform</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-white/60">End-to-end encryption and auto-expiry for security</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">No Signup Required</h3>
              <p className="text-sm text-white/60">Start sharing immediately without creating an account</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-sm text-white/60">Fully responsive design works perfectly on all devices</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Customizable</h3>
              <p className="text-sm text-white/60">Personalize colors, themes, and settings to your liking</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Always Free</h3>
              <p className="text-sm text-white/60">Core features are completely free, forever</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-500 to-accent rounded-xl font-bold text-lg hover:shadow-glow-lg transition-all duration-300"
          >
            Start Using TextShare
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      <FloatingActionMenu />
    </div>
  );
}
