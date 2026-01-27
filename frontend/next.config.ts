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
  experimental: {
    // This silences the warning about multiple lockfiles by explicitly defining the project root
    turbo: {
      root: './',
    },
  } as any,
};

export default nextConfig;
