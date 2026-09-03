import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductByIdOrSlug, getAllProducts } from '@/backend/services/productService';
import { PRODUCTS as STATIC_PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: { slug: string };
}

function normalizeDoc(raw: any): Product {
  const price = raw.price ?? raw.originalPrice ?? raw.basePrice ?? 2450;
  const discount =
    raw.discount ??
    (raw.originalPrice
      ? Math.round(((raw.originalPrice - raw.basePrice) / raw.originalPrice) * 100)
      : 0);
  const finalPrice =
    raw.finalPrice ?? raw.basePrice ?? Math.max(0, Math.round(price * (1 - discount / 100)));
  const primaryImage =
    raw.imageUrl || (raw.images && raw.images[0]) || '/images/waseer-product-bottle.jpg';
  const productImages = raw.imageUrl
    ? [
        raw.imageUrl,
        ...(Array.isArray(raw.images) ? raw.images.filter((img: string) => img !== raw.imageUrl) : []),
      ]
    : raw.images && raw.images.length > 0
    ? raw.images
    : [primaryImage];

  return {
    ...raw,
    id: raw._id ? raw._id.toString() : raw.id,
    slug: raw.slug,
    name: raw.name,
    subtitle: raw.subtitle || '',
    category: raw.category || 'growth',
    price,
    discount,
    finalPrice,
    basePrice: finalPrice,
    originalPrice: price,
    stock: raw.stock ?? 50,
    inStock: (raw.stock ?? 1) > 0,
    imageUrl: primaryImage,
    images: productImages,
    isActive: raw.isActive ?? true,
    sizes:
      raw.sizes && raw.sizes.length > 0
        ? raw.sizes
        : [{ size: '100ml', price: finalPrice, label: 'Standard Bottle', isPopular: true }],
    benefits: raw.benefits || [
      'Stops hair fall naturally',
      'Awakens dormant follicles',
      'Eliminates dandruff and dryness',
      'Restores mirror-like shine',
    ],
    rating: raw.rating ?? 4.9,
    reviewCount: raw.reviewCount ?? 120,
    description: raw.description || '',
    ritualStory: raw.ritualStory || '',
    ingredientsSummary: raw.ingredientsSummary || '',
    ingredientsFull: raw.ingredientsFull || [],
    keyBotanicals: raw.keyBotanicals || [],
    usage: raw.usage || {
      step1: 'Apply drops to scalp',
      step2: 'Massage gently for 3-5 minutes',
      step3: 'Leave overnight or 30 minutes before washing',
    },
    faqs: raw.faqs || [],
    hairTypes: raw.hairTypes || ['all'],
    concerns: raw.concerns || ['growth', 'scalp'],
  };
}

import { generateProductSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let doc: any = null;
  try {
    doc = await getProductByIdOrSlug(params.slug);
  } catch (e) {
    // ignore
  }

  const product = doc
    ? normalizeDoc(doc.toObject ? doc.toObject() : JSON.parse(JSON.stringify(doc)))
    : (STATIC_PRODUCTS.find((p) => p.slug === params.slug) as Product | undefined);

  if (!product) {
    return {
      title: 'Formulation Not Found | WASEER Herbal Hair Oil',
    };
  }

  const title = `${product.name} — 100% Herbal Oil | WASEER Dawa Khana`;
  const description =
    product.subtitle ||
    product.description?.slice(0, 160) ||
    'Order authentic WASEER herbal hair oil for hair growth, root strengthening and dandruff control across Pakistan.';
  const productUrl = `${SITE_URL}/product/${product.slug}`;
  const primaryImage = product.imageUrl || product.images[0] || '/images/waseer-product-bottle.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title,
      description,
      url: productUrl,
      images: [
        {
          url: primaryImage.startsWith('http') ? primaryImage : `${SITE_URL}${primaryImage}`,
          width: 1200,
          height: 1200,
          alt: `${product.name} - WASEER Dawa Khana`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [primaryImage.startsWith('http') ? primaryImage : `${SITE_URL}${primaryImage}`],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  let doc: any = null;
  let allDocs: any[] = [];

  try {
    doc = await getProductByIdOrSlug(params.slug);
    allDocs = await getAllProducts();
  } catch (e) {
    console.error('[ProductDetailPage] MongoDB fetch notice:', e);
  }

  let product: Product | null = null;
  if (doc) {
    const raw = doc.toObject ? doc.toObject() : JSON.parse(JSON.stringify(doc));
    product = normalizeDoc(raw);
  } else {
    const fallback = STATIC_PRODUCTS.find((p) => p.slug === params.slug);
    if (fallback) product = fallback as Product;
  }

  if (!product) {
    notFound();
  }

  let relatedProducts: Product[] = [];
  if (allDocs && allDocs.length > 0) {
    relatedProducts = allDocs
      .map((d) => normalizeDoc(d.toObject ? d.toObject() : JSON.parse(JSON.stringify(d))))
      .filter((p) => p.slug !== params.slug)
      .slice(0, 4);
  } else {
    relatedProducts = (STATIC_PRODUCTS as Product[])
      .filter((p) => p.slug !== params.slug)
      .slice(0, 4);
  }

  const productSchema = generateProductSchema({
    name: product.name,
    slug: product.slug,
    description: product.description,
    imageUrl: product.imageUrl,
    images: product.images,
    price: product.price,
    finalPrice: product.finalPrice,
    rating: product.rating,
    reviewCount: product.reviewCount,
    inStock: product.inStock,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: product.name, url: `/product/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient initialProduct={product} relatedProducts={relatedProducts} />
    </>
  );
}
