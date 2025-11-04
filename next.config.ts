import { NextConfig } from "next";

const config: NextConfig = {
  async rewrites() {
    const apiTarget =
      process.env.BACKEND_URL || "http://127.0.0.1:8000/api/py/";
    return [
      {
        source: "/api/py/:path*",
        destination: `${apiTarget}:path*`, // Proxy to FastAPI
      },
    ];
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.0.130', 'localhost', '127.0.0.1'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
