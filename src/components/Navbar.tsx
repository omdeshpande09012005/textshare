"use client";

import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <div className="w-full bg-surface-900 dark:bg-surface-900 light:bg-surface-cream border-b border-white/10 dark:border-white/10 light:border-text-dark/10">
      <nav className="mx-auto max-w-[1100px] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
              {/* Simple navy blue background */}
              <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-brand-500 group-hover:bg-brand-600 transition-colors duration-300" />
              
              {/* Lightning bolt icon */}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="text-base sm:text-lg font-bold text-white dark:text-white light:text-text-dark group-hover:text-brand-400 transition-colors duration-300">
                TextShare
              </div>
              <div className="text-[10px] sm:text-xs text-white/50 dark:text-white/50 light:text-text-dark/50 -mt-0.5 hidden xs:block">
                share everything • no cap ✨
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Documentation Links */}
          <Link
            href="/docs/getting-started"
            className="inline-flex px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-white/70 dark:text-white/70 light:text-text-dark/70 hover:text-brand-500 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-text-dark/5 transition-all text-xs sm:text-sm font-medium"
          >
            Getting Started
          </Link>

          <Link
            href="/docs/features"
            className="inline-flex px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-white/70 dark:text-white/70 light:text-text-dark/70 hover:text-brand-500 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-text-dark/5 transition-all text-xs sm:text-sm font-medium"
          >
            Features
          </Link>

          <Link
            href="/docs/faqs"
            className="inline-flex px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-white/70 dark:text-white/70 light:text-text-dark/70 hover:text-brand-500 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-text-dark/5 transition-all text-xs sm:text-sm font-medium"
          >
            FAQs
          </Link>

          <Link
            href="/docs/limits"
            className="inline-flex px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-white/70 dark:text-white/70 light:text-text-dark/70 hover:text-brand-500 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-text-dark/5 transition-all text-xs sm:text-sm font-medium"
          >
            Limits
          </Link>

          <Link
            href="/docs/api"
            className="inline-flex px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-white/70 dark:text-white/70 light:text-text-dark/70 hover:text-brand-500 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-text-dark/5 transition-all text-xs sm:text-sm font-medium"
          >
            API
          </Link>

          <Link
            href="/contact"
            className="inline-flex px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-white/70 dark:text-white/70 light:text-text-dark/70 hover:text-brand-500 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-text-dark/5 transition-all text-xs sm:text-sm font-medium"
          >
            Contact
          </Link>

          <Link
            href="/about"
            className="inline-flex px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-white/70 dark:text-white/70 light:text-text-dark/70 hover:text-brand-500 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-text-dark/5 transition-all text-xs sm:text-sm font-medium"
          >
            About
          </Link>

          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
