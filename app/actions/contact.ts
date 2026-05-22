"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ၁။ မူလရှိပြီးသား Message အသစ်သိမ်းဆည်းသည့် Function
export async function createContactMessage(data: {
  name: string;
  email?: string;
  phone: string;
  subject: string;
  message: string;
}) {
  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      },
    });
    revalidatePath("/admin/messages"); // လမ်းကြောင်းအသစ်ကို Update ဖြစ်စေရန်
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// ၂။ အသစ် - စာဖတ်ပြီးကြောင်း အမှတ်အသားပြုလုပ်ရန် Function
export async function markAsRead(id: string) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// ၃။ အသစ် - မလိုတော့သော Message ကို ဖျက်ပစ်ရန် Function
export async function deleteMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}