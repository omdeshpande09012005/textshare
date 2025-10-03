// src/app/docs/faqs/page.tsx
"use client";
import { useState } from "react";
import FloatingActionMenu from "@/components/FloatingActionMenu";

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is TextShare?",
      answer: "TextShare is a free, ephemeral content sharing platform. Share text, files, URLs, QR codes, and create bio link pages - all without signing up!"
    },
    {
      question: "Do I need to create an account?",
      answer: "Nope! That's the beauty of TextShare. No signup, no login, no hassle. Just share and go. We believe in keeping things simple."
    },
    {
      question: "How long do shares last?",
      answer: "Shares are ephemeral and auto-expire based on your settings. Files and pastes last up to 7 days (default), URLs up to 30 days, and you can set custom expiry up to 90 days maximum. After expiry, content is automatically deleted for your security and to keep our service sustainable."
    },
    {
      question: "Is there a file size limit?",
      answer: "Yes, currently you can upload files up to 10MB per file (max 5 files, 25MB total per upload). Text pastes are limited to 500KB. These limits help us keep the service free and fast for everyone!"
    },
    {
      question: "Are there any usage limits?",
      answer: "To prevent abuse and keep the service free, we have fair usage limits: 50 requests per 15 minutes (general), 10 file uploads per hour, 20 pastes per hour, and 30 URL shortenings per hour. Most users never hit these limits during normal use."
    },
    {
      question: "Can I password protect my shares?",
      answer: "Absolutely! When creating a share, you can optionally set a password. Recipients will need to enter this password to access your content."
    },
    {
      question: "Are my files secure?",
      answer: "Yes! All uploads are encrypted, and we use secure connections (HTTPS). Plus, with auto-expiry, your content doesn't stick around forever. We also don't track or store any personal information."
    },
    {
      question: "Can I share with mobile apps like WhatsApp?",
      answer: "Yes! Our mobile sharing feature lets you share files directly to WhatsApp, Telegram, and other apps using your phone's native share menu."
    },
    {
      question: "What file types are supported?",
      answer: "Almost everything! Documents (PDF, DOC, DOCX), images (JPG, PNG, GIF), videos (MP4, MOV), audio files, archives (ZIP, RAR), and more."
    },
    {
      question: "How do QR codes work?",
      answer: "Create a QR code for any URL, customize the colors and style, then download or share it. Anyone can scan it with their phone camera to instantly access your link."
    },
    {
      question: "What is LinkTree feature?",
      answer: "It's like Linktree! Create a bio link page with all your important links (social media, website, etc.) in one shareable URL. Perfect for Instagram bios!"
    },
    {
      question: "Can I edit a share after creating it?",
      answer: "Currently, shares are immutable once created. This is a security feature. If you need to make changes, create a new share with the updated content."
    },
    {
      question: "Is TextShare really free?",
      answer: "Yes! All core features are completely free forever. We believe in accessible tools for everyone. No hidden costs, no premium tiers (yet 😉)."
    },
    {
      question: "What happens if I lose my share code?",
      answer: "Unfortunately, share codes cannot be recovered. Make sure to save or bookmark your share links! Pro tip: Copy the link right after creating a share."
    },
    {
      question: "Can I see who accessed my share?",
      answer: "We keep things privacy-first, so we don't track individual viewers. However, URL shortener links show basic click statistics."
    },
    {
      question: "Does TextShare work on mobile?",
      answer: "100%! Our platform is fully responsive and works beautifully on phones, tablets, and desktops. No app download needed."
    },
    {
      question: "Can I use TextShare for business?",
      answer: "Absolutely! Many teams use TextShare for quick file sharing, code snippets, and temporary collaboration. Just remember shares are ephemeral."
    },
    {
      question: "What browsers are supported?",
      answer: "TextShare works on all modern browsers: Chrome, Firefox, Safari, Edge, and more. We recommend keeping your browser updated for the best experience."
    },
    {
      question: "How can I report abuse or inappropriate content?",
      answer: "Please contact us immediately through our Contact page. We take abuse seriously and will investigate promptly."
    },
    {
      question: "Can I delete my share before it expires?",
      answer: "Currently, shares auto-expire based on your settings. Early deletion isn't available yet, but it's on our roadmap!"
    },
    {
      question: "Do you have an API?",
      answer: "Yes! Check out our API documentation for details on integrating TextShare into your applications."
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/20 border-2 border-brand-500/30 mb-6">
            ❓
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/60 dark:text-white/60 light:text-text-dark/70">
            Got questions? We've got answers!
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-glow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    openIndex === index 
                      ? 'bg-brand-500 text-white' 
                      : 'bg-brand-500/20 text-brand-400'
                  }`}>
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg">{faq.question}</h3>
                </div>
                <svg
                  className={`w-5 h-5 text-brand-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 pl-[4.5rem]">
                  <p className="text-white/70 dark:text-white/70 light:text-text-dark/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-br from-brand-500/20 to-accent/20 border border-brand-500/30 rounded-2xl p-8 text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-white/70 mb-6">
            Can't find what you're looking for? Drop us a message and we'll get back to you ASAP!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent rounded-xl font-semibold hover:shadow-glow-md transition-all duration-300"
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>

      <FloatingActionMenu />
    </div>
  );
}
