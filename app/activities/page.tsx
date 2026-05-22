import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import ActivitiesCom from "@/components/Activities/activities";

const ITEMS_PER_PAGE = 4;

interface ActivitiesPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

async function ActivitiesDataSection({
  searchParams,
}: ActivitiesPageProps) {
  noStore();

  const params = await searchParams;

  // current page
  const currentPage = Number(params.page) || 1;

  // skip logic
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // total count
  const totalActivities = await prisma.activity.count();

  // total pages
  const totalPages = Math.ceil(
    totalActivities / ITEMS_PER_PAGE
  );

  // paginated query
  const activities = await prisma.activity.findMany({
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: ITEMS_PER_PAGE,
  });

  const formattedActivities = activities.map((act) => ({
    id: act.id,
    title: act.title,
    titleMm: act.titleMm,
    subTitle: act.subTitle,
    description: act.description,

    images: act.images.map((img) => ({
      url: img.url,
      key: img.key,
    })),

    createdAt: act.createdAt.toISOString(),
  }));

  return (
    <ActivitiesCom
      initialActivities={formattedActivities}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}

export default function ActivitiesPage(
  props: ActivitiesPageProps
) {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-cyan-400 font-mono text-xs tracking-widest animate-pulse">
            RETRIEVING OPERATIONAL LOGS...
          </div>
        }
      >
        <ActivitiesDataSection {...props} />
      </Suspense>
    </div>
  );
}