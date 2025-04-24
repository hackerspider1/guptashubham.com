/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
}

module.exports = nextConfig 