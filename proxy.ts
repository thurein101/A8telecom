// 📁 middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const adminSession = request.cookies.get("admin_token");
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  // Admin page ကို သွားနေပြီး Cookie ထဲမှာ token မရှိရင် Login page သို့ မောင်းထုတ်မည်
  if (isAdminPage && !adminSession && request.nextUrl.pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// 💡 /admin အောက်က သမျှ လမ်းကြောင်းအားလုံးကို စစ်ထုတ်ခိုင်းခြင်း
export const config = {
  matcher: ["/admin/:path*"],
};