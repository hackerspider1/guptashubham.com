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
  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
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
      '@tabler/icons-react',
      '@splinetool/react-spline'
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Simplified webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Add buffer polyfill for Spline
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve('buffer'),
    };
    
    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    
    return config;
  },
}

module.exports = nextConfig 