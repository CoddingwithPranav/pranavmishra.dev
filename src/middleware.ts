import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Middleware running for path:", pathname);

  // Protect /admin route, but allow /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const authToken = request.cookies.get("auth_token")?.value;

    if (!authToken || authToken !== "authenticated") {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};