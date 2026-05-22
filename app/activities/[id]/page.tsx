import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ActivityDetailUI from "@/components/ActivitiesDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ActivityDetailPage({
  params,
}: Props) {

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
        titleMm: activity.titleMm,
        subTitle: activity.subTitle,
        description: activity.description,

        images: activity.images.map((img) => ({
          url: img.url,
        })),

        createdAt: activity.createdAt,
      }}
    
    />
  );
}