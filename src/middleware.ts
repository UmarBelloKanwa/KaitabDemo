import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper to extract subdomain
function extractSubdomain(request: NextRequest): string | null {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Local dev: handle localhost subdomains
  if (hostname.includes(".localhost") || hostname.includes("127.0.0.1")) {
    return hostname.includes(".localhost") ? hostname.split(".")[0] : null;
  }

  // Reserved root domain
  const rootDomain = "lvh.me"; // replace with your root domain
  const rootDomainFormatted = rootDomain.split(":")[0];

  const reserved = ["www", rootDomainFormatted, `www.${rootDomainFormatted}`];

  const isSubdomain =
    hostname !== rootDomainFormatted &&
    !reserved.includes(hostname) &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, "") : null;
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
