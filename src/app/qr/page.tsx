// src/app/qr/page.tsx
"use client";
import { useState, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { useEffect } from "react";
import Link from "next/link";

export default function QRGeneratorPage() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [qrStyle, setQrStyle] = useState<"squares" | "dots" | "rounded">("squares");
  const [qrColor, setQrColor] = useState("#7c3aed");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showQR, setShowQR] = useState(false);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (showQR && qrRef.current && url) {
      // Clear previous QR code
      qrRef.current.innerHTML = "";

      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: url,
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
          color: qrColor,
          type: (qrStyle === "squares" ? "square" : qrStyle) as "square" | "dots" | "rounded"
        },
        backgroundOptions: {
          color: bgColor,
        },
        cornersSquareOptions: {
          color: qrColor,
          type: "extra-rounded"
        },
        cornersDotOptions: {
          color: qrColor,
          type: "dot"
        }
      });

      qrCodeRef.current = qrCode;
      qrCode.append(qrRef.current);
    }
  }, [showQR, url, qrStyle, qrColor, bgColor]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setShowQR(true);
    }
  };

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const fileName = title ? `${title.replace(/\s+/g, "-")}-qr-code.png` : "qr-code.png";
      qrCodeRef.current.download({
        name: fileName,
        extension: "png"
      });
    }
  };

  const handleShare = async () => {
    if (qrCodeRef.current) {
      try {
        const blob = await qrCodeRef.current.getRawData("png");
        if (blob) {
          const file = new File([blob as Blob], "qr-code.png", { type: "image/png" });
          
          if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: title || "QR Code",
              text: `QR Code for: ${url}`
            });
            showToast("✅ QR Code shared successfully!", "success");
          } else {
            // Fallback: copy to clipboard or show message
            showToast("⚠️ Sharing not supported. Use download instead!", "error");
          }
        }
      } catch (error) {
        console.error("Error sharing:", error);
        
        // Handle specific error types
        if (error instanceof DOMException) {
          if (error.name === "NotAllowedError") {
            showToast("⚠️ Permission denied. Please grant permission to share files or use the download option instead.", "error");
          } else if (error.name === "AbortError") {
            // User cancelled the share - do nothing
            return;
          } else {
            showToast("⚠️ Sharing failed. Try downloading the QR code instead.", "error");
          }
        } else {
          showToast("⚠️ An error occurred. Please try downloading instead.", "error");
        }
      }
    }
  };

  const handleCopyImage = async () => {
    if (!qrCodeRef.current || !qrRef.current) return;

    try {
      // Check if Clipboard API is supported
      if (!navigator.clipboard || !navigator.clipboard.write) {
        throw new Error("Clipboard API not supported");
      }

      // Get the canvas element from the QR code
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) {
        throw new Error("Could not find QR code canvas");
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to create blob from canvas"));
        }, "image/png");
      });

      // Create ClipboardItem and write to clipboard
      const clipboardItem = new ClipboardItem({
        "image/png": blob
      });

      await navigator.clipboard.write([clipboardItem]);
      
      // Show success toast
      showToast("✓ QR Code copied to clipboard!", "success");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      
      // Show error toast with helpful message
      if (error instanceof Error && error.message.includes("not supported")) {
        showToast("⚠️ Clipboard not supported. Try downloading instead!", "error");
      } else if (error instanceof DOMException && error.name === "NotAllowedError") {
        showToast("⚠️ Clipboard access denied. Please allow clipboard permissions.", "error");
      } else {
        showToast("⚠️ Could not copy to clipboard. Try downloading instead!", "error");
      }
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    const toast = document.createElement("div");
    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
    toast.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-up`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleCreateShareLink = async () => {
    if (!url) {
      showToast("⚠️ Please enter a URL first", "error");
      return;
    }

    setIsCreatingLink(true);
    try {
      const response = await fetch("/api/qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          title: title || null,
          qrStyle,
          qrColor,
          bgColor,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create share link");
      }

      const data = await response.json();
      setShareLink(data.url);

      // Copy to clipboard
      await navigator.clipboard.writeText(data.url);
      showToast("✓ Share link created and copied to clipboard!", "success");
    } catch (error) {
      console.error("Error creating share link:", error);
      showToast("⚠️ Failed to create share link", "error");
    } finally {
      setIsCreatingLink(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40 dark:opacity-40 light:opacity-20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 dark:bg-brand-500/20 light:bg-white rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 dark:bg-accent/20 light:bg-accent/10 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Back to Home Button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/5 dark:bg-white/5 light:bg-white hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-50 border border-white/10 dark:border-white/10 light:border-brand-300 hover:border-brand-500/50 backdrop-blur-md transition-all duration-300 group text-white dark:text-white light:text-text-dark text-sm"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 backdrop-blur-md mb-4 sm:mb-6 text-xs sm:text-sm">
            <span className="text-xl sm:text-2xl">📱</span>
            <span className="font-medium bg-gradient-to-r from-brand-400 to-accent bg-clip-text text-transparent">
              QR Code Generator
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent px-4">
            Generate Custom QR Codes
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/60 dark:text-white/60 light:text-text-dark/70 max-w-2xl mx-auto px-4">
            Create aesthetic QR codes for any link. Download as PNG with custom titles 🔥
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Form Section */}
          <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 p-4 sm:p-6 md:p-8 backdrop-blur-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 via-accent/5 to-brand-500/5 animate-gradient-xy" />
            
            <div className="relative z-10">
              <form onSubmit={handleGenerate} className="space-y-4 sm:space-y-6">
                {/* URL Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white/80 dark:text-white/80 light:text-text-dark/80 mb-1.5 sm:mb-2">
                    Enter URL *
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark text-sm sm:text-base placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent backdrop-blur-sm transition-all"
                  />
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white/80 dark:text-white/80 light:text-text-dark/80 mb-1.5 sm:mb-2">
                    Title (for filename)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My Awesome QR Code"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark text-sm sm:text-base placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent backdrop-blur-sm transition-all"
                  />
                </div>

                {/* Style Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white/80 dark:text-white/80 light:text-text-dark/80 mb-2 sm:mb-3">
                    QR Style
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {(["squares", "dots", "rounded"] as const).map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setQrStyle(style)}
                        className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all capitalize ${
                          qrStyle === style
                            ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-glow-sm"
                            : "bg-white/5 dark:bg-white/5 light:bg-white text-white/60 dark:text-white/60 light:text-text-dark/70 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-50 border border-white/10 dark:border-white/10 light:border-brand-300"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white/80 dark:text-white/80 light:text-text-dark/80 mb-1.5 sm:mb-2">
                      QR Color
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="relative flex-shrink-0">
                        <input
                          type="color"
                          value={qrColor}
                          onChange={(e) => setQrColor(e.target.value)}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg cursor-pointer border-2 border-white/30 hover:border-brand-500 transition-colors"
                          style={{ 
                            backgroundColor: qrColor,
                            padding: '0',
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white/80 dark:text-white/80 light:text-text-dark/80 mb-1.5 sm:mb-2">
                      Background
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="relative flex-shrink-0">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg cursor-pointer border-2 border-white/30 dark:border-white/30 light:border-brand-500/40 hover:border-brand-500 transition-colors"
                          style={{ 
                            backgroundColor: bgColor,
                            padding: '0',
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  type="submit"
                  className="w-full group relative px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-glow-md hover:shadow-glow-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Generate QR Code ✨
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 p-4 sm:p-6 md:p-8 backdrop-blur-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-brand-500/5 to-accent/5 animate-gradient-xy" />
            
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center text-white dark:text-white light:text-text-dark">Preview</h3>

              {showQR ? (
                <div className="space-y-6">
                  {/* QR Code Display */}
                  <div className="flex flex-col items-center">
                    {title && (
                      <h4 className="text-lg font-semibold mb-4 text-center bg-gradient-to-r from-brand-400 to-accent bg-clip-text text-transparent">
                        {title}
                      </h4>
                    )}
                    <div 
                      ref={qrRef}
                      className="bg-white p-4 rounded-2xl shadow-2xl"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleDownload}
                      className="w-full group relative px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PNG
                      </span>
                    </button>

                    <button
                      onClick={handleCopyImage}
                      className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy to Clipboard
                      </span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share QR Code
                      </span>
                    </button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-surface-900 px-2 text-white/50">or</span>
                      </div>
                    </div>

                    {/* Create Share Link Button */}
                    <button
                      onClick={handleCreateShareLink}
                      disabled={isCreatingLink}
                      className="w-full px-6 py-3 bg-gradient-to-r from-accent/20 to-brand-500/20 hover:from-accent/30 hover:to-brand-500/30 border border-accent/30 hover:border-accent/50 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isCreatingLink ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Creating...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            Create Share Link 🔗
                          </>
                        )}
                      </span>
                    </button>

                    {/* Share Link Display */}
                    {shareLink && (
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                        <p className="text-xs text-green-400 mb-2 font-medium">✓ Share link created!</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={shareLink}
                            readOnly
                            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(shareLink);
                              showToast("✓ Link copied!", "success");
                            }}
                            className="px-3 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-white/40">
                  <svg className="w-24 h-24 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <p className="text-center">
                    Your QR code will appear here<br />
                    <span className="text-sm">Enter a URL and generate to preview</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureBox icon="🎨" title="Custom Styling" description="Choose colors & patterns" />
          <FeatureBox icon="💾" title="High Quality" description="Download as PNG" />
          <FeatureBox icon="📱" title="Mobile Ready" description="Share anywhere" />
        </div>
      </div>
    </div>
  );
}

function FeatureBox({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="relative rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm font-semibold text-white mb-1">{title}</div>
      <div className="text-xs text-white/50">{description}</div>
    </div>
  );
}
