// src/lib/rate-limit.ts
import { NextRequest } from "next/server";
import { LIMITS } from "./limits";

// In-memory store for rate limiting (use Redis in production)
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const uploadCounts = new Map<string, { count: number; resetAt: number }>();
const pasteCounts = new Map<string, { count: number; resetAt: number }>();
const urlCounts = new Map<string, { count: number; resetAt: number }>();

// Cleanup old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCounts) {
    if (value.resetAt < now) requestCounts.delete(key);
  }
  for (const [key, value] of uploadCounts) {
    if (value.resetAt < now) uploadCounts.delete(key);
  }
  for (const [key, value] of pasteCounts) {
    if (value.resetAt < now) pasteCounts.delete(key);
  }
  for (const [key, value] of urlCounts) {
    if (value.resetAt < now) urlCounts.delete(key);
  }
}, 60 * 60 * 1000);

function getClientIP(req: NextRequest): string {
  // Try to get real IP from headers (useful behind proxies/CDN)
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  
  // Fallback to a generic identifier
  return "unknown";
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export function checkRateLimit(req: NextRequest): RateLimitResult {
  const ip = getClientIP(req);
  const now = Date.now();
  const windowMs = LIMITS.RATE_LIMIT.WINDOW_MS;
  const maxRequests = LIMITS.RATE_LIMIT.MAX_REQUESTS_PER_WINDOW;

  let record = requestCounts.get(ip);
  
  if (!record || record.resetAt < now) {
    // Create new window
    record = {
      count: 1,
      resetAt: now + windowMs,
    };
    requestCounts.set(ip, record);
    
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: record.resetAt,
    };
  }

  if (record.count >= maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: record.resetAt,
    };
  }

  record.count++;
  
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - record.count,
    reset: record.resetAt,
  };
}

export function checkUploadRateLimit(req: NextRequest): RateLimitResult {
  const ip = getClientIP(req);
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxUploads = LIMITS.RATE_LIMIT.MAX_UPLOADS_PER_HOUR;

  let record = uploadCounts.get(ip);
  
  if (!record || record.resetAt < now) {
    record = {
      count: 1,
      resetAt: now + windowMs,
    };
    uploadCounts.set(ip, record);
    
    return {
      success: true,
      limit: maxUploads,
      remaining: maxUploads - 1,
      reset: record.resetAt,
    };
  }

  if (record.count >= maxUploads) {
    return {
      success: false,
      limit: maxUploads,
      remaining: 0,
      reset: record.resetAt,
    };
  }

  record.count++;
  
  return {
    success: true,
    limit: maxUploads,
    remaining: maxUploads - record.count,
    reset: record.resetAt,
  };
}

export function checkPasteRateLimit(req: NextRequest): RateLimitResult {
  const ip = getClientIP(req);
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxPastes = LIMITS.RATE_LIMIT.MAX_PASTES_PER_HOUR;

  let record = pasteCounts.get(ip);
  
  if (!record || record.resetAt < now) {
    record = {
      count: 1,
      resetAt: now + windowMs,
    };
    pasteCounts.set(ip, record);
    
    return {
      success: true,
      limit: maxPastes,
      remaining: maxPastes - 1,
      reset: record.resetAt,
    };
  }

  if (record.count >= maxPastes) {
    return {
      success: false,
      limit: maxPastes,
      remaining: 0,
      reset: record.resetAt,
    };
  }

  record.count++;
  
  return {
    success: true,
    limit: maxPastes,
    remaining: maxPastes - record.count,
    reset: record.resetAt,
  };
}

export function checkUrlRateLimit(req: NextRequest): RateLimitResult {
  const ip = getClientIP(req);
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxUrls = LIMITS.RATE_LIMIT.MAX_URLS_PER_HOUR;

  let record = urlCounts.get(ip);
  
  if (!record || record.resetAt < now) {
    record = {
      count: 1,
      resetAt: now + windowMs,
    };
    urlCounts.set(ip, record);
    
    return {
      success: true,
      limit: maxUrls,
      remaining: maxUrls - 1,
      reset: record.resetAt,
    };
  }

  if (record.count >= maxUrls) {
    return {
      success: false,
      limit: maxUrls,
      remaining: 0,
      reset: record.resetAt,
    };
  }

  record.count++;
  
  return {
    success: true,
    limit: maxUrls,
    remaining: maxUrls - record.count,
    reset: record.resetAt,
  };
}
