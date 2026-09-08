import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.waseerdawakhana.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/shop',
          '/product/*',
          '/journal',
          '/journal/*',
          '/about',
          '/ingredients',
          '/hair-guide',
          '/contact',
          '/images/*',
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
          '/checkout',
          '/checkout/*',
          '/cart',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/shop',
          '/product/*',
          '/journal/*',
          '/about',
          '/ingredients',
          '/hair-guide',
          '/contact',
          '/images/*',
        ],
        disallow: [
          '/admin/*',
          '/api/*',
          '/checkout',
          '/cart',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
