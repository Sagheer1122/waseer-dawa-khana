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
    name: 'ZULVEEN Herbal Hair Oil — WASEER Dawa Khana',
    alternateName: ['ZULVEEN', 'Zulveen Hair Oil', 'WASEER Dawa Khana', 'Waseer Hair Oil', 'Waseer Botanicals', 'Aura Botanica'],
    url: SITE_URL,
    logo: `${SITE_URL}/images/waseer-emblem.png`,
    image: `${SITE_URL}/images/waseer-hero-landscape.jpg`,
    description:
      'Handcrafted authentic cold-pressed botanical hair care remedies by WASEER Dawa Khana. Formulated to stop hair fall, awaken follicles, strengthen roots, and promote thick natural hair growth across Pakistan.',
    telephone: '+923239009042',
    priceRange: 'PKR 1799 - PKR 3499',
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
      streetAddress: 'Gulshan-e-Mustafa Society, Johar Town',
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
 * Fully compliant with Google Rich Results (Dual variant offers 1799/1999, Ratings, Shipping, Return Policy)
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
  const currentPrice = product.finalPrice || product.price || 1799;
  const imageList = product.images && product.images.length > 0
    ? product.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`))
    : [`${SITE_URL}/images/zulveen-dark-bottle.jpg`, `${SITE_URL}/images/zulveen-light-bottle.jpg`];

  const shippingDetails = {
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
  };

  const returnPolicy = {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'PK',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 14,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/product/${product.slug}#product`,
    name: product.name,
    image: imageList,
    description:
      product.description ||
      'ZULVEEN pure cold-pressed botanical hair oil handcrafted by WASEER Dawa Khana to nourish roots, eliminate hair fall, and stimulate dense growth.',
    brand: {
      '@type': 'Brand',
      name: 'WASEER Dawa Khana',
      url: SITE_URL,
    },
    sku: `WSR-${product.slug.toUpperCase().slice(0, 8)}`,
    mpn: `WSR-${product.slug.toUpperCase().slice(0, 8)}`,
    category: 'Hair Care > Hair Loss Treatments & Oils',
    offers: [
      {
        '@type': 'Offer',
        name: 'Matte Black Edition (200ml)',
        url: `${SITE_URL}/product/${product.slug}?variant=dark`,
        priceCurrency: 'PKR',
        price: 1799,
        priceValidUntil: '2028-12-31',
        availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'WASEER Dawa Khana',
        },
        shippingDetails,
        hasMerchantReturnPolicy: returnPolicy,
      },
      {
        '@type': 'Offer',
        name: 'Crystal Clear Edition (200ml)',
        url: `${SITE_URL}/product/${product.slug}?variant=light`,
        priceCurrency: 'PKR',
        price: 1999,
        priceValidUntil: '2028-12-31',
        availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'WASEER Dawa Khana',
        },
        shippingDetails,
        hasMerchantReturnPolicy: returnPolicy,
      },
    ],
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
    question: 'How does ZULVEEN Herbal Hair Oil by WASEER Dawa Khana stop hair fall and trigger regrowth?',
    answer:
      'ZULVEEN Herbal Hair Oil by WASEER Dawa Khana combines cold-pressed golden jojoba, pure rosemary, virgin argan, and indigenous kalonji. These unani bio-actives penetrate deep into the dermal papilla to halt active hair fall, soothe dry dandruff, and awaken dormant follicles for fast, natural hair growth.',
  },
  {
    question: 'What is the price of ZULVEEN Herbal Hair Oil in Pakistan?',
    answer:
      'ZULVEEN Herbal Hair Oil (200ml) is available in two luxury editions: Matte Black Dark Bottle at Rs. 1,799 and Crystal Clear Light Bottle at Rs. 1,999. We also offer a 2-Bottle Family Pack (400ml) at a discounted bundle price of Rs. 3,499.',
  },
  {
    question: 'What are the delivery charges for Lahore and other cities in Pakistan?',
    answer:
      'We provide 100% FREE Delivery across Lahore! For all other cities across Pakistan (Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, etc.), delivery is Rs. 250 via trusted courier partners (TCS / Leopards) with Cash on Delivery (COD).',
  },
  {
    question: 'Is ZULVEEN 100% natural and free of mineral oils or chemicals?',
    answer:
      'Yes, 100%. Formulated by WASEER Dawa Khana using centuries-old traditional Unani preparation methods. It is 100% steroid-free, chemical-free, mineral oil-free, and cruelty-free. Safe for daily use by both men and women.',
  },
  {
    question: 'How long does it take to see visible results with ZULVEEN Hair Oil?',
    answer:
      'Most users experience a visible reduction in hair shedding and dandruff flakes within 14 to 21 days. Noticeable new baby hair growth and improved root thickness appear within 6 to 8 weeks with regular 2-3 weekly massages.',
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

