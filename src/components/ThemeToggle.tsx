"use client";

import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // init from localStorage or system
    const saved = localStorage.getItem("textshare:theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      applyTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const defaultTheme = prefersDark ? "dark" : "light";
    setTheme(defaultTheme);
    applyTheme(defaultTheme);
  }, []);

  function applyTheme(newTheme: "light" | "dark") {
    const root = document.documentElement;
    
    if (newTheme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
    }
  }

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("textshare:theme", next);
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="p-2 w-9 h-9 rounded-xl bg-white/5" />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="group relative p-2 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/0 to-accent/0 group-hover:from-brand-500/20 group-hover:to-accent/20 transition-all duration-300 blur-sm" />
      
      <div className="relative z-10">
        {theme === "dark" ? (
          // Sun icon for switching to light
          <svg className="w-5 h-5 text-white group-hover:text-brand-300 transition-colors duration-300 group-hover:rotate-45 transition-transform" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
          </svg>
        ) : (
          // Moon icon for switching to dark
          <svg className="w-5 h-5 text-surface-900 dark:text-white group-hover:text-brand-600 transition-colors duration-300 group-hover:-rotate-12 transition-transform" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fillOpacity="0.9"/>
          </svg>
        )}
      </div>
    </button>
  );
}
