import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export  function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const authToken = request.cookies.get("auth_token")?.value;
    const isValid =  bcrypt.compareSync(process.env.ADMIN_PASSWORD!, authToken ?? "");
    if (!isValid) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};