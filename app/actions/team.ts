"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// CREATE TEAM MEMBER
export async function createTeamMember(data: {
  name: string;
  role: string;
  roleMm: string;
  imageUrl: string;
  imageKey: string;
  order?: number;
}) {
  const member = await prisma.teamMember.create({
    data: {
      name: data.name,
      role: data.role,
      roleMm: data.roleMm,
      imageUrl: data.imageUrl,
      imageKey: data.imageKey,
      order: data.order ?? 0,
    },
  });
  revalidatePath("/team"); // UI Data Update ဖြစ်စေရန်
  return member;
}

export async function updateTeamMember(id: string, data: {
  name: string;
  role: string;
  roleMm: string;
  imageUrl: string;
  imageKey: string;
  order: number;
}) {
  const member = await prisma.teamMember.update({
    where: { id },
    data: {
      name: data.name,
      role: data.role,
      roleMm: data.roleMm,
      imageUrl: data.imageUrl,
      imageKey: data.imageKey,
      order: data.order,
    },
  });

  revalidatePath("/team");
  return member;
}

export async function deleteTeamMember(id: string) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/team");
  return { success: true };
}

// GET ALL TEAM MEMBERS
export async function getTeamMembers() {
  return await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });
}