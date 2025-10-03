// src/app/page.tsx
"use client";
import Link from "next/link";
import { IconText, IconFile, IconLink } from "@/components/icons";
import CodeEntry from "@/components/CodeEntry";
import FloatingActionMenu from "@/components/FloatingActionMenu";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
      {/* ANIMATED BACKGROUND LAYERS */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Mesh Gradient Base - Subtle Navy */}
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-20 dark:opacity-20 light:opacity-10" />
        
        {/* Floating Orbs - Navy Blue Theme */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/10 light:bg-white rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 dark:bg-accent/10 light:bg-accent/5 rounded-full blur-[120px] animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-500/5 light:bg-brand-500/3 rounded-full blur-[150px] animate-breathe" />
        
        {/* Animated Grid - Subtle Navy */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02] light:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(26, 95, 180, 0.2) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(26, 95, 180, 0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'scroll 60s linear infinite'
          }}
        />
        
        {/* Spotlight Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-surface-900/30 dark:to-surface-900/30 light:to-surface-cream/50 animate-spotlight" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* HERO - Compact */}
        <header className="mb-8 sm:mb-12 text-center">
          {/* Glowing Badge */}
          <div 
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 backdrop-blur-md mb-4 sm:mb-6 animate-fade-up shadow-glow-sm light:shadow-brand-200/50 text-xs sm:text-sm"
            style={{ animationDelay: "0s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="font-medium text-brand-400 dark:text-brand-400 light:text-brand-600">
              Slay Mode Activated 🔥
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.2] tracking-tight max-w-4xl mx-auto mb-3 sm:mb-4 px-2"
            style={{ animation: "none" }}
          >
            <span
              className="block animate-fade-up text-white dark:text-white light:text-text-dark mb-2"
              style={{ animationDelay: "0.06s" }}
            >
              Share literally
            </span>
            <span
              className="block animate-fade-up bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent animate-text-shimmer pt-2"
              style={{ 
                animationDelay: "0.16s",
                backgroundSize: "200% auto"
              }}
            >
              anything. No cap.
            </span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-white/60 dark:text-white/60 light:text-text-dark/70 max-w-2xl mx-auto animate-fade-up leading-relaxed px-4"
            style={{ animationDelay: "0.26s" }}
          >
            Text, files, URLs, QR codes & bio links—all in one place. Zero signup, max vibes fr fr ✨
          </p>
        </header>

        {/* QUICK ACTION GRID - Above the fold */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          {/* CODE ENTRY - Left side */}
          <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-white light:to-brand-50 border border-white/10 dark:border-white/10 light:border-brand-300 p-4 sm:p-6 md:p-8 backdrop-blur-xl overflow-hidden shadow-lg light:shadow-brand-200/50">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 via-accent/5 to-brand-500/5 animate-gradient-xy" />
            
            <div className="relative z-10">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white dark:text-white light:text-text-dark mb-1 sm:mb-2">
                  Got a code? 👀
                </h2>
                <p className="text-xs sm:text-sm text-white/50 dark:text-white/50 light:text-text-dark/60">Enter to access your content</p>
              </div>

              <CodeEntry />
            </div>
          </div>

          {/* QUICK ACTIONS - Right side */}
          <div className="grid grid-cols-1 gap-3">
            <QuickActionCard
              title="Share Text/Code"
              icon={<IconText className="w-5 h-5" />}
              link="/create"
              gradient="from-brand-500/15 to-brand-600/20"
              description="Paste & share instantly"
            />
            <QuickActionCard
              title="Shorten URL"
              icon={<IconLink className="w-5 h-5" />}
              link="/shorten"
              gradient="from-accent/15 to-brand-500/20"
              description="Make links aesthetic"
            />
            <QuickActionCard
              title="Upload Files"
              icon={<IconFile className="w-5 h-5" />}
              link="/upload"
              gradient="from-brand-600/15 to-accent/20"
              description="Up to 25MB, no cap"
            />
            <QuickActionCard
              title="QR Generator"
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>}
              link="/qr"
              gradient="from-brand-500/15 to-accent/20"
              description="Create custom QR codes"
            />
            <QuickActionCard
              title="Bio LinkTree"
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
              link="/linktree"
              gradient="from-accent/15 to-brand-600/20"
              description="One link, all socials"
            />
          </div>
        </section>

        {/* Stats Bar - Compact */}
        <div 
          className="flex justify-center mb-8 sm:mb-12 animate-fade-up px-4"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="inline-flex items-center gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 backdrop-blur-md shadow-lg light:shadow-brand-200/50">
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg font-bold text-brand-400 dark:text-brand-400 light:text-brand-600">
                Instant
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 dark:text-white/60 light:text-text-dark/60">Fast AF</div>
            </div>
            <div className="h-6 w-px bg-white/10 dark:bg-white/10 light:bg-text-dark/10" />
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg font-bold text-accent dark:text-accent light:text-brand-500">
                Private
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 dark:text-white/60 light:text-text-dark/60">On God</div>
            </div>
            <div className="h-6 w-px bg-white/10 dark:bg-white/10 light:bg-text-dark/10" />
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg font-bold text-brand-500 dark:text-brand-400 light:text-brand-600">
                Free
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 dark:text-white/60 light:text-text-dark/60">Period</div>
            </div>
          </div>
        </div>

        {/* FEATURES SHOWCASE */}
        <section className="mt-8 sm:mt-12 md:mt-16 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <div className="text-center mb-6 sm:mb-8 px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white dark:text-white light:text-text-dark">
              Why we're lowkey the best 🤷‍♂️
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/50 dark:text-white/50 light:text-text-dark/60">5 tools in one platform. Built different. No cap.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <FeatureHighlight
              title="⚡ Lightning Fast"
              description="Literally instant. Zero lag, zero buffering. We don't do slow here bestie."
              delay={0.6}
            />
            <FeatureHighlight
              title="🔒 Private by Default"
              description="Lock it up with passwords or let it vanish. Your content, your vibes, your rules fr."
              delay={0.65}
            />
            <FeatureHighlight
              title="🎨 Clean Interface"
              description="Aesthetic af. No clutter, no ads, no BS. Just pure minimalist energy ✨"
              delay={0.7}
            />
            <FeatureHighlight
              title="📱 Works Everywhere"
              description="Phone, laptop, tablet, smart fridge—we don't judge. Works on everything."
              delay={0.75}
            />
            <FeatureHighlight
              title="🎯 All-in-One"
              description="Text, files, URLs, QR codes, bio links—everything you need in one aesthetic platform."
              delay={0.8}
            />
            <FeatureHighlight
              title="💯 100% Free"
              description="No premium BS, no hidden fees, no credit card. Free forever fr fr."
              delay={0.85}
            />
          </div>
        </section>

        {/* CTA SECTION */}
        <section 
          className="mt-8 sm:mt-12 md:mt-16 text-center animate-fade-up px-4" 
          style={{ animationDelay: "0.8s" }}
        >
          <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-600/20 via-accent/15 to-brand-500/20 dark:from-brand-600/20 dark:via-accent/15 dark:to-brand-500/20 light:from-white light:to-brand-50 border border-white/10 dark:border-white/10 light:border-brand-300 p-6 sm:p-8 md:p-10 backdrop-blur-xl overflow-hidden shadow-lg light:shadow-brand-200/50">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-accent/10 to-brand-500/10 animate-gradient-xy" />
            
            {/* Floating particles - Navy Blue */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-brand-400 rounded-full animate-twinkle blur-sm" />
            <div className="absolute top-20 right-20 w-3 h-3 bg-accent rounded-full animate-twinkle blur-sm" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-10 left-1/3 w-2 h-2 bg-brand-400 rounded-full animate-twinkle blur-sm" style={{ animationDelay: "1s" }} />
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white dark:text-white light:text-text-dark px-2">
                Your complete sharing toolkit 🚀
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-white/70 dark:text-white/70 light:text-text-dark/70 max-w-2xl mx-auto px-2">
                Text, files, URLs, QR codes, bio links—everything you need in one aesthetic platform ✨
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Floating Action Menu */}
      <FloatingActionMenu />
    </div>
  );
}

// Helper Components
function FeatureHighlight({
  title,
  description,
  delay = 0
}: {
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <div
      className="group relative rounded-lg sm:rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 p-4 sm:p-6 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-50 hover:border-brand-500/30 light:hover:border-brand-400 transition-all duration-300 hover:scale-[1.02] cursor-default overflow-hidden shadow-lg light:shadow-brand-200/50"
      style={{ 
        animation: `fade-up 420ms cubic-bezier(.2,.9,.3,1) both`, 
        animationDelay: `${delay}s` 
      }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-500/20 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="text-xl sm:text-2xl mb-1.5 sm:mb-2">{title.split(' ')[0]}</div>
        <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-white dark:text-white light:text-text-dark group-hover:text-brand-400 transition-colors">
          {title.split(' ').slice(1).join(' ')}
        </h3>
        <p className="text-xs sm:text-sm text-white/60 dark:text-white/60 light:text-text-dark/70 group-hover:text-white/80 dark:group-hover:text-white/80 light:group-hover:text-text-dark transition-colors leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function QuickActionCard({
  title,
  icon,
  link,
  gradient,
  description
}: {
  title: string;
  icon: React.ReactNode;
  link: string;
  gradient: string;
  description: string;
}) {
  return (
    <Link
      href={link}
      className={`group relative rounded-lg sm:rounded-xl bg-gradient-to-br ${gradient} light:from-white light:to-brand-50 border border-white/10 dark:border-white/10 light:border-brand-300 p-3 sm:p-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-500/40 light:hover:border-brand-400 hover:shadow-glow-sm light:shadow-brand-200/50 overflow-hidden active:scale-[0.98]`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/0 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex items-center gap-2.5 sm:gap-3">
        <div className="p-2 sm:p-2.5 rounded-lg bg-white/10 dark:bg-white/10 light:bg-white group-hover:bg-brand-500/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 text-white dark:text-white light:text-brand-600 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs sm:text-sm font-bold text-white dark:text-white light:text-text-dark group-hover:text-brand-400 transition-colors truncate">
            {title}
          </div>
          <div className="text-[10px] sm:text-xs text-white/50 dark:text-white/50 light:text-text-dark/60 group-hover:text-brand-500/80 transition-colors truncate">
            {description}
          </div>
        </div>
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40 dark:text-white/40 light:text-text-dark/40 group-hover:text-brand-500 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
