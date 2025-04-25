import { MetadataRoute } from 'next';

// Set as static for export compatibility
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'],
    },
    sitemap: 'https://guptashubham.com/sitemap.xml',
  };
} 