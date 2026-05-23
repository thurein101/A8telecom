// app/sitemap.ts
import { prisma } from "@/lib/prisma";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://amara8.com"; 

 
  const staticRoutes = [
    "",
    "/activities",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));


  const activities = await prisma.activity.findMany({
    select: { id: true, createdAt: true },
  });

  const dynamicRoutes = activities.map((activity) => ({
    url: `${baseUrl}/activities/${activity.id}`,
    lastModified: new Date(activity.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}