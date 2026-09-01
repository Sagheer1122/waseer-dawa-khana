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

  return {
    title: `${product.name} | WASEER Dawa Khana`,
    description: product.subtitle || product.description?.slice(0, 160),
    openGraph: {
      title: `${product.name} | WASEER Dawa Khana`,
      description: product.subtitle || product.description?.slice(0, 160),
      images: [{ url: product.imageUrl || product.images[0] }],
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

  return <ProductDetailClient initialProduct={product} relatedProducts={relatedProducts} />;
}
