// src/app/l/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import LinkTreeClient from "@/components/LinkTreeClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getLinkTree(slug: string) {
  try {
    const linkTree = await prisma.linkTree.findUnique({
      where: { slug },
    });

    if (!linkTree) {
      return null;
    }

    // Increment views
    await prisma.linkTree.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return linkTree;
  } catch (error) {
    console.error("Error fetching LinkTree:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const linkTree = await getLinkTree(slug);
  
  if (!linkTree) {
    return {
      title: "LinkTree Not Found | TextShare",
    };
  }

  return {
    title: `${linkTree.username} | TextShare LinkTree`,
    description: linkTree.bio || `Check out ${linkTree.username}'s links`,
  };
}

export default async function LinkTreePage({ params }: PageProps) {
  const { slug } = await params;
  const linkTree = await getLinkTree(slug);

  if (!linkTree) {
    notFound();
  }

  return <LinkTreeClient linkTree={linkTree as any} />;
}
