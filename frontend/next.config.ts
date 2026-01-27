// Deployment Automation Test - 2026-01-28 00:54 (Key Fixed)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'chillocreative.test',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'chillocreative.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
