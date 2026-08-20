"use client";

// utils/navigate.ts
import type { Router } from "next/router";

/**
 * Get the root domain based on the current hostname.
 * Works for localhost, 127.0.0.1, and production domains.
 */
/**
 * Get the root domain based on the current hostname.
 * Works for localhost, 127.0.0.1, vercel.app, and production domains.
 */
function getRootDomain(): string {
  const { hostname } = window.location;

  // Local development or vercel preview deployments
  if (
    hostname.includes("localhost") ||
    hostname.includes("127.0.0.1") ||
    hostname.endsWith(".vercel.app")
  ) {
    return hostname;
  }

  // For production custom domain (e.g. feedple.com): take last two segments
  const parts = hostname.split(".");
  if (parts.length > 2) {
    return parts.slice(-2).join(".");
  }
  return hostname;
}

/**
 * Navigate to a root route (full page reload), automatically handling local dev and production.
 * @param path The path relative to root, e.g., "/home", "/login"
 */
export function navigateToRoot(path: string = "/") {
  const { protocol, port } = window.location;
  const rootDomain = getRootDomain();

  const portPart = port && !rootDomain.includes("localhost") ? `:${port}` : "";
  const url = `${protocol}//${rootDomain}${portPart}${path}`;

  window.location.href = url;
}

/**
 * Optional: Next.js router version (SPA navigation if on same origin)
 */
export function navigateToRootRouter(router: Router, path: string = "/") {
  const { protocol, hostname, port } = window.location;
  const rootDomain = getRootDomain();

  const portPart =
    (hostname.includes("lvh.me") || hostname.includes("localhost")) && port
      ? `:${port}`
      : "";
  const url = `${protocol}//${rootDomain}${portPart}${path}`;

  // If already on root domain, use SPA router; else full redirect
  if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
    router.push(path); // SPA navigation
  } else {
    window.location.href = url; // full page reload
  }
}

export function navigateToSubdomain(
  subdomain: string,
  path: string = "/"
) {
  const { protocol, port, hostname } = window.location;

  const isLocalhost =
    hostname.includes("localhost") || hostname.includes("127.0.0.1");
  const isVercelHost = hostname.endsWith(".vercel.app");

  const portPart = port ? `:${port}` : "";

  // On *.vercel.app, nested subdomains (name.feedple.vercel.app) are NOT supported by Vercel.
  // Fall back to path-based routing (e.g. feedple.vercel.app/name)
  if (isVercelHost) {
    const formattedPath = path === "/" ? "" : path;
    window.location.href = `${protocol}//${hostname}${portPart}/${subdomain}${formattedPath}`;
    return;
  }

  // lvh.me & custom domains (e.g. feedple.com) support subdomains
  if (!isLocalhost) {
    const parts = hostname.split(".");
    const rootDomain = parts.slice(-2).join("."); // e.g. feedple.com

    window.location.href = `${protocol}//${subdomain}.${rootDomain}${portPart}${path}`;
    return;
  }

  // localhost fallback (no subdomains)
  window.location.href = `${protocol}//localhost${portPart}${path}`;
}

/**
 * Helper to construct an author-specific route path.
 * Works seamlessly whether on a subdomain (e.g. name.feedple.com/chat -> /chat)
 * or path-based route (e.g. feedple.vercel.app/name/chat -> /name/chat).
 */
export function getAuthorPath(handle: string, subPath: string, pathname: string): string {
  const cleanSubPath = subPath.startsWith("/") ? subPath : `/${subPath}`;
  if (pathname === `/${handle}` || pathname.startsWith(`/${handle}/`)) {
    return `/${handle}${cleanSubPath === "/" ? "" : cleanSubPath}`;
  }
  return cleanSubPath;
}
