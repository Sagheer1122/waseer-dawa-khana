import { MetadataRoute } from 'next';
import { PRODUCTS as STATIC_PRODUCTS } from '@/data/products';
import { ARTICLES } from '@/data/articles';
import { getAllProducts } from '@/backend/services/productService';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waseerhairoil.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Core static pages with SEO priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ingredients`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/hair-guide`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/journal`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/wishlist`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic products from MongoDB Atlas or static fallback
  let productSlugs: string[] = [];
  try {
    const dbProducts = await getAllProducts();
    if (dbProducts && dbProducts.length > 0) {
      productSlugs = dbProducts.map((p: any) => p.slug || p._id?.toString()).filter(Boolean);
    }
  } catch (error) {
    // Graceful fallback to static products
    console.warn('[Sitemap] MongoDB products fetch notice:', error);
  }

  if (productSlugs.length === 0) {
    productSlugs = STATIC_PRODUCTS.map((p) => p.slug);
  }

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${SITE_URL}/product/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Dynamic journal articles
  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${SITE_URL}/journal/${article.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
