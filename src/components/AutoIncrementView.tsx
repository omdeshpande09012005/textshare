"use client";

import { useEffect, useState } from "react";

export default function AutoIncrementView({
  slug,
  initial,
}: {
  slug: string;
  initial: number;
}) {
  const [count, setCount] = useState<number>(initial);
  const [didPing, setDidPing] = useState(false);

  useEffect(() => {
    // only run once on mount
    if (!slug || didPing) return;
    setDidPing(true);

    // call the unlock endpoint (no password) which will increment viewCount for non-protected pastes
    (async () => {
      try {
        const res = await fetch(`/api/pastes/${encodeURIComponent(slug)}/unlock`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}), // no password for public paste
        });

        // the endpoint returns { ok: true, content, viewCount } on success
        const data = await res.json().catch(() => null);
        if (res.ok && data && typeof data.viewCount === "number") {
          setCount(data.viewCount);
        } else {
          // not critical — we just leave the initial count
          // optional: handle 401/410 etc if you want to show messages
          // console.debug("auto increment not applied", res.status, data);
        }
      } catch (err) {
        // network error: ignore silently
        // console.error("Auto increment view error:", err);
      }
    })();
  }, [slug, didPing]);

  return <div className="text-right text-xs text-gray-500"><div>Created: {/* leaving creation date rendering to parent if needed */}</div><div>Views: {count}</div></div>;
}
