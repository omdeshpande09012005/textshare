// src/app/qr/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import type { Metadata } from "next";

interface QRPageProps {
  params: Promise<{ slug: string }>;
}

async function getQRCode(slug: string) {
  const qrCode = await prisma.qRCode.findUnique({
    where: { slug },
  });

  if (!qrCode) {
    return null;
  }

  // Increment view count
  await prisma.qRCode.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });

  return qrCode;
}

export async function generateMetadata({ params }: QRPageProps): Promise<Metadata> {
  const { slug } = await params;
  const qrCode = await getQRCode(slug);

  if (!qrCode) {
    return {
      title: "QR Code Not Found | TextShare",
    };
  }

  return {
    title: qrCode.title ? `${qrCode.title} | TextShare` : "QR Code | TextShare",
    description: `QR Code for: ${qrCode.url}`,
  };
}

export default async function QRCodePage({ params }: QRPageProps) {
  const { slug } = await params;
  const qrCode = await getQRCode(slug);

  if (!qrCode) {
    notFound();
  }

  return <QRCodeDisplay qrCode={qrCode} />;
}
