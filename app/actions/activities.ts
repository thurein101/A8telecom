"use server";

import { prisma } from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";

interface ActivityImageInput {
  url: string;
  key: string;
}

// 1. CREATE ACTIVITY WITH MULTIPLE IMAGES
export async function createActivity(data: {
  title: string;
  titleMm: string;
  subTitle: string;
  description: string;
  images: ActivityImageInput[]; 
}) {
  try {
    const activity = await prisma.activity.create({
      data: {
        title: data.title,
        titleMm: data.titleMm,
        subTitle: data.subTitle,
        description: data.description,
        images: {
          create: data.images.map((img) => ({ url: img.url, key: img.key })),
        },
      },
    });
    
    revalidatePath("/activities");
    return activity;
  } catch (error) {
    console.error("Prisma Insert Error:", error);
    throw new Error("Database ထဲသို့ အချက်အလက်ထည့်သွင်းရန် မအောင်မြင်ပါ။");
  }
}

// 2. GET ALL ACTIVITIES WITH IMAGES
export async function getActivities() {
  try {
    return await prisma.activity.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Prisma Fetch Error:", error);
    return [];
  }
}

// 3. DELETE ACTIVITY
export async function deleteActivity(id: string) {
  try {
    await prisma.activity.delete({ where: { id } });
    revalidatePath("/activities");
    return { success: true };
  } catch (error) {
    console.error("Prisma Delete Error:", error);
    return { success: false, error: "ဖျက်ထုတ်ရန် မအောင်မြင်ပါ။" };
  }
}

// 4. UPDATE ACTIVITY (FIXED & FULLY TYPE-SAFE)
export async function updateActivity(
  id: string, 
  data: {
    title: string;
    titleMm: string;
    subTitle: string;
    description: string;
    images: ActivityImageInput[]; // 👈 ဒီမှာ မူလက images လက်ခံဖို့ ကျန်ခဲ့ပါတယ်
  }
) {
  try {
    // Relational Images တွေကို ကောင်းကောင်း Update ဖြစ်သွားအောင် Prisma Transaction သုံးပြီး 
    // ပုံအဟောင်းတွေကို အရင်ရှင်းထုတ်၊ ပြီးမှ အသစ်တွေကို အစားထိုးထည့်သွင်းပေးပါတယ်
    const activity = await prisma.$transaction(async (tx) => {
      // ပထမဦးစွာ လက်ရှိ Activity အောက်က ပုံဟောင်းတွေကို ဖျက်ထုတ်သည်
      await tx.activityImage.deleteMany({
        where: { activityId: id },
      });

      // ပြီးမှ Activity context ကို update လုပ်ပြီး ပုံအသစ်တွေကို create ပြန်လုပ်ပေးသည်
      return await tx.activity.update({
        where: { id },
        data: {
          title: data.title,
          titleMm: data.titleMm,
          subTitle: data.subTitle,
          description: data.description,
          images: {
            create: data.images.map((img) => ({ url: img.url, key: img.key })),
          },
        },
      });
    });

    revalidatePath("/activities");
    return activity;
  } catch (error) {
    console.error("Prisma Update Error:", error);
    throw new Error("Activity အချက်အလက်များ ပြင်ဆင်ရန် မအောင်မြင်ပါ။");
  }
}