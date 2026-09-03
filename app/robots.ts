import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waseerhairoil.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/shop',
          '/product/',
          '/journal/',
          '/about',
          '/ingredients',
          '/hair-guide',
          '/contact',
          '/images/',
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/api/admin',
          '/api/admin/*',
          '/api/auth',
          '/api/auth/*',
          '/checkout',
          '/cart',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
