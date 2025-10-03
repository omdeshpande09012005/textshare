// src/app/linktree/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Link {
  id: string;
  title: string;
  url: string;
}

export default function LinkTreePage() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState<Link[]>([{ id: crypto.randomUUID(), title: "", url: "" }]);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const addLink = () => {
    setLinks([...links, { id: crypto.randomUUID(), title: "", url: "" }]);
  };

  const removeLink = (id: string) => {
    if (links.length > 1) {
      setLinks(links.filter(link => link.id !== id));
    }
  };

  const updateLink = (id: string, field: "title" | "url", value: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!username.trim()) {
      alert("Please enter a username");
      return;
    }

    const validLinks = links.filter(link => link.title.trim() && link.url.trim());
    if (validLinks.length === 0) {
      alert("Please add at least one link");
      return;
    }

    setIsCreating(true);

    try {
      const res = await fetch("/api/linktree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          bio: bio.trim(),
          links: validLinks
        })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create LinkTree");
      }

      const data = await res.json();
      router.push(`/l/${data.slug}`);
    } catch (error: any) {
      alert(error.message || "Something went wrong");
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-900 dark:bg-surface-900 light:bg-surface-cream text-white dark:text-white light:text-text-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient animate-aurora opacity-20 dark:opacity-20 light:opacity-10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/10 light:bg-white rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 dark:bg-accent/10 light:bg-accent/5 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 md:py-16">
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
            <span className="text-xl sm:text-2xl">🔗</span>
            <span className="font-medium bg-gradient-to-r from-brand-400 to-accent bg-clip-text text-transparent">
              LinkTree Creator
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent px-4">
            Create Your Bio Link
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/60 dark:text-white/60 light:text-text-dark/70 max-w-2xl mx-auto px-4">
            One link for all your content. Perfect for Instagram, Twitter, TikTok & more 🌟
          </p>
        </div>

        {/* Main Form */}
        <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 p-4 sm:p-6 md:p-8 backdrop-blur-xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 via-accent/5 to-brand-500/5 animate-gradient-xy" />
          
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Username */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/80 dark:text-white/80 light:text-text-dark/80 mb-1.5 sm:mb-2">
                  <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Username / Display Name *
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="yourname"
                  required
                  maxLength={50}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 dark:bg-white/10 light:bg-white border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark text-sm sm:text-base placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent backdrop-blur-sm transition-all"
                />
                <p className="text-[10px] sm:text-xs text-white/40 dark:text-white/40 light:text-text-dark/60 mt-1.5 sm:mt-2">
                  This will be your display name on the page
                </p>
              </div>

              {/* Bio */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/80 dark:text-white/80 light:text-text-dark/80 mb-1.5 sm:mb-2">
                  <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Bio (Optional)
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell people about yourself..."
                  rows={3}
                  maxLength={200}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 dark:bg-white/10 light:bg-white border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark text-sm sm:text-base placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent backdrop-blur-sm transition-all resize-none"
                />
                <p className="text-[10px] sm:text-xs text-white/40 dark:text-white/40 light:text-text-dark/60 mt-1.5 sm:mt-2">
                  {bio.length}/200 characters
                </p>
              </div>

              {/* Links */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/80 dark:text-white/80 light:text-text-dark/80 mb-2 sm:mb-3">
                  <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Your Links *
                </label>
                
                <div className="space-y-3 sm:space-y-4">
                  {links.map((link, index) => (
                    <div key={link.id} className="group relative rounded-lg sm:rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 p-3 sm:p-4 hover:border-brand-500/40 transition-all">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 text-sm font-bold flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        <div className="flex-1 space-y-2 sm:space-y-3">
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) => updateLink(link.id, "title", e.target.value)}
                            placeholder={`Link title (e.g., Instagram)`}
                            className="w-full px-2.5 sm:px-3 py-2 rounded-lg bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => updateLink(link.id, "url", e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-2.5 sm:px-3 py-2 rounded-lg bg-white/10 dark:bg-white/10 light:bg-white/50 border border-white/20 dark:border-white/20 light:border-brand-300 text-white dark:text-white light:text-text-dark placeholder-white/40 dark:placeholder-white/40 light:placeholder-text-dark/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                          />
                        </div>
                        
                        {links.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLink(link.id)}
                            className="p-1.5 sm:p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-all flex-shrink-0 mt-1"
                            title="Remove link"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addLink}
                  className="mt-3 sm:mt-4 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 dark:bg-white/5 light:bg-white hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-brand-50 border border-white/10 dark:border-white/10 light:border-brand-300 hover:border-brand-500/50 text-white/70 dark:text-white/70 light:text-brand-600 hover:text-white dark:hover:text-white light:hover:text-brand-500 text-sm sm:text-base font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Link
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isCreating}
                className="w-full group relative px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-accent rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-glow-md hover:shadow-glow-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed text-white"
              >
                <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-shimmer" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isCreating ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Create My LinkTree ✨
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureBox icon="🎨" title="Customizable" description="Add unlimited links" />
          <FeatureBox icon="📊" title="Analytics" description="Track link clicks" />
          <FeatureBox icon="🔗" title="One Link" description="Share everywhere" />
        </div>
      </div>
    </div>
  );
}

function FeatureBox({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="relative rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-brand-300 p-4 backdrop-blur-sm text-center hover:border-brand-500/40 transition-colors">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm font-semibold text-white dark:text-white light:text-text-dark mb-1">{title}</div>
      <div className="text-xs text-white/50 dark:text-white/50 light:text-text-dark/60">{description}</div>
    </div>
  );
}
