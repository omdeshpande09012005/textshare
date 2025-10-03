// src/app/upload/page.tsx
"use client";
import { useState, FormEvent, DragEvent } from "react";
import Link from "next/link";
import QRCodeGenerator from "@/components/QRCodeGenerator";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [expiresIn, setExpiresIn] = useState("never");
  const [maxDownloads, setMaxDownloads] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<{
    fileUrl: string;
    slug: string;
    filename: string;
    size: number;
    bundleSlug?: string;
    fileCount?: number;
  } | null>(null);
  const [allResults, setAllResults] = useState<Array<{
    fileUrl: string;
    slug: string;
    filename: string;
    size: number;
  }>>([]);

  const MAX_FILES = 10;

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    setError("");
    const remainingSlots = MAX_FILES - files.length;
    
    if (remainingSlots === 0) {
      setError(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    if (newFiles.length > remainingSlots) {
      setError(`Only ${remainingSlots} more file(s) can be added (max ${MAX_FILES} files)`);
    }

    setFiles(prev => [...prev, ...filesToAdd]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setError("");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setError("Please select at least one file");
      return;
    }

    setError("");
    setIsLoading(true);
    setUploadProgress(0);

    try {
      const uploadedFiles = [];
      const totalFiles = files.length;
      
      // Generate a unique bundle slug for multiple files
      const bundleSlug = totalFiles > 1 ? `bundle_${Date.now()}_${Math.random().toString(36).substring(7)}` : null;

      // Upload each file separately
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        
        formData.append("file", file);
        if (title) formData.append("title", title); // Use same title for all files in bundle
        if (password) formData.append("password", password);
        // For bundles, use bundleSlug; for single files, use customSlug if provided
        if (bundleSlug) {
          formData.append("bundleSlug", bundleSlug);
        } else if (customSlug) {
          formData.append("customSlug", customSlug);
        }
        formData.append("expiresIn", expiresIn);
        if (maxDownloads) formData.append("maxDownloads", maxDownloads);

        const response = await fetch("/api/files", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Failed to upload file: ${file.name}`);
        }

        uploadedFiles.push(data);
        
        // Update progress
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
      }

      // Store all uploaded files
      setAllResults(uploadedFiles);
      // For bundles, set bundleSlug in result; for single files, use first file
      if (bundleSlug && uploadedFiles.length > 0) {
        setResult({
          ...uploadedFiles[0],
          bundleSlug: bundleSlug,
          fileCount: uploadedFiles.length
        });
      } else {
        setResult(uploadedFiles[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setUploadProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFiles([]);
    setTitle("");
    setPassword("");
    setCustomSlug("");
    setExpiresIn("never");
    setMaxDownloads("");
    setResult(null);
    setAllResults([]);
    setError("");
    setUploadProgress(0);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40 dark:opacity-40 light:opacity-20" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 dark:bg-brand-500/20 light:bg-white rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 dark:bg-accent/20 light:bg-accent/10 rounded-full blur-[120px] animate-float-slow" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-4 animate-pop">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {result.bundleSlug ? `${result.fileCount} Files Uploaded!` : 'File Uploaded!'}
            </h1>
            <p className="text-white/60 dark:text-white/60 light:text-text-dark/70">
              {result.bundleSlug ? 'All files grouped under one link' : 'Your file is ready to share'}
            </p>
          </div>

          {/* For file bundles, show single link */}
          {result.bundleSlug ? (
            <div className="bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6 animate-fade-up">
              {/* Bundle Info Badge */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500/20 to-accent/20 border border-brand-500/30 text-brand-400 dark:text-brand-400 light:text-brand-600 text-sm font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  File Bundle: {result.fileCount} Files
                </div>
              </div>

              {/* Bundle URL Display */}
              <div>
                <label className="block text-sm text-white/60 dark:text-white/60 light:text-text-dark/70 mb-2 font-semibold">Shared Link (All Files)</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={result.fileUrl}
                    readOnly
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark font-mono text-sm"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result.fileUrl);
                    }}
                    className="px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-white whitespace-nowrap shadow-lg"
                  >
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Slug Code Display */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/20">
                <div className="flex flex-col items-start gap-3">
                  <div className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60 uppercase tracking-wider">
                    SHARE CODE
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <code className="flex-1 text-2xl font-bold font-mono bg-white/10 dark:bg-white/10 light:bg-white px-4 py-3 rounded-lg text-brand-300 dark:text-brand-300 light:text-brand-600 border border-white/20 dark:border-white/20 light:border-brand-300 text-center">
                      {result.fileUrl.split('/').pop()}
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(result.fileUrl.split('/').pop() || '');
                      }}
                      className="p-3 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-500/20 rounded-lg transition-colors"
                      title="Copy code"
                    >
                      <svg className="w-6 h-6 text-white/60 dark:text-white/60 light:text-text-dark hover:text-white dark:hover:text-white light:hover:text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60">
                    Share this code with others to let them view this content
                  </p>
                </div>
              </div>

              {/* Files in Bundle List */}
              <div>
                <label className="block text-sm text-white/60 dark:text-white/60 light:text-text-dark/70 mb-3 font-semibold">Files Included:</label>
                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                  {allResults.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300">
                      <svg className="w-5 h-5 text-brand-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="flex-1 text-sm text-white/80 dark:text-white/80 light:text-text-dark truncate">{file.filename}</span>
                      <span className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60 flex-shrink-0">{formatFileSize(file.size)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center gap-3 py-4">
                <QRCodeGenerator 
                  value={result.fileUrl} 
                  size={200}
                  title={`Bundle_${result.bundleSlug}`}
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
                              const file = new File([blob], `qr-code-${result.bundleSlug || result.slug}.png`, { type: 'image/png' });
                              try {
                                await navigator.share({
                                  files: [file],
                                  title: 'QR Code',
                                  text: `Scan this QR code to access: ${result.fileUrl}`
                                });
                              } catch (shareErr) {
                                const error = shareErr as Error;
                                if (error.name !== 'AbortError') {
                                  await navigator.share({
                                    title: 'File Bundle',
                                    url: result.fileUrl
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

                <p className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Works with any smartphone camera app
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <Link
                  href={`/f/${result.slug}`}
                  className="block text-center px-6 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-glow-md hover:shadow-glow-lg text-white"
                >
                  View File Bundle →
                </Link>
                <button
                  onClick={resetForm}
                  className="w-full px-6 py-3 bg-white/10 dark:bg-white/10 light:bg-white hover:bg-white/15 dark:hover:bg-white/15 light:hover:bg-brand-50 border border-white/20 dark:border-white/20 light:border-brand-300 rounded-xl font-semibold transition-all duration-300 text-white dark:text-white light:text-text-dark"
                >
                  Upload More Files
                </button>
              </div>
            </div>
          ) : (
            /* Single file display */
            <div className="space-y-4">
              {allResults.map((fileResult, index) => (
              <div key={fileResult.slug} className="bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 sm:p-8 backdrop-blur-xl space-y-4 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {allResults.length > 1 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 rounded-lg bg-brand-500/20 border border-brand-500/30 text-brand-400 text-sm font-semibold">
                      File {index + 1} of {allResults.length}
                    </div>
                  </div>
                )}

                {/* File URL Display */}
                <div>
                  <label className="block text-sm text-white/60 dark:text-white/60 light:text-text-dark/70 mb-2 font-semibold">File URL</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={fileResult.fileUrl}
                      readOnly
                      className="flex-1 px-4 py-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark font-mono text-sm"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(fileResult.fileUrl);
                      }}
                      className="px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-white whitespace-nowrap shadow-lg"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>

                {/* Slug Code Display */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/20">
                  <div className="flex flex-col items-start gap-3">
                    <div className="text-xs text-white/50 uppercase tracking-wider">
                      SHARE CODE
                    </div>
                    <div className="flex items-center gap-3 w-full">
                      <code className="flex-1 text-2xl font-bold font-mono bg-white/10 px-4 py-3 rounded-lg text-brand-300 border border-white/20 text-center">
                        {fileResult.slug}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(fileResult.slug);
                        }}
                        className="flex-shrink-0 p-3 bg-brand-500 hover:bg-brand-600 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
                        title="Copy code"
                      >
                        <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-white/40">
                      💡 Share this code for quick access on the home page
                    </p>
                  </div>
                </div>

                {/* File Info */}
                <div>
                  <label className="block text-sm text-white/60 dark:text-white/60 light:text-text-dark/70 mb-2">Filename</label>
                  <div className="px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 text-white/80 dark:text-white/80 light:text-text-dark break-all">
                    {fileResult.filename}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 dark:text-white/60 light:text-text-dark/70 mb-2">File Size</label>
                  <div className="px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 text-white/80 dark:text-white/80 light:text-text-dark">
                    {formatFileSize(fileResult.size)}
                  </div>
                </div>

                {/* QR Code Section - Only show for first file or if single file */}
                {(allResults.length === 1 || index === 0) && (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <QRCodeGenerator 
                      value={fileResult.fileUrl} 
                      size={200}
                      title={`File_${fileResult.slug}`}
                    />
                    {/* Share QR Code Button */}
                    {typeof navigator !== 'undefined' && 'share' in navigator && (
                      <button
                        onClick={async () => {
                          try {
                            const canvases = document.querySelectorAll('canvas');
                            const canvas = canvases[index] || canvases[0];
                            if (canvas) {
                              canvas.toBlob(async (blob) => {
                                if (blob) {
                                  const file = new File([blob], `qr-code-${fileResult.slug}.png`, { type: 'image/png' });
                                  try {
                                    await navigator.share({
                                      files: [file],
                                      title: 'QR Code',
                                      text: `Scan this QR code to access: ${fileResult.fileUrl}`
                                    });
                                  } catch (shareErr) {
                                    const error = shareErr as Error;
                                    if (error.name !== 'AbortError') {
                                      await navigator.share({
                                        title: 'File',
                                        url: fileResult.fileUrl
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
                )}

                {/* View File Link */}
                <Link
                  href={`/f/${fileResult.slug}`}
                  className="block text-center px-6 py-3 bg-white/10 dark:bg-white/10 light:bg-white hover:bg-white/15 dark:hover:bg-white/15 light:hover:bg-brand-50 border border-white/20 dark:border-white/20 light:border-brand-300 rounded-xl font-semibold transition-all duration-300 text-white dark:text-white light:text-text-dark"
                >
                  View File Page →
                </Link>
              </div>
            ))}

            {/* Actions for single files */}
            <div className="mt-6">
              <button
                onClick={resetForm}
                className="w-full px-6 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-glow-md hover:shadow-glow-lg text-white"
              >
                Upload More Files ✨
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40 dark:opacity-40 light:opacity-20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 dark:bg-brand-500/20 light:bg-white rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 dark:bg-accent/20 light:bg-accent/10 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 backdrop-blur-md mb-6">
            <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm font-medium">File Sharing</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">
            Upload & Share Files
          </h1>
          <p className="text-xl text-white/60 dark:text-white/60 light:text-text-dark/70">
            Share documents, images, code files, and more with optional security
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
          <div className="space-y-6">
            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-300 ${
                isDragging
                  ? "border-brand-500 bg-brand-500/10"
                  : "border-white/20 dark:border-white/20 light:border-brand-300 bg-white/5 dark:bg-white/5 light:bg-white"
              }`}
            >
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                multiple
                className="hidden"
                disabled={files.length >= MAX_FILES}
              />
              <label htmlFor="fileInput" className={`cursor-pointer ${files.length >= MAX_FILES ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className="flex flex-col items-center">
                  <svg
                    className={`w-12 h-12 sm:w-16 sm:h-16 mb-4 transition-colors ${
                      isDragging ? "text-brand-400" : "text-white/40 dark:text-white/40 light:text-brand-500/60"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-base sm:text-lg font-semibold mb-2 text-white dark:text-white light:text-text-dark">
                    {files.length >= MAX_FILES 
                      ? `Maximum ${MAX_FILES} files reached` 
                      : files.length > 0 
                        ? `${files.length} file(s) selected • Add more` 
                        : "Drag & drop files here"}
                  </p>
                  <p className="text-xs sm:text-sm text-white/60 dark:text-white/60 light:text-text-dark/70">
                    {files.length >= MAX_FILES 
                      ? "Remove a file to add more" 
                      : `or click to browse • Max ${MAX_FILES} files (10MB each, 25MB total)`}
                  </p>
                </div>
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80 dark:text-white/80 light:text-text-dark/80 mb-3">
                  Selected Files ({files.length}/{MAX_FILES})
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {files.map((file, index) => (
                    <div 
                      key={`${file.name}-${index}`} 
                      className="group relative flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 hover:border-brand-500/40 transition-all"
                    >
                      {/* File Icon */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white dark:text-white light:text-text-dark truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60">
                          {formatFileSize(file.size)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="flex-shrink-0 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Remove file"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80 dark:text-white/80 light:text-text-dark/80">
                Title (optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My important document"
                className="w-full px-4 py-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Custom Slug */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80 dark:text-white/80 light:text-text-dark/80">
                Custom slug (optional)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-white/60 dark:text-white/60 light:text-text-dark/60 text-sm">/f/</span>
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) =>
                    setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))
                  }
                  placeholder="mydocument"
                  pattern="[a-z0-9]+"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>
              <p className="text-xs text-white/40 dark:text-white/40 light:text-text-dark/60 mt-1">Leave empty for random slug</p>
            </div>

            {/* Advanced Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expiry */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80 dark:text-white/80 light:text-text-dark/80">
                  Expires in
                </label>
                <div className="relative">
                  <select
                    value={expiresIn}
                    onChange={(e) => setExpiresIn(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all cursor-pointer appearance-none"
                  >
                    <option value="never" className="bg-surface-800">Never</option>
                    <option value="1h" className="bg-surface-800">1 hour</option>
                    <option value="24h" className="bg-surface-800">24 hours</option>
                    <option value="7d" className="bg-surface-800">7 days</option>
                    <option value="30d" className="bg-surface-800">30 days</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Max Downloads */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80 dark:text-white/80 light:text-text-dark/80">
                  Max downloads (optional)
                </label>
                <input
                  type="number"
                  value={maxDownloads}
                  onChange={(e) => setMaxDownloads(e.target.value)}
                  placeholder="Unlimited"
                  min="1"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80 dark:text-white/80 light:text-text-dark/80">
                Password (optional)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Protect with password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Upload Progress */}
            {isLoading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-accent transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 dark:bg-red-500/10 light:bg-red-500/15 border border-red-500/20 dark:border-red-500/20 light:border-red-500/30 text-red-400 dark:text-red-400 light:text-red-600 text-sm">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || files.length === 0}
              className="w-full group relative px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-md hover:shadow-glow-lg overflow-hidden text-white"
            >
              <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {files.length > 0 
                      ? `Upload ${files.length} File${files.length > 1 ? 's' : ''} ✨` 
                      : 'Upload File ✨'}
                  </>
                )}
              </span>
            </button>
          </div>
        </form>

        {/* Usage Limits Info Banner */}
        <div className="mt-8 bg-gradient-to-br from-brand-500/10 to-accent/10 border border-brand-500/20 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-2xl">ℹ️</div>
            <div>
              <h3 className="font-semibold text-white dark:text-white light:text-text-dark mb-1">Fair Usage Limits</h3>
              <p className="text-sm text-white/70 dark:text-white/70 light:text-text-dark/80 mb-2">
                To keep TextShare free for everyone: <strong>10 uploads/hour</strong>, <strong>10MB per file</strong>, <strong>25MB total</strong>. Files expire after <strong>7 days</strong> (max 90 days).
              </p>
              <Link 
                href="/docs/limits"
                className="inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
              >
                View all limits
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-white/60 dark:text-white/60 light:text-text-dark/70 hover:text-white dark:hover:text-white light:hover:text-text-dark transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
