// src/components/CodeEntry.tsx
"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

const CODE_LENGTH = 6;

export default function CodeEntry() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow alphanumeric characters
    const sanitized = value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    
    if (sanitized.length === 0) {
      // Handle deletion
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    if (sanitized.length === 1) {
      // Single character input
      const newCode = [...code];
      newCode[index] = sanitized;
      setCode(newCode);

      // Auto-focus next input
      if (index < CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (sanitized.length > 1) {
      // Handle paste
      const chars = sanitized.split("").slice(0, CODE_LENGTH);
      const newCode = [...code];
      chars.forEach((char, i) => {
        if (index + i < CODE_LENGTH) {
          newCode[index + i] = char;
        }
      });
      setCode(newCode);

      // Focus last filled input or next empty
      const nextIndex = Math.min(index + chars.length, CODE_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (code[index] === "" && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const sanitized = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      
      if (sanitized.length >= 4) {
        const chars = sanitized.split("").slice(0, CODE_LENGTH);
        const newCode = Array(CODE_LENGTH).fill("");
        chars.forEach((char, i) => {
          newCode[i] = char;
        });
        setCode(newCode);
        setError("");
        
        // Focus the last filled input
        const lastIndex = Math.min(chars.length - 1, CODE_LENGTH - 1);
        inputRefs.current[lastIndex]?.focus();
      } else {
        setError("Clipboard doesn't contain a valid code!");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError("Unable to read from clipboard. Please paste manually.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSubmit = async () => {
    const codeString = code.join("").trim();
    if (codeString.length >= 4) {
      setIsSubmitting(true);
      setError("");
      
      try {
        // Try paste first
        const pasteResponse = await fetch(`/api/pastes/${codeString}`);
        
        if (pasteResponse.ok) {
          // Paste exists, navigate to it
          router.push(`/p/${codeString}`);
          return;
        }
        
        // If not a paste, try file slug
        const fileResponse = await fetch(`/api/files/${codeString}`);
        
        if (fileResponse.ok) {
          // File exists, navigate to it
          router.push(`/f/${codeString}`);
          return;
        }
        
        // Neither paste nor file found
        setError("Code not found! Please check and try again.");
        setIsSubmitting(false);
        setTimeout(() => setError(""), 3000);
      } catch (err) {
        setError("Connection error. Please try again.");
        setIsSubmitting(false);
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const isFilled = code.every(char => char !== "");
  const isValid = code.join("").trim().length >= 4;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-6">
        {/* Code Input Boxes with Paste Button */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1 sm:gap-2 md:gap-3">
            {code.map((char, index) => (
              <div
                key={index}
                className="relative group"
              >
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={char}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-9 h-11 sm:w-12 sm:h-14 md:w-16 md:h-20 text-center text-lg sm:text-2xl md:text-3xl font-bold rounded-lg sm:rounded-xl bg-white/20 dark:bg-white/10 light:bg-white border-2 border-white/30 dark:border-white/20 light:border-brand-300 text-black dark:text-white light:text-black placeholder-white/30 dark:placeholder-white/20 light:placeholder-text-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 dark:hover:bg-white/15 light:hover:bg-brand-500/15 hover:border-white/40 dark:hover:border-white/30 light:hover:border-brand-500/40 uppercase shadow-lg"
                  placeholder="·"
                  disabled={isSubmitting}
                />
                {/* Glow effect on focus */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500 to-accent opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-300 pointer-events-none" />
                
                {/* Active indicator */}
                {char && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-brand-500 to-accent animate-pulse" />
                )}
              </div>
            ))}
          </div>

          {/* Paste from Clipboard Button */}
          <button
            onClick={handlePasteFromClipboard}
            disabled={isSubmitting}
            className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/5 dark:bg-white/5 light:bg-white hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-500/15 border border-white/10 dark:border-white/10 light:border-brand-300 hover:border-brand-500/50 backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 dark:text-white/60 light:text-brand-600 group-hover:text-brand-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="font-medium text-white/80 dark:text-white/80 light:text-text-dark group-hover:text-white dark:group-hover:text-white light:group-hover:text-brand-600 transition-colors">
              Paste from Clipboard
            </span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className={`
            group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform overflow-hidden w-full sm:w-auto
            ${isValid 
              ? "bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent text-white shadow-glow-sm hover:shadow-glow-md hover:scale-105 active:scale-95 cursor-pointer" 
              : "bg-white/5 text-white/40 cursor-not-allowed border border-white/10"
            }
          `}
        >
          {/* Shimmer Effect */}
          {isValid && (
            <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
          )}
          
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading...
              </>
            ) : (
              <>
                <span>Access Content</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </span>
          
          {/* Glow Ring */}
          {isValid && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-600 to-accent opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="animate-fade-up px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-red-500/10 border border-red-500/30 backdrop-blur-md w-full">
            <div className="flex items-center gap-2 text-red-400">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Helper Text */}
        {!error && (
          <p className="text-xs sm:text-sm text-white/40 dark:text-white/40 light:text-text-dark/60 text-center max-w-sm px-2">
            💡 Enter your paste code or file slug to access your shared content
          </p>
        )}
      </div>
    </div>
  );
}
