import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'chillocreative.test',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
