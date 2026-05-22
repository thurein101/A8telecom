// 📁 app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  // Token အား ဖျက်ချလိုက်ခြင်း
  response.cookies.set("admin_token", "", { path: "/", expires: new Date(0) });
  return response;
}