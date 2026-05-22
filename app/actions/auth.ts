"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ၁။ Login ဝင်သည့် လုပ်ဆောင်ချက်
export async function adminLogin(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    
    // httpOnly cookie သည် JavaScript (XSS) ဖြင့် လှမ်းခိုးယူ၍မရသဖြင့် အလွန်လုံခြုံပါသည်
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2, // ၂ နာရီကြာလျှင် အလိုအလျောက် သက်တမ်းကုန်မည်
    });

    return { success: true };
  }

  return { success: false, error: "စကားဝှက် မှားယွင်းနေပါသည်။" };
}

// ၂။ အရေးကြီးဆုံးအပိုင်း - ထွက်ခွာရန် (Log Out) လုပ်ဆောင်ချက်
export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session"); // Session cookie ကို ဖျက်ပစ်ခြင်း
  redirect("/admin/login");
}