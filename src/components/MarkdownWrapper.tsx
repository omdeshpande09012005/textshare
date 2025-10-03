"use client";

import MarkdownRenderer from "./MarkdownRenderer";

export default function MarkdownWrapper({ content }: { content: string }) {
  return <MarkdownRenderer content={content} />;
}
