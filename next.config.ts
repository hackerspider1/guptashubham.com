import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
      }
    ],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp']
  },
  typescript: {
    // This will allow the build to continue even if there are TypeScript errors
    ignoreBuildErrors: true
  },
  eslint: {
    // This will allow the build to continue even if there are ESLint errors
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
