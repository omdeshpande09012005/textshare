"use client";

import React, { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";

export default function PasteActions({ slug, path, content }: { slug: string; path: string; content?: string }) {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState<"link" | "text" | null>(null);

  const openRaw = () => {
    const rawUrl = `/api/pastes/${encodeURIComponent(slug)}/raw`;
    window.open(rawUrl, "_blank");
  };

  const copyLink = async () => {
    try {
      const url = window.location.origin + path;
      await navigator.clipboard.writeText(url);
      setCopied("link");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      alert("Failed to copy link");
    }
  };

  const copyText = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied("text");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      alert("Failed to copy text");
    }
  };

  const fullUrl = typeof window !== "undefined" ? window.location.origin + path : "";

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {/* Copy Text Button */}
        {content && (
          <button 
            onClick={copyText}
            className="group relative px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-glow-sm hover:shadow-glow-md overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
            <span className="relative z-10 flex items-center gap-2">
              {copied === "text" ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Text
                </>
              )}
            </span>
          </button>
        )}

        {/* Copy Link Button */}
        <button 
          onClick={copyLink}
          className="px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <span className="flex items-center gap-2">
            {copied === "link" ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Copy Link
              </>
            )}
          </span>
        </button>

        {/* Raw Button */}
        <button 
          onClick={openRaw}
          className="px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Raw
          </span>
        </button>

        {/* QR Code Button */}
        <button 
          onClick={() => setShowQR(!showQR)} 
          className="px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
          title="Show QR Code"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            QR
          </span>
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && fullUrl && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowQR(false)}>
          <div className="bg-surface-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-glow-lg animate-pop" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Scan QR Code</h3>
              <button 
                onClick={() => setShowQR(false)}
                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col items-center gap-4 mb-6">
              <QRCodeGenerator 
                value={fullUrl} 
                size={250}
                title={`Paste_${slug}`}
              />
              
              {/* Share QR Code Button */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={async () => {
                    try {
                      const canvas = document.querySelector('.animate-pop canvas');
                      if (canvas instanceof HTMLCanvasElement) {
                        canvas.toBlob(async (blob) => {
                          if (blob) {
                            const file = new File([blob], `qr-code-${slug}.png`, { type: 'image/png' });
                            await navigator.share({
                              files: [file],
                              title: 'QR Code',
                              text: `Scan this QR code to access: ${fullUrl}`
                            });
                          }
                        });
                      }
                    } catch (err) {
                      console.error('Error sharing QR code:', err);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-brand-500 to-accent hover:from-brand-400 hover:to-blue-500 rounded-xl text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share QR Code
                </button>
              )}
            </div>
            
            <p className="text-sm text-white/60 text-center">
              Scan this code to open the paste on your mobile device 📱
            </p>
          </div>
        </div>
      )}
    </>
  );
}
