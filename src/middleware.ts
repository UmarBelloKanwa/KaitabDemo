import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "tldts";

// Helper to extract subdomain
function extractSubdomain(request: NextRequest): string | null {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  const parsed = parse(hostname);
  return parsed.subdomain || null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals, API, favicon, and public files
  if (pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|mp4|json)$/)) {
    return NextResponse.next();
  }

  const subdomain = extractSubdomain(request);

  // If user is logged in and on root path, redirect to /home
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const authPages = ["/", "/login", "/signup"];
  if (!subdomain && refreshToken && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Handle subdomain rewrite
  if (subdomain) {
    // Block subdomains from accessing admin
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Rewrite root "/" to "/[subdomain]"
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/${subdomain}`, request.url));
    }

    // Rewrite all other paths to include subdomain prefix
    if (pathname !== "/") {
      return NextResponse.rewrite(
        new URL(`/${subdomain}${pathname}`, request.url)
      );
    }
  }

  // Attach subdomain header if needed
  const response = NextResponse.next();
  response.headers.set("x-subdomain", subdomain ?? "");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|[\\w-]+\\.\\w+).*)",
  ],
};
