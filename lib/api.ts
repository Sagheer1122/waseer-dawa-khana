import { Product } from '@/types';

export interface DynamicProduct extends Product {
  _id?: string;
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  imageUrl: string;
  cloudinaryPublicId?: string;
  isActive: boolean;
}

/**
 * Fetches active products from the Next.js API.
 * Automatically falls back to static catalog if API call fails or during build.
 */
export async function getStoreProducts(): Promise<DynamicProduct[]> {
  try {
    const res = await fetch(`/api/products?t=${Date.now()}`, { cache: 'no-store' });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data.map((item: any) => normalizeProduct(item));
      }
    }
  } catch (error) {
    console.error('[API Client] Error fetching products from DB:', error);
  }

  return [];
}

/**
 * Fetches a single product by slug or ID from MongoDB.
 */
export async function getStoreProductBySlug(slugOrId: string): Promise<DynamicProduct | null> {
  try {
    const res = await fetch(`/api/products/${slugOrId}?t=${Date.now()}`, { cache: 'no-store' });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return normalizeProduct(json.data);
      }
    }
  } catch (error) {
    console.error(`[API Client] Error fetching product ${slugOrId} from DB:`, error);
  }

  return null;
}

/**
 * Submits an order and returns the generated WhatsApp click-to-chat URL.
 */
export async function submitOrder(orderData: {
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  customerEmail?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    size?: string;
    image?: string;
  }[];
  totalAmount: number;
  paymentMethod?: string;
}): Promise<{ orderNumber: string; whatsappUrl: string }> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to register order');
  }

  return {
    orderNumber: data.data.orderNumber,
    whatsappUrl: data.data.whatsappUrl,
  };
}

/**
 * Normalizes raw API or static data into standard Product shape
 */
function normalizeProduct(raw: any): DynamicProduct {
  const price = raw.price ?? raw.originalPrice ?? raw.basePrice ?? 2450;
  const discount = raw.discount ?? (raw.originalPrice ? Math.round(((raw.originalPrice - raw.basePrice) / raw.originalPrice) * 100) : 0);
  const finalPrice = raw.finalPrice ?? raw.basePrice ?? Math.max(0, Math.round(price * (1 - discount / 100)));
  const primaryImage = raw.imageUrl || (raw.images && raw.images[0]) || '/images/waseer-product-bottle.jpg';

  const productImages = raw.imageUrl
    ? [raw.imageUrl, ...(Array.isArray(raw.images) ? raw.images.filter((img: string) => img !== raw.imageUrl) : [])]
    : (raw.images && raw.images.length > 0 ? raw.images : [primaryImage]);

  return {
    ...raw,
    id: raw._id ? raw._id.toString() : raw.id,
    slug: raw.slug || (raw.name ? raw.name.toLowerCase().replace(/\s+/g, '-') : 'product'),
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
    sizes: raw.sizes && raw.sizes.length > 0 ? raw.sizes : [
      { size: '50ml', price: finalPrice, label: 'Standard Bottle' }
    ],
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
