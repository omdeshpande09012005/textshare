// src/app/layout.tsx
import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "TextShare",
  description: "Simple ephemeral text sharing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-gray-50 dark:bg-surface-900 text-gray-900 dark:text-white antialiased">
        {/* top nav - full width */}
        <header className="sticky top-0 z-40 w-full">
          <Navbar />
        </header>

        {/* main content area */}
        <div className="pt-8 pb-16">
          <main className="mx-auto max-w-[1100px] px-6">{children}</main>
        </div>

        {/* footer */}
        <Footer />
      </body>
    </html>
  );
}
