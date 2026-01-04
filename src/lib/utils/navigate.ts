"use client";

// utils/navigate.ts
import type { Router } from "next/router";

/**
 * Get the root domain based on the current hostname.
 * Works for localhost, 127.0.0.1, and production domains.
 */
function getRootDomain(): string {
  const { hostname } = window.location;

  // Local development: localhost or 127.0.0.1
  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    return hostname; // include port separately if needed
  }

  // For production: take last two segments, e.g., "lvh.me"
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

  const portPart = port ? `:${port}` : "";

  // lvh.me supports subdomains → treat like prod
  if (!isLocalhost) {
    const parts = hostname.split(".");
    const rootDomain = parts.slice(-2).join("."); // lvh.me or feedple.com

    window.location.href = `${protocol}//${subdomain}.${rootDomain}${portPart}${path}`;
    return;
  }

  // localhost fallback (no subdomains)
  window.location.href = `${protocol}//localhost${portPart}${path}`;
}
