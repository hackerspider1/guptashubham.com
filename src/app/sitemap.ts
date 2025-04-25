import { MetadataRoute } from 'next';

// Set as static for export compatibility
export const dynamic = 'force-static';

const siteUrl = 'https://guptashubham.com';

// Main pages of the website
const routes = [
  '',
  '/about',
  '/blog',
  '/resume',
  '/contact',
  '/resources/cors-poc-generator',
  '/resources/xss-scanner',
  '/http-request',
  '/what-is-hacking',
  '/privacy-policy'
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Create the base sitemap with the main routes
  const sitemap = routes.map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  })) as MetadataRoute.Sitemap;

  return sitemap;
} 