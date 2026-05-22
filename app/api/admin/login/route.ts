// 📁 app/api/admin/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 💡 တကယ့် Real App တွင် ဤနေရာ၌ Environment Variables (.env) ဖြင့် သိမ်းဆည်းထားသင့်သည်
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "amara8_secure_telecom";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, message: "Login Successful" });

      // 💡 Secure Cookie သတ်မှတ်ခြင်း (Browser ပိတ်လိုက်လျှင် Auto Expire ဖြစ်မည့် Session Cookie ပုံစံ)
      response.cookies.set("admin_token", "amara8_authenticated_secure_token", {
        httpOnly: true, // Client-side JS က လှမ်းဖတ်လို့မရအောင် ကာကွယ်ခြင်း (XSS Protection)
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ success: false, message: "Username သို့မဟုတ် Password မှားယွင်းနေပါသည်။" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error ဖြစ်ပွားခဲ့သည်။" }, { status: 500 });
  }
}