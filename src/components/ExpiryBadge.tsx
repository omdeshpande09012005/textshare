"use client";

import React, { useEffect, useMemo, useState } from "react";

function formatRemaining(ms: number) {
  if (ms <= 0) return "Expired";
  const sec = Math.floor(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const days = Math.floor(hr / 24);
  return `${days}d`;
}

/** A small human-friendly label (e.g. "Expires in 10m") */
export default function ExpiryBadge({ expiresAt }: { expiresAt?: string | null }) {
  const expiresTs = useMemo(() => (expiresAt ? new Date(expiresAt).getTime() : undefined), [expiresAt]);
  const [now, setNow] = useState(Date.now());

  // choose interval: every 1s for <1m left, else every 30s
  useEffect(() => {
    if (!expiresTs) return;
    const tick = () => setNow(Date.now());
    const initialRem = expiresTs - Date.now();
    const intervalMs = initialRem <= 60000 ? 1000 : 30000;
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [expiresTs]);

  if (!expiresTs) {
    return null; // no expiry — don't show badge
  }

  const remaining = expiresTs - now;
  const human = formatRemaining(remaining);
  const isExpired = remaining <= 0;

  return (
    <div
      title={expiresAt ? new Date(expiresAt).toLocaleString() : ""}
      className={`inline-flex items-center gap-2 px-2 py-1 text-xs rounded ${
        isExpired ? "bg-red-100 text-red-800" : "bg-yellow-50 text-yellow-800"
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{isExpired ? "Expired" : `Expires in ${human}`}</span>
    </div>
  );
}
