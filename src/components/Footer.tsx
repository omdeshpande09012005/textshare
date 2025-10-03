// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 dark:border-white/10 light:border-gray-200 bg-surface-900 dark:bg-surface-900 light:bg-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 rounded-lg bg-brand-500 shadow-glow-sm flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-brand-600">
                TextShare
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 dark:text-white/60 light:text-text-dark/60 leading-relaxed mb-4">
              Your complete sharing toolkit. Share text, files, URLs, QR codes & bio links—all in one aesthetic platform. ✨
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white/80 dark:text-white/80 light:text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/create" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Create Paste
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Upload Files
                </Link>
              </li>
              <li>
                <Link href="/shorten" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Shorten URL
                </Link>
              </li>
              <li>
                <Link href="/qr" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  QR Generator
                </Link>
              </li>
              <li>
                <Link href="/linktree" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  LinkTree
                </Link>
              </li>
            </ul>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white/80 dark:text-white/80 light:text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/getting-started" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/features" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/docs/faqs" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/docs/limits" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Usage Limits
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-brand-400 dark:text-white/60 dark:hover:text-brand-400 light:text-gray-700 light:hover:text-brand-600 transition-colors flex items-center gap-2 group">
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white/80 dark:text-white/80 light:text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider">Developer</h3>
            <div className="mb-3 sm:mb-4">
              <p className="text-xs text-white/60 dark:text-white/60 light:text-gray-600 mb-1.5">Made with ✨ and 💜 by</p>
              <p className="text-base sm:text-lg font-bold text-brand-400 dark:text-brand-400 light:text-brand-600 mb-3">
                Om Deshpande
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/in/omdeshpande09"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 dark:bg-white/5 light:bg-white hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-500/15 border border-white/10 dark:border-white/10 light:border-gray-300 hover:border-brand-500/50 transition-all"
              >
                <svg className="w-4 h-4 text-white/60 dark:text-white/60 light:text-brand-600 group-hover:text-brand-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm font-medium text-white/80 dark:text-white/80 light:text-gray-800 group-hover:text-white dark:group-hover:text-white light:group-hover:text-brand-600 transition-colors">LinkedIn</span>
              </a>
              <a
                href="https://github.com/omdeshpande09012005"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 dark:bg-white/5 light:bg-white hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-500/15 border border-white/10 dark:border-white/10 light:border-gray-300 hover:border-brand-500/50 transition-all"
              >
                <svg className="w-4 h-4 text-white/60 dark:text-white/60 light:text-brand-600 group-hover:text-brand-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm font-medium text-white/80 dark:text-white/80 light:text-gray-800 group-hover:text-white dark:group-hover:text-white light:group-hover:text-brand-600 transition-colors">GitHub</span>
              </a>
              <a
                href="https://my-portfolio-omdeshpande09012005s-projects.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 dark:bg-white/5 light:bg-white hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-500/15 border border-white/10 dark:border-white/10 light:border-gray-300 hover:border-brand-500/50 transition-all"
              >
                <svg className="w-4 h-4 text-white/60 dark:text-white/60 light:text-brand-600 group-hover:text-brand-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-sm font-medium text-white/80 dark:text-white/80 light:text-gray-800 group-hover:text-white dark:group-hover:text-white light:group-hover:text-brand-600 transition-colors">Portfolio</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-text-dark/10">
          <p className="text-xs sm:text-sm text-center text-white/40 dark:text-white/40 light:text-text-dark/40">
            © {new Date().getFullYear()} TextShare — Share everything, no cap ✨
          </p>
        </div>
      </div>
    </footer>
  );
}
