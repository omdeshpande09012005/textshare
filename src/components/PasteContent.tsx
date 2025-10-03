"use client";

import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function PasteContent({
  content,
  contentType,
}: {
  content: string | null | undefined;
  contentType: string;
}) {
  if (!content) {
    return <div className="text-sm text-gray-500">Empty paste</div>;
  }

  if (contentType === "markdown") {
    return <MarkdownRenderer content={content} />;
  }

  return (
    <pre className="whitespace-pre-wrap break-words bg-gray-100 p-4 rounded font-mono">
      {content}
    </pre>
  );
}
