import { NextConfig } from "next";
import getBackendUrl from "./getBackendUrl";

const config: NextConfig = {
  async rewrites() {
    const apiTarget = getBackendUrl();
    return [
      {
        source: "/api/py/:path*",
        destination: `${apiTarget}:path*`, // Proxy to FastAPI
      },
    ];
  },
  allowedDevOrigins: [
    'local-origin.dev',
    '*.local-origin.dev',
    '192.168.0.130',
    'localhost',
    '127.0.0.1',
    'lvh.me',
    '*.lvh.me',
    '.lvh.me',
   // '.feedple.com'
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
