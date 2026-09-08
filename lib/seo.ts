/**
 * SEO & Schema.org JSON-LD Utilities for WASEER Herbal Hair Oil
 * Designed to generate rich snippets for Google Search:
 * - Product (Merchant Listings, Free Shipping, 14-Day Return Policy)
 * - MedicalBusiness / LocalBusiness (Geo coordinates, Opening Hours, Pakistan COD)
 * - FAQPage (Search engine expandable rich snippets)
 * - Article / BlogPosting (E-E-A-T Editorial Board)
 * - BreadcrumbList
 * - WebSite with Sitelinks SearchBox
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.waseerdawakhana.com';

/**
 * Organization, Store, and LocalBusiness schema for WASEER Dawa Khana
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: 'WASEER Herbal Hair Oil — WASEER Dawa Khana',
    alternateName: ['Waseer Dawa Khana', 'Waseer Hair Oil', 'Waseer Botanicals', 'Aura Botanica'],
    url: SITE_URL,
    logo: `${SITE_URL}/images/waseer-emblem.png`,
    image: `${SITE_URL}/images/waseer-hero-landscape.jpg`,
    description:
      'Handcrafted authentic cold-pressed botanical hair care remedies by WASEER Dawa Khana. Formulated to stop hair fall, awaken follicles, strengthen roots, and promote thick natural hair growth across Pakistan.',
    telephone: '+923239009042',
    priceRange: 'PKR 1500 - PKR 5000',
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Cash on Delivery, Bank Transfer, EasyPaisa, JazzCash',
    openingHours: 'Mo-Sa 09:00-21:00',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.5204,
      longitude: 74.3587,
    },
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
 * Product Rich Snippet schema for Google Search & Merchant Listings
 * Fully compliant with Google Rich Results (Price, Ratings, Shipping, Return Policy)
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
      url: SITE_URL,
    },
    sku: `WSR-${product.slug.toUpperCase().slice(0, 8)}`,
    mpn: `WSR-${product.slug.toUpperCase().slice(0, 8)}`,
    category: 'Hair Care > Hair Loss Treatments & Oils',
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
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'PKR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'PK',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 4,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'PK',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
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
 * FAQ Schema for Google Rich Snippets in Search Results
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * High-ranking search questions and verified answers for WASEER Hair Oil
 */
export const HOMEPAGE_FAQS = [
  {
    question: 'How does WASEER Herbal Hair Oil stop hair fall and trigger regrowth?',
    answer:
      'WASEER Herbal Hair Oil combines cold-pressed sesame and almond carrier oils steeped with 21 potent botanical herbs including Amla, Shikakai, Bhringraj, Methi Dana, and Rosemary. These bio-actives penetrate deep into the scalp to block DHT, soothe micro-inflammation, and nourish dormant follicles back into the active anagen growth phase.',
  },
  {
    question: 'How long does it take to see visible results with WASEER Herbal Hair Oil?',
    answer:
      'Most customers notice an 80% reduction in hair fall and reduced scalp dryness within the first 14 to 21 days of regular use. Visible new baby hair growth and increased density typically appear within 6 to 8 weeks with 3 application sessions per week.',
  },
  {
    question: 'Is WASEER Hair Oil 100% natural and free of chemicals or Minoxidil?',
    answer:
      'Yes, 100%. Our formulations are prepared according to traditional unani methods by WASEER Dawa Khana. They contain zero mineral oils, zero parabens, zero silicones, zero artificial fragrances, and absolutely no synthetic pharmaceutical chemicals like Minoxidil or Finasteride.',
  },
  {
    question: 'Do you deliver across Pakistan with Cash on Delivery (COD)?',
    answer:
      'Yes, we provide nationwide Cash on Delivery (COD) to Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and all other cities and towns across Pakistan with delivery in 2 to 4 business days.',
  },
  {
    question: 'How should I apply WASEER Herbal Hair Oil for the best results?',
    answer:
      'Apply 5-8 drops directly to your scalp section by section. Massage gently with your fingertips in circular motions for 3-5 minutes to stimulate blood circulation. Leave on for at least 45 minutes or overnight, then wash with a mild herbal sulfate-free shampoo. Use 3 times weekly.',
  },
];

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

