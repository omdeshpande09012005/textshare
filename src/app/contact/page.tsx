// src/app/contact/page.tsx
"use client";
import { useState } from "react";
import FloatingActionMenu from "@/components/FloatingActionMenu";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = "Failed to send message";
        try {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully. We'll get back to you soon!"
      });
      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (error) {
      console.error("Contact form error:", error);
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = "Unable to connect to server. Please check your internet connection.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setSubmitStatus({
        type: "error",
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            📧
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-lg text-white/60 dark:text-white/60 light:text-text-dark/70">
            Have a question or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            {submitStatus.type && (
              <div className={`mb-6 p-4 rounded-xl border ${
                submitStatus.type === "success"
                  ? "bg-green-500/20 border-green-500/30 text-green-300"
                  : "bg-red-500/20 border-red-500/30 text-red-300"
              }`}>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {submitStatus.type === "success" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    )}
                  </svg>
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface-800/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-white placeholder-white/40"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface-800/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-white placeholder-white/40"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject <span className="text-red-400">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface-800/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-white appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5em 1.5em',
                  }}
                >
                  <option value="" className="bg-surface-800 text-white/60">Select a topic</option>
                  <option value="general" className="bg-surface-800 text-white">General Inquiry</option>
                  <option value="bug" className="bg-surface-800 text-white">Bug Report</option>
                  <option value="feature" className="bg-surface-800 text-white">Feature Request</option>
                  <option value="api" className="bg-surface-800 text-white">API Support</option>
                  <option value="abuse" className="bg-surface-800 text-white">Report Abuse</option>
                  <option value="other" className="bg-surface-800 text-white">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-surface-800/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-white placeholder-white/40 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-brand-500 to-accent rounded-xl font-semibold hover:shadow-glow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-sm text-white/60 mb-2">We typically respond within 24 hours</p>
                  <a href="mailto:omdeshpande0901@gmail.com" className="text-brand-400 hover:text-brand-500 transition-colors text-sm">
                    omdeshpande0901@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Quick Answers</h3>
                  <p className="text-sm text-white/60 mb-2">Check our FAQ for instant help</p>
                  <a href="/docs/faqs" className="text-brand-400 hover:text-brand-500 transition-colors text-sm">
                    Browse FAQs →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 light:from-brand-500/5 light:to-brand-500/10 border border-white/10 dark:border-white/10 light:border-brand-300 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Documentation</h3>
                  <p className="text-sm text-white/60 mb-2">Detailed guides and API docs</p>
                  <a href="/docs/getting-started" className="text-brand-400 hover:text-brand-500 transition-colors text-sm">
                    Read Docs →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-500/20 to-accent/20 border border-brand-500/30 rounded-2xl p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-xl">🚀</span>
                Response Time
              </h3>
              <p className="text-sm text-white/70">
                We aim to respond to all inquiries within <strong className="text-brand-400">24 hours</strong>. 
                For urgent issues, please mention "URGENT" in your subject line.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FloatingActionMenu />
    </div>
  );
}
