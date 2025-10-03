// src/components/FloatingActionMenu.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: "Create Paste",
      href: "/create",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "from-brand-500 to-brand-600"
    },
    {
      label: "Upload File",
      href: "/upload",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      color: "from-accent to-orange-600"
    },
    {
      label: "Shorten URL",
      href: "/shorten",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      color: "from-purple-500 to-purple-600"
    },
    {
      label: "QR Generator",
      href: "/qr",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      color: "from-cyan-500 to-cyan-600"
    },
    {
      label: "LinkTree",
      href: "/linktree",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "from-green-500 to-green-600"
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Items */}
      <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-8 flex flex-col gap-2 sm:gap-3 z-50">
        {isOpen && menuItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={`group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg hover:shadow-glow-md transform hover:scale-105 transition-all duration-300 animate-scale-up`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all">
              <div className="scale-90 sm:scale-100">{item.icon}</div>
            </div>
            <span className="text-white font-semibold text-xs sm:text-sm whitespace-nowrap pr-1 sm:pr-2">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 sm:bottom-8 right-4 sm:right-8 p-3 sm:p-4 rounded-full bg-gradient-to-br from-brand-500 to-accent shadow-glow-lg hover:shadow-glow-xl transition-all duration-300 z-50 group ${
          isOpen ? 'rotate-45 scale-110' : 'animate-float-fast hover:scale-110'
        }`}
        aria-label="Quick Actions Menu"
      >
        {isOpen ? (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:animate-wiggle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )}
      </button>
    </>
  );
}
