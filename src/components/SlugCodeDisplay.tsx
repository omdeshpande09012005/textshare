// src/components/SlugCodeDisplay.tsx
"use client";

interface SlugCodeDisplayProps {
  slug: string;
  onCopy?: () => void;
  className?: string;
}

/**
 * Displays a slug code in a clean, copy-friendly format
 * Matches the design from the reference image with dark background and copy button
 */
export default function SlugCodeDisplay({ slug, onCopy, className = "" }: SlugCodeDisplayProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(slug);
      if (onCopy) {
        onCopy();
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/20 ${className}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex-1">
          <div className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60 uppercase tracking-wider mb-2">
            SHARE CODE
          </div>
          <div className="flex items-center gap-3">
            <code className="text-xl md:text-2xl font-bold font-mono bg-white/10 dark:bg-white/10 light:bg-white px-4 py-2 rounded-lg text-brand-300 dark:text-brand-300 light:text-brand-600 border border-white/20 dark:border-white/20 light:border-brand-300">
              {slug}
            </code>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-500/20 rounded-lg transition-colors"
              title="Copy code"
            >
              <svg className="w-5 h-5 text-white/60 dark:text-white/60 light:text-text-dark hover:text-white dark:hover:text-white light:hover:text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60 mt-2">
            Share this code with others to let them view this paste
          </p>
        </div>
      </div>
    </div>
  );
}
