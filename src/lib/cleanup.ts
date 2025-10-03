// src/lib/cleanup.ts
/**
 * Automatic cleanup of expired content
 * This ensures storage doesn't grow indefinitely on free hosting
 */

import { prisma } from "./prisma";
import { unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function cleanupExpiredContent() {
  console.log("[Cleanup] Starting cleanup of expired content...");
  const now = new Date();
  let totalDeleted = 0;

  try {
    // Clean up expired pastes
    const expiredPastes = await prisma.paste.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });
    console.log(`[Cleanup] Deleted ${expiredPastes.count} expired pastes`);
    totalDeleted += expiredPastes.count;

    // Clean up view-limited pastes that have exceeded maxViews
    const viewLimitedPastes = await prisma.paste.deleteMany({
      where: {
        maxViews: {
          not: null,
        },
        viewCount: {
          gte: prisma.paste.fields.maxViews,
        },
      },
    });
    console.log(`[Cleanup] Deleted ${viewLimitedPastes.count} view-limited pastes`);
    totalDeleted += viewLimitedPastes.count;

    // Clean up expired URLs
    const expiredUrls = await prisma.url.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });
    console.log(`[Cleanup] Deleted ${expiredUrls.count} expired URLs`);
    totalDeleted += expiredUrls.count;

    // Clean up click-limited URLs
    const clickLimitedUrls = await prisma.url.findMany({
      where: {
        maxClicks: {
          not: null,
        },
      },
      select: {
        id: true,
        clicks: true,
        maxClicks: true,
      },
    });

    for (const url of clickLimitedUrls) {
      if (url.maxClicks && url.clicks >= url.maxClicks) {
        await prisma.url.delete({ where: { id: url.id } });
        totalDeleted++;
      }
    }

    // Clean up expired files and their physical files
    const expiredFiles = await prisma.file.findMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
      select: {
        id: true,
        filename: true,
      },
    });

    for (const file of expiredFiles) {
      // Delete physical file
      const filePath = path.join(process.cwd(), "public", "uploads", file.filename);
      if (existsSync(filePath)) {
        try {
          await unlink(filePath);
          console.log(`[Cleanup] Deleted file: ${file.filename}`);
        } catch (error) {
          console.error(`[Cleanup] Error deleting file ${file.filename}:`, error);
        }
      }

      // Delete database record
      await prisma.file.delete({ where: { id: file.id } });
      totalDeleted++;
    }

    // Clean up download-limited files
    const downloadLimitedFiles = await prisma.file.findMany({
      where: {
        maxDownloads: {
          not: null,
        },
      },
      select: {
        id: true,
        filename: true,
        downloadCount: true,
        maxDownloads: true,
      },
    });

    for (const file of downloadLimitedFiles) {
      if (file.maxDownloads && file.downloadCount >= file.maxDownloads) {
        // Delete physical file
        const filePath = path.join(process.cwd(), "public", "uploads", file.filename);
        if (existsSync(filePath)) {
          try {
            await unlink(filePath);
            console.log(`[Cleanup] Deleted download-limited file: ${file.filename}`);
          } catch (error) {
            console.error(`[Cleanup] Error deleting file ${file.filename}:`, error);
          }
        }

        await prisma.file.delete({ where: { id: file.id } });
        totalDeleted++;
      }
    }

    // Clean up very old QR codes (90+ days)
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const oldQRCodes = await prisma.qRCode.deleteMany({
      where: {
        createdAt: {
          lte: ninetyDaysAgo,
        },
      },
    });
    console.log(`[Cleanup] Deleted ${oldQRCodes.count} old QR codes`);
    totalDeleted += oldQRCodes.count;

    // Clean up very old LinkTrees (90+ days with 0 views)
    const oldLinkTrees = await prisma.linkTree.deleteMany({
      where: {
        createdAt: {
          lte: ninetyDaysAgo,
        },
        views: 0,
      },
    });
    console.log(`[Cleanup] Deleted ${oldLinkTrees.count} old unused LinkTrees`);
    totalDeleted += oldLinkTrees.count;

    console.log(`[Cleanup] Cleanup complete! Total items deleted: ${totalDeleted}`);
    return { success: true, totalDeleted };
  } catch (error) {
    console.error("[Cleanup] Error during cleanup:", error);
    return { success: false, error };
  }
}

// Run cleanup on startup in production
if (process.env.NODE_ENV === "production") {
  // Run immediately
  cleanupExpiredContent();

  // Run every 6 hours
  setInterval(() => {
    cleanupExpiredContent();
  }, 6 * 60 * 60 * 1000);
}
