// src/app/u/[slug]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import QRCodeGenerator from "@/components/QRCodeGenerator";

interface UrlData {
  slug: string;
  originalUrl: string;
  title: string | null;
  clicks: number;
  hasPassword: boolean;
  createdAt: string;
  expiresAt: string | null;
}

export default function UrlRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [urlData, setUrlData] = useState<UrlData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    fetchUrl();
  }, [slug]);

  useEffect(() => {
    if (urlData && !urlData.hasPassword && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    
    if (countdown === 0 && urlData && !urlData.hasPassword) {
      redirectToUrl();
    }
  }, [countdown, urlData]);

  const fetchUrl = async () => {
    try {
      const response = await fetch(`/api/urls/${slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch URL");
      }

      setUrlData(data);
      
      if (data.hasPassword) {
        setShowPasswordForm(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "URL not found");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocking(true);
    setError("");

    try {
      const response = await fetch(`/api/urls/${slug}/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to unlock");
      }

      // Update URL data and trigger redirect
      setUrlData((prev) => prev ? { ...prev, hasPassword: false, originalUrl: data.originalUrl } : null);
      setShowPasswordForm(false);
      setCountdown(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid password");
    } finally {
      setIsUnlocking(false);
    }
  };

  const redirectToUrl = async () => {
    if (urlData) {
      // Increment click count
      await fetch(`/api/urls/${slug}`, { method: "POST" });
      
      // Redirect
      window.location.href = urlData.originalUrl;
    }
  };

  const skipRedirect = () => {
    setCountdown(-1);
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

  if (showPasswordForm) {
    return (
      <div className="min-h-screen bg-surface-900 text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] animate-float" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-500/20 border border-brand-500/30 mb-4">
                <svg className="w-8 h-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Password Protected</h1>
              <p className="text-white/60">This URL requires a password to access</p>
            </div>

            <form onSubmit={handleUnlock} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  />
                </div>

                {error && (
                  <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUnlocking}
                  className="w-full px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUnlocking ? "Unlocking..." : "Unlock"}
                </button>
              </div>
            </form>

            <div className="text-center mt-8">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-900 text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-40" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-4 animate-pop">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Redirecting...</h1>
            {countdown > 0 ? (
              <p className="text-white/60">
                You will be redirected in <span className="text-brand-400 font-bold text-2xl">{countdown}</span> seconds
              </p>
            ) : (
              <p className="text-white/60">Redirecting now...</p>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl space-y-6">
            {urlData?.title && (
              <div>
                <label className="block text-sm text-white/60 mb-2">Title</label>
                <div className="text-lg font-semibold">{urlData.title}</div>
              </div>
            )}

            <div>
              <label className="block text-sm text-white/60 mb-2">Destination URL</label>
              <div className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white/80 break-all font-mono text-sm">
                {urlData?.originalUrl}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-brand-400">{urlData?.clicks || 0}</div>
                <div className="text-xs text-white/60 mt-1">Total Clicks</div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-accent">
                  {urlData?.expiresAt ? "Expires" : "∞"}
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {urlData?.expiresAt ? new Date(urlData.expiresAt).toLocaleDateString() : "Never"}
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center py-4">
              <QRCodeGenerator 
                value={typeof window !== "undefined" ? window.location.href : ""} 
                size={180}
                title={`Short_URL_${urlData?.slug}`}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={skipRedirect}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl font-semibold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={redirectToUrl}
                className="flex-1 px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-xl font-semibold transition-all duration-300"
              >
                Go Now →
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
