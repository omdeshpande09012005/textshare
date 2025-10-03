// src/components/QRCodeDisplay.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRCodeDisplayProps {
  qrCode: {
    slug: string;
    url: string;
    title: string | null;
    qrStyle: string;
    qrColor: string;
    bgColor: string;
    views: number;
    createdAt: Date;
  };
}

export default function QRCodeDisplay({ qrCode }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (qrRef.current && qrCode.url) {
      // Clear previous QR code
      qrRef.current.innerHTML = "";

      const qr = new QRCodeStyling({
        width: 400,
        height: 400,
        data: qrCode.url,
        margin: 10,
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          errorCorrectionLevel: "Q"
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 0
        },
        dotsOptions: {
          color: qrCode.qrColor,
          type: (qrCode.qrStyle === "squares" ? "square" : qrCode.qrStyle) as "square" | "dots" | "rounded"
        },
        backgroundOptions: {
          color: qrCode.bgColor,
        },
        cornersSquareOptions: {
          color: qrCode.qrColor,
          type: "extra-rounded"
        },
        cornersDotOptions: {
          color: qrCode.qrColor,
          type: "dot"
        }
      });

      qrCodeRef.current = qr;
      qr.append(qrRef.current);
    }
  }, [qrCode]);

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const fileName = qrCode.title 
        ? `${qrCode.title.replace(/\s+/g, "-")}-qr-code.png` 
        : "qr-code.png";
      qrCodeRef.current.download({
        name: fileName,
        extension: "png"
      });
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="text-2xl">📱</span>
            <span className="text-sm font-medium bg-gradient-to-r from-brand-300 to-accent bg-clip-text text-transparent">
              Shared QR Code
            </span>
          </div>

          {qrCode.title && (
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-brand-200 to-white bg-clip-text text-transparent">
              {qrCode.title}
            </h1>
          )}
        </div>

        {/* QR Code Display */}
        <div className="relative rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 p-8 backdrop-blur-xl overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 via-accent/5 to-brand-500/5 animate-gradient-xy" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div 
              ref={qrRef}
              className="bg-white p-6 rounded-2xl shadow-2xl mb-6"
            />

            {/* URL Display */}
            <div className="w-full mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-white/60 mb-1">Links to:</p>
              <a 
                href={qrCode.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 break-all transition-colors"
              >
                {qrCode.url}
              </a>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-3">
              <button
                onClick={handleDownload}
                className="w-full group relative px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download QR Code
                </span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  {copySuccess ? (
                    <>
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Link
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="mt-6 flex items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {qrCode.views} views
              </span>
              <span>•</span>
              <span>
                Created {new Date(qrCode.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Create Your Own CTA */}
        <div className="text-center">
          <a
            href="/qr"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/50 transition-all group"
          >
            <span className="text-white/80 group-hover:text-white transition-colors">
              Create Your Own QR Code
            </span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
