// src/app/docs/api/page.tsx
"use client";
import { useState } from "react";
import FloatingActionMenu from "@/components/FloatingActionMenu";

export default function APIDocsPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const endpoints = [
    {
      method: "POST",
      path: "/api/pastes",
      title: "Create Text Paste",
      description: "Create a new text paste with optional password protection and expiry",
      request: {
        content: "Your text content here",
        title: "Optional title",
        password: "optional_password",
        expiresIn: "1h | 1d | 7d"
      },
      response: {
        success: true,
        slug: "abc123def456",
        url: "https://your-deployment-url.vercel.app/p/abc123def456",
        expiresAt: "2025-10-04T12:00:00Z"
      }
    },
    {
      method: "POST",
      path: "/api/files",
      title: "Upload File",
      description: "Upload one or multiple files (max 10MB per file)",
      request: "FormData with 'files' field",
      response: {
        success: true,
        files: [
          {
            slug: "file123abc",
            filename: "document.pdf",
            size: 1024000,
            url: "https://your-deployment-url.vercel.app/f/file123abc"
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/api/shorten",
      title: "Shorten URL",
      description: "Create a shortened URL with optional custom slug",
      request: {
        url: "https://very-long-url.com/path/to/page",
        customSlug: "optional-custom-slug",
        expiresIn: "7d"
      },
      response: {
        success: true,
        slug: "abc123",
        shortUrl: "https://your-deployment-url.vercel.app/s/abc123",
        originalUrl: "https://very-long-url.com/path/to/page"
      }
    },
    {
      method: "GET",
      path: "/api/pastes/{slug}",
      title: "Get Paste",
      description: "Retrieve a text paste by its slug",
      request: null,
      response: {
        success: true,
        content: "Text content",
        title: "Paste title",
        createdAt: "2025-10-03T12:00:00Z",
        expiresAt: "2025-10-04T12:00:00Z",
        hasPassword: false
      }
    },
    {
      method: "GET",
      path: "/api/files/{slug}",
      title: "Download File",
      description: "Download a file by its slug",
      request: null,
      response: "Binary file data with appropriate Content-Type header"
    }
  ];

  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-20 dark:opacity-20 light:opacity-10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/10 light:bg-white rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 dark:bg-accent/10 light:bg-accent/5 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/20 border-2 border-brand-500/30 mb-6">
            📚
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-lg text-white/60 dark:text-white/60 light:text-text-dark/70 max-w-2xl mx-auto">
            Integrate TextShare into your applications with our simple RESTful API
          </p>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <div className="space-y-4 text-white/70">
            <p>
              The TextShare API is a RESTful API that allows you to programmatically create pastes, upload files, shorten URLs, and more.
            </p>
            <div className="bg-surface-800/50 rounded-xl p-4 border border-white/10">
              <p className="text-sm mb-2 text-white/50">Base URL:</p>
              <div className="flex items-center justify-between gap-4">
                <code className="text-brand-400 text-sm sm:text-base break-all">https://your-deployment-url.vercel.app/api</code>
                <button
                  onClick={() => copyToClipboard("https://your-deployment-url.vercel.app/api", "base-url")}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  title="Copy base URL"
                >
                  {copiedEndpoint === "base-url" ? (
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-white/40 mt-2">
                Replace with your actual deployment URL (e.g., textshare.vercel.app, textshare.netlify.app)
              </p>
            </div>
            <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4">
              <p className="text-sm text-brand-300 mb-2">
                💡 <strong>Note:</strong> No authentication required. Rate limiting applied per IP address.
              </p>
              <p className="text-xs text-brand-300/80">
                ✨ Works perfectly on free hosting platforms (Vercel, Railway, Netlify) - no custom domain needed!
              </p>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="space-y-6">
          {endpoints.map((endpoint, index) => (
            <div
              key={endpoint.path}
              className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 backdrop-blur-xl shadow-xl animate-fade-up"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              {/* Endpoint Header */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  endpoint.method === "POST" 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-brand-400 text-sm sm:text-base font-mono">{endpoint.path}</code>
              </div>

              <h3 className="text-xl font-bold mb-2">{endpoint.title}</h3>
              <p className="text-white/70 text-sm mb-4">{endpoint.description}</p>

              {/* Request */}
              {endpoint.request && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-white/80">Request Body:</h4>
                  <div className="bg-surface-800/50 rounded-xl p-4 border border-white/10 relative">
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(endpoint.request, null, 2), endpoint.path + "-request")}
                      className="absolute top-2 right-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Copy request"
                    >
                      {copiedEndpoint === endpoint.path + "-request" ? (
                        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                    <pre className="text-xs sm:text-sm overflow-x-auto">
                      <code className="text-cyan-300">{typeof endpoint.request === 'string' ? endpoint.request : JSON.stringify(endpoint.request, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Response */}
              <div>
                <h4 className="text-sm font-semibold mb-2 text-white/80">Response:</h4>
                <div className="bg-surface-800/50 rounded-xl p-4 border border-white/10 relative">
                  <button
                    onClick={() => copyToClipboard(typeof endpoint.response === 'string' ? endpoint.response : JSON.stringify(endpoint.response, null, 2), endpoint.path + "-response")}
                    className="absolute top-2 right-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy response"
                  >
                    {copiedEndpoint === endpoint.path + "-response" ? (
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                  <pre className="text-xs sm:text-sm overflow-x-auto">
                    <code className="text-green-300">{typeof endpoint.response === 'string' ? endpoint.response : JSON.stringify(endpoint.response, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rate Limiting */}
        <div className="mt-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6 sm:p-8 animate-fade-up" style={{ animationDelay: "0.8s" }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Rate Limiting
          </h2>
          <p className="text-white/70 mb-4">
            To ensure fair usage, the API has the following rate limits:
          </p>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              100 requests per 15 minutes per IP address
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              500 requests per hour per IP address
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              File uploads limited to 10MB per file
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="mt-8 text-center bg-gradient-to-br from-brand-500/20 to-accent/20 border border-brand-500/30 rounded-2xl p-8 animate-fade-up" style={{ animationDelay: "0.9s" }}>
          <h2 className="text-2xl font-bold mb-3">Need Help?</h2>
          <p className="text-white/70 mb-6">
            Have questions about the API? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent rounded-xl font-semibold hover:shadow-glow-md transition-all duration-300"
          >
            Contact Support
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      <FloatingActionMenu />
    </div>
  );
}
