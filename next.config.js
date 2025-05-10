/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['t4.ftcdn.net', 'cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      }
    ],
    unoptimized: true,
  },
  // Add performance optimizations
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'react-icons',
      'phosphor-react',
      '@tabler/icons-react'
    ]
  }
}

module.exports = nextConfig 