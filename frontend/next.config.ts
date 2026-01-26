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
