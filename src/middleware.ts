import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read cookie
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // If user is logged in and trying to access landing page
  if (refreshToken && pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",          // landing page
    "/home/:path*" // main app routes
  ],
};
