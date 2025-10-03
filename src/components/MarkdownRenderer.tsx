// src/components/MarkdownRenderer.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

// highlight.js theme (choose any installed style)
import "highlight.js/styles/github.css";

export default function MarkdownRenderer({ content }: { content: string }) {
  const text = String(content ?? "");

  return (
    <article className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize, rehypeHighlight as any]}
        // set link behavior via components (open in new tab, safe rel)
        components={{
          a: ({ node, ...props }) => (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </article>
  );
}
