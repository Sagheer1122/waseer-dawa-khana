/**
 * SEO & Schema.org JSON-LD Utilities for WASEER Herbal Hair Oil
 * Designed to generate rich snippets for Google Search (Product, Organization, Article, Breadcrumbs)
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waseerhairoil.com';

/**
 * Organization and Store schema for WASEER Dawa Khana
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: 'WASEER Herbal Hair Oil — WASEER Dawa Khana',
    alternateName: ['Waseer Dawa Khana', 'Waseer Hair Oil', 'Aura Botanica'],
    url: SITE_URL,
    logo: `${SITE_URL}/images/waseer-emblem.png`,
    image: `${SITE_URL}/images/waseer-hero-landscape.jpg`,
    description:
      'Handcrafted authentic cold-pressed botanical hair care remedies by WASEER Dawa Khana. Formulated to stop hair fall, awaken follicles, and promote rapid natural hair growth.',
    telephone: '+923239009042',
    priceRange: 'PKR 1500 - PKR 5000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot 24-C, Main Boulevard, Gulberg III',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      postalCode: '54000',
      addressCountry: 'PK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+923239009042',
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['Urdu', 'English', 'Punjabi'],
    },
    sameAs: [
      'https://www.instagram.com',
      'https://www.facebook.com',
    ],
  };
}

/**
 * Product Rich Snippet schema for Google Search & Merchant
 */
export function generateProductSchema(product: {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  price?: number;
  finalPrice?: number;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}) {
  const currentPrice = product.finalPrice || product.price || 2450;
  const imageList = product.images && product.images.length > 0
    ? product.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`))
    : [`${SITE_URL}/images/waseer-product-bottle.jpg`];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/product/${product.slug}#product`,
    name: product.name,
    image: imageList,
    description:
      product.description ||
      'Pure cold-pressed botanical hair oil handcrafted by WASEER Dawa Khana to nourish roots, eliminate hair fall, and stimulate dense growth.',
    brand: {
      '@type': 'Brand',
      name: 'WASEER Dawa Khana',
    },
    sku: `WSR-${product.slug.toUpperCase().slice(0, 8)}`,
    mpn: `WSR-${product.slug.toUpperCase().slice(0, 8)}`,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: 'PKR',
      price: currentPrice,
      priceValidUntil: '2028-12-31',
      availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'WASEER Dawa Khana',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.9,
      reviewCount: product.reviewCount || 120,
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Article Schema for Journal & Hair Care Education
 */
export function generateArticleSchema(article: {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  readTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt || '',
    image: article.coverImage?.startsWith('http') ? article.coverImage : `${SITE_URL}${article.coverImage || '/images/waseer-hero-landscape.jpg'}`,
    datePublished: article.publishedAt || '2026-01-01',
    dateModified: article.publishedAt || '2026-01-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/journal/${article.slug}`,
    },
    author: {
      '@type': 'Organization',
      name: 'WASEER Dawa Khana Editorial Board',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'WASEER Herbal Hair Oil',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/waseer-emblem.png`,
      },
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * WebSite schema with Sitelinks Searchbox
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'WASEER Herbal Hair Oil',
    description: 'Pure authentic cold-pressed herbal hair oil formulated by WASEER Dawa Khana.',
    publisher: {
      '@type': 'Organization',
      name: 'WASEER Dawa Khana',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/shop?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

