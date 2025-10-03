// src/lib/limits.ts
/**
 * FREE TIER LIMITS
 * These limits ensure the app can be hosted for free without abuse
 */

export const LIMITS = {
  // File Upload Limits
  FILES: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB per file (reduced from 50MB)
    MAX_FILES_PER_UPLOAD: 5, // Max 5 files at once
    MAX_TOTAL_SIZE_PER_UPLOAD: 25 * 1024 * 1024, // 25MB total per upload session
    ALLOWED_TYPES: [
      // Documents
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      // Text/Code
      "text/plain",
      "text/csv",
      "text/html",
      "text/css",
      "text/javascript",
      "application/json",
      "application/xml",
      // Images
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      // Archives
      "application/zip",
      "application/x-rar-compressed",
      "application/x-7z-compressed",
    ],
  },

  // Text/Paste Limits
  PASTE: {
    MAX_LENGTH: 500000, // 500KB of text (~500 pages)
    MAX_TITLE_LENGTH: 200,
  },

  // URL Shortener Limits
  URL: {
    MAX_URL_LENGTH: 2048,
    MAX_TITLE_LENGTH: 200,
    ALLOWED_PROTOCOLS: ["http:", "https:"],
  },

  // LinkTree Limits
  LINKTREE: {
    MAX_LINKS: 10, // Max 10 links per LinkTree
    MAX_USERNAME_LENGTH: 30,
    MAX_BIO_LENGTH: 200,
    MAX_LINK_TITLE_LENGTH: 100,
    MAX_LINK_URL_LENGTH: 500,
  },

  // QR Code Limits
  QR: {
    MAX_URL_LENGTH: 2048,
    MAX_TITLE_LENGTH: 200,
  },

  // Rate Limiting (requests per IP)
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS_PER_WINDOW: 50, // 50 requests per 15 min per IP
    MAX_UPLOADS_PER_HOUR: 10, // Max 10 file uploads per hour
    MAX_PASTES_PER_HOUR: 20, // Max 20 pastes per hour
    MAX_URLS_PER_HOUR: 30, // Max 30 URL shortens per hour
  },

  // Expiration Limits (auto-cleanup)
  EXPIRATION: {
    DEFAULT_FILE_EXPIRY_DAYS: 7, // Files expire after 7 days by default
    DEFAULT_PASTE_EXPIRY_DAYS: 7, // Pastes expire after 7 days
    DEFAULT_URL_EXPIRY_DAYS: 30, // URLs expire after 30 days
    MAX_EXPIRY_DAYS: 90, // Maximum 90 days
    CLEANUP_INTERVAL_HOURS: 6, // Run cleanup every 6 hours
  },

  // Storage Limits
  STORAGE: {
    WARNING_THRESHOLD: 80, // Warn when 80% full
    MAX_TOTAL_STORAGE_GB: 1, // Alert if total storage exceeds 1GB
  },
} as const;

// Helper function to format file sizes
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

// Helper function to check if URL is valid
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return LIMITS.URL.ALLOWED_PROTOCOLS.includes(parsed.protocol as "http:" | "https:");
  } catch {
    return false;
  }
}

// Helper to calculate expiry date
export function calculateExpiryDate(days?: number): Date {
  const maxDays = days 
    ? Math.min(days, LIMITS.EXPIRATION.MAX_EXPIRY_DAYS)
    : LIMITS.EXPIRATION.DEFAULT_FILE_EXPIRY_DAYS;
  
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + maxDays);
  return expiry;
}
