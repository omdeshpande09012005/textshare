// src/app/f/[slug]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import QRCodeGenerator from "@/components/QRCodeGenerator";

interface FileData {
  slug: string;
  filename: string;
  mimeType: string;
  size: number;
  title: string | null;
  downloads: number;
  hasPassword: boolean;
  createdAt: string;
  expiresAt: string | null;
  bundleSlug: string | null;
  bundleFiles?: Array<{
    slug: string;
    filename: string;
    size: number;
    mimeType: string;
  }>;
}

export default function FileViewPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Toast notification helper
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchFile();
  }, [slug]);

  const fetchFile = async () => {
    try {
      const response = await fetch(`/api/files/${slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch file");
      }

      setFileData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "File not found");
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const downloadFile = async (fileSlug?: string, fileName?: string) => {
    setIsDownloading(true);
    setError("");

    try {
      const targetSlug = fileSlug || slug;
      const response = await fetch(`/api/files/${targetSlug}`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to download");
      }

      // Create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || fileData?.filename || "download";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Refresh file data to update download count
      fetchFile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleFileSelection = (filename: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(filename)) {
      newSelected.delete(filename);
    } else {
      newSelected.add(filename);
    }
    setSelectedFiles(newSelected);
  };

  const toggleSelectAll = () => {
    if (!fileData?.bundleFiles) return;
    
    if (selectedFiles.size === fileData.bundleFiles.length) {
      // Deselect all
      setSelectedFiles(new Set());
    } else {
      // Select all
      const allFiles = new Set(fileData.bundleFiles.map(f => f.filename));
      setSelectedFiles(allFiles);
    }
  };

  const downloadSelected = async () => {
    if (!fileData?.bundleFiles || selectedFiles.size === 0) return;
    
    setIsDownloadingAll(true);
    setError("");

    try {
      const filesToDownload = fileData.bundleFiles.filter(f => 
        selectedFiles.has(f.filename)
      );

      for (const file of filesToDownload) {
        const response = await fetch(`/api/files/${file.slug}`, {
          method: "POST",
        });

        if (!response.ok) continue;

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      fetchFile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const shareFiles = async () => {
    if (!fileData?.bundleFiles || selectedFiles.size === 0) return;

    try {
      const filesToShare = fileData.bundleFiles.filter(f => 
        selectedFiles.has(f.filename)
      );

      // Share the bundle link instead of individual files for better compatibility
      const bundleUrl = window.location.href;
      const fileNames = filesToShare.map(f => f.filename).join(', ');
      
      if (navigator.share) {
        const shareData = {
          title: fileData.title || 'Shared Files',
          text: `Check out ${filesToShare.length} file(s): ${fileNames}`,
          url: bundleUrl,
        };

        await navigator.share(shareData);
        showToast(`✅ Successfully shared ${filesToShare.length} file(s)!`, "success");
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(bundleUrl);
        showToast(`📋 Link copied to clipboard! Share it with anyone.`, "success");
      }

    } catch (err) {
      const error = err as Error;
      // User cancelled the share - don't show error
      if (error.name === 'AbortError') {
        return;
      }
      
      // Fallback: Copy link to clipboard on any error
      try {
        const bundleUrl = window.location.href;
        await navigator.clipboard.writeText(bundleUrl);
        showToast(`📋 Link copied to clipboard! Share it with anyone.`, "success");
      } catch {
        showToast("⚠️ Please use the download option or copy the link manually.", "error");
      }
    }
  };

  const shareFile = async (file: { slug: string; filename: string; mimeType: string }) => {
    try {
      // Try to share the link instead of the file for better compatibility
      const fileUrl = `${window.location.origin}/f/${file.slug}`;
      
      if (navigator.share) {
        const shareData = {
          title: file.filename,
          text: `Check out this file: ${file.filename}`,
          url: fileUrl,
        };

        await navigator.share(shareData);
        showToast(`✅ Successfully shared ${file.filename}!`, "success");
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(fileUrl);
        showToast(`📋 Link copied to clipboard! Share it with anyone.`, "success");
      }

    } catch (err) {
      const error = err as Error;
      // User cancelled the share - don't show error
      if (error.name === 'AbortError') {
        return;
      }
      
      // Fallback: Copy link to clipboard on any error
      try {
        const fileUrl = `${window.location.origin}/f/${file.slug}`;
        await navigator.clipboard.writeText(fileUrl);
        showToast(`📋 Link copied to clipboard! Share it with anyone.`, "success");
      } catch {
        showToast("⚠️ Please use the download option or copy the link manually.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-900 text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className="max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Oops!</h1>
            <p className="text-white/60 mb-8">{error}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-xl font-semibold transition-all duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40 dark:opacity-40 light:opacity-20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 dark:bg-brand-500/20 light:bg-white rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 dark:bg-accent/20 light:bg-accent/10 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl w-full">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/20 border-2 border-brand-500/30 mb-4 sm:mb-6 shadow-glow-sm">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">
              {fileData?.title || "File Ready"}
            </h1>
            <p className="text-sm sm:text-base text-white/60 dark:text-white/60 light:text-text-dark/70">
              Your file is securely stored and ready to download
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            
            {/* Error/Info Messages */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 flex items-start gap-3 animate-fade-up">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-300">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                  aria-label="Dismiss error"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Bundle Info Badge with Action Buttons */}
            {fileData?.bundleFiles && fileData.bundleFiles.length > 1 && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-brand-500/20 to-accent/20 border border-brand-500/30">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-sm font-bold text-brand-400 dark:text-brand-400 light:text-brand-600">
                    File Bundle: {fileData.bundleFiles.length} Files
                  </span>
                </div>
                
                {/* Action Buttons - Always Visible */}
                <div className="flex items-center gap-2">
                  {/* Share Button */}
                  {typeof navigator !== 'undefined' && 'share' in navigator && (
                    <button
                      onClick={shareFiles}
                      disabled={selectedFiles.size === 0}
                      title="Share Selected"
                      className="group relative p-2.5 bg-gradient-to-br from-brand-500/80 to-accent/80 hover:from-brand-500 hover:to-accent rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      {selectedFiles.size > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-white text-brand-600 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
                          {selectedFiles.size}
                        </span>
                      )}
                    </button>
                  )}
                  
                  {/* Download Button */}
                  <button
                    onClick={downloadSelected}
                    disabled={isDownloadingAll || selectedFiles.size === 0}
                    title="Download Selected"
                    className="group relative p-2.5 bg-gradient-to-br from-accent/80 to-brand-500/80 hover:from-accent hover:to-brand-500 rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isDownloadingAll ? (
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                        {selectedFiles.size > 0 && (
                          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-white text-accent rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
                            {selectedFiles.size}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                  
                  {/* Select/Deselect All Button */}
                  <button
                    onClick={toggleSelectAll}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold transition-all text-white"
                  >
                    {selectedFiles.size === fileData.bundleFiles.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
              </div>
            )}

            {/* Files List */}
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {(fileData?.bundleFiles && fileData.bundleFiles.length > 0 ? fileData.bundleFiles : [{ slug: fileData?.slug || '', filename: fileData?.filename || '', size: fileData?.size || 0, mimeType: fileData?.mimeType || '' }]).map((file, index) => (
                <div key={file.slug} className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 hover:border-brand-500/40 transition-all group">
                  {/* Checkbox for selection */}
                  {fileData?.bundleFiles && fileData.bundleFiles.length > 1 && (
                    <div className="flex-shrink-0 pt-0.5">
                      <input
                        type="checkbox"
                        checked={selectedFiles.has(file.filename)}
                        onChange={() => toggleFileSelection(file.filename)}
                        className="w-5 h-5 rounded border-2 border-brand-500/50 bg-white/10 checked:bg-brand-500 checked:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-0 cursor-pointer transition-all"
                      />
                    </div>
                  )}

                  {/* File Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-600/20 border border-brand-500/30 flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* File Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white dark:text-white light:text-text-dark mb-1 truncate">
                      {file.filename}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/60 dark:text-white/60 light:text-text-dark/70">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                    {/* Share Button (Mobile) */}
                    {typeof navigator !== 'undefined' && 'share' in navigator && (
                      <button
                        onClick={() => shareFile(file)}
                        className="group relative px-3 sm:px-4 py-2.5 bg-gradient-to-r from-accent/80 to-brand-500/80 hover:from-accent hover:to-brand-500 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-white"
                        title="Share this file"
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          <span className="hidden sm:inline">Share</span>
                        </span>
                      </button>
                    )}
                    
                    {/* Download Button */}
                    <button
                      onClick={() => downloadFile(file.slug, file.filename)}
                      disabled={isDownloading}
                      className="group relative px-3 sm:px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-glow-md text-white"
                      title="Download this file"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="hidden sm:inline">Download</span>
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Expiry Warning */}
            {fileData?.expiresAt && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-yellow-500/10 dark:bg-yellow-500/10 light:bg-yellow-500/15 border border-yellow-500/20 dark:border-yellow-500/20 light:border-yellow-500/30 text-yellow-400 dark:text-yellow-400 light:text-yellow-600">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">
                  Expires on {new Date(fileData.expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            )}

            {/* QR Code Section - Simple Style like URL Shortener */}
            <div className="flex flex-col items-center gap-3 py-4">
              <QRCodeGenerator
                value={typeof window !== "undefined" ? window.location.href : ""}
                size={200}
                title={`File_${fileData?.slug}`}
              />

              {/* Share QR Code Button */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={async () => {
                    try {
                      const canvas = document.querySelector('canvas');
                      if (canvas) {
                        canvas.toBlob(async (blob) => {
                          if (blob) {
                            const file = new File([blob], `qr-code-${fileData?.slug}.png`, { type: 'image/png' });
                            try {
                              await navigator.share({
                                files: [file],
                                title: 'QR Code',
                                text: `Scan this QR code to access: ${window.location.href}`
                              });
                            } catch (shareErr) {
                              const error = shareErr as Error;
                              if (error.name !== 'AbortError') {
                                await navigator.share({
                                  title: 'File',
                                  url: window.location.href
                                });
                              }
                            }
                          }
                        });
                      }
                    } catch (err) {
                      console.error('Error sharing:', err);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-white"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share QR Code
                </button>
              )}
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="text-center mt-6 sm:mt-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-white/60 dark:text-white/60 light:text-text-dark/70 hover:text-white dark:hover:text-white light:hover:text-text-dark transition-all group text-sm sm:text-base"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border animate-fade-up ${
          toast.type === 'success' 
            ? 'bg-green-500/20 border-green-500/30 text-green-300' 
            : 'bg-red-500/20 border-red-500/30 text-red-300'
        }`}>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {toast.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              )}
            </svg>
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className="text-current hover:opacity-70 transition-opacity ml-2"
              aria-label="Close notification"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
