"use client";

export default function SlugCopyButton({ slug }: { slug: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(slug);
      const el = document.createElement("div");
      el.textContent = "Code copied! ✨";
      el.className = "fixed right-6 bottom-6 bg-green-500/90 text-white px-4 py-3 rounded-xl shadow-lg animate-pop z-50";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    } catch {
      alert("Failed to copy code");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      title="Copy code"
    >
      <svg className="w-5 h-5 text-white/60 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </button>
  );
}
