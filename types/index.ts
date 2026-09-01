export type HairType = 'straight' | 'wavy' | 'curly' | 'coily' | 'all';
export type HairConcern = 'growth' | 'scalp' | 'dryness' | 'damage' | 'shine' | 'frizz';
export type ProductCategory = 'growth' | 'repair' | 'scalp' | 'daily' | 'bundles';

export interface ProductSize {
  size: string; // '50ml', '100ml', '150ml'
  price: number;
  label: string;
  isPopular?: boolean;
}

export interface Product {
  id: string;
  _id?: string;
  slug: string;
  name: string;
  subtitle: string;
  tag?: string;
  tagClass?: string;
  category: ProductCategory;
  hairTypes: HairType[];
  concerns: HairConcern[];
  rating: number;
  reviewCount: number;
  basePrice: number;
  originalPrice?: number;
  sizes: ProductSize[];
  images: string[];
  description: string;
  ritualStory: string;
  benefits: string[];
  ingredientsSummary: string;
  ingredientsFull: string[];
  keyBotanicals: {
    name: string;
    origin: string;
    role: string;
    image?: string;
  }[];
  usage: {
    step1: string;
    step2: string;
    step3: string;
    proTip?: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  inStock: boolean;
  stock?: number;
  price?: number;
  discount?: number;
  finalPrice?: number;
  imageUrl?: string;
  cloudinaryPublicId?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  badge?: string;
  __v?: number;
  createdAt?: any;
  updatedAt?: any;
  [key: string]: any;
}

export interface BotanicalIngredient {
  id: string;
  name: string;
  botanicalName: string;
  origin: string;
  extraction: string;
  image: string;
  colorTone: string;
  description: string;
  benefits: string[];
  richIn: string[];
  usedInProducts: string[];
}

export interface Review {
  id: string;
  productId?: string;
  productName?: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  hairType: string;
  hairConcern: string;
  headline: string;
  content: string;
  avatar?: string;
  helpfulCount: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  content: {
    sectionHeading?: string;
    paragraphs: string[];
    pullQuote?: string;
    bulletPoints?: string[];
  }[];
  tags: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  subtitle: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  rating: number;
  category: ProductCategory;
}

export interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Pending';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  trackingNumber?: string;
}
