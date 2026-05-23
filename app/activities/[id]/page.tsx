import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ActivityDetailUI from "@/components/ActivitiesDetail";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    id: string;
  }>;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const activity = await prisma.activity.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!activity) {
    return {
      title: "Activity Not Found | A8 Telecom",
    };
  }


  const shareImage = activity.images?.[0]?.url || "/og-placeholder.jpg";

  return {
    title: `${activity.title} | A8 Telecom`,
    description: activity.description?.slice(0, 160) || "Field Operations and Project Logs by A8 Telecom",
    openGraph: {
      title: `${activity.title} - A8 Telecom`,
      description: activity.description?.slice(0, 160),
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: activity.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: activity.title,
      description: activity.description?.slice(0, 160),
      images: [shareImage],
    },
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { id } = await params;

  const activity = await prisma.activity.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });

  if (!activity) {
    notFound();
  }

  return (
    <ActivityDetailUI
      activity={{
        title: activity.title,
        titleMm: activity.titleMm || null,
        subTitle: activity.subTitle || null,
        description: activity.description,
        images: activity.images.map((img) => ({
          url: img.url,
        })),
        createdAt: activity.createdAt,
      }}
    />
  );
}