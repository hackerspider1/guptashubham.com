import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  output: 'export',
  distDir: 'build',
  images: {
    domains: ["cdn.sanity.io", "t4.ftcdn.net"],
    unoptimized: true
  }
};

export default nextConfig;
