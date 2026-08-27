'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { REVIEWS } from '@/data/reviews';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductCard } from '@/components/product/ProductCard';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';
import {
  ShoppingBag,
  Zap,
  Heart,
  ShieldCheck,
  Leaf,
  Truck,
  RotateCcw,
  Check,
  Sparkles,
  ArrowRight,
  Droplet
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]?.size || '50ml');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const addToast = useUIStore((s) => s.addToast);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center text-forest">
          <Leaf className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-forest">
          Formulation Not Found
        </h1>
        <p className="font-sans text-xs text-earth-600 max-w-sm">
          This organic hair ritual could not be found or may have been archived.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-wider hover:bg-forest-700 transition-colors shadow-sm"
        >
          Return to Botanical Apothecary
        </Link>
      </div>
    );
  }

  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const currentPrice = currentSizeObj ? currentSizeObj.price : product.basePrice;
  const isFavorited = isInWishlist(product.id);

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, selectedSize, quantity);
    addToast({
      type: 'success',
      title: 'Added to Ritual Bag',
      message: `${product.name} (${selectedSize}) x ${quantity}`,
    });
    setTimeout(() => setIsAdding(false), 350);
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, quantity);
    router.push('/checkout');
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    addToast({
      type: 'info',
      title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      message: product.name,
    });
  };

  // Accordion Items
  const accordionItems: AccordionItem[] = [
    {
      id: 'benefits',
      title: 'Botanical Benefits & Scalp Impact',
      content: (
        <div className="space-y-3 pt-2">
          <p className="font-sans text-sm text-earth-700">{product.description}</p>
          <ul className="space-y-2 font-sans text-xs text-earth-800">
            {product.benefits.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-forest/10 text-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'ingredients',
      title: 'Ingredients & Sourcing Transparency',
      content: (
        <div className="space-y-4 pt-2">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-forest block mb-1">
              Key Single-Origin Bio-Actives:
            </span>
            <p className="font-sans text-xs text-earth-700 leading-relaxed bg-cream-100 p-3 rounded-xl border border-cream-200">
              {product.ingredientsSummary}
            </p>
          </div>

          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-forest block mb-1">
              Full Certified Botanical Disclosures (INCI):
            </span>
            <div className="space-y-1 font-mono text-[11px] text-earth-600">
              {product.ingredientsFull.map((ing, i) => (
                <div key={i}>• {ing}</div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'usage',
      title: 'How To Use (The 3-Step Daily Ritual)',
      content: (
        <div className="space-y-3 pt-2">
          <div className="space-y-2 text-xs font-sans text-earth-800">
            <p><strong className="text-forest">Step 01 Dispense:</strong> {product.usage.step1}</p>
            <p><strong className="text-forest">Step 02 Massage:</strong> {product.usage.step2}</p>
            <p><strong className="text-forest">Step 03 Nourish:</strong> {product.usage.step3}</p>
            {product.usage.proTip && (
              <p className="p-3 bg-cream-100 rounded-xl border border-cream-200 text-earth-700 italic">
                <strong className="text-forest not-italic">Pro Formulation Tip:</strong> {product.usage.proTip}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 'faqs',
      title: 'Frequently Asked Questions',
      content: (
        <div className="space-y-3 pt-2">
          {product.faqs.map((faq, idx) => (
            <div key={idx} className="space-y-1">
              <h5 className="font-serif text-sm font-bold text-forest">{faq.question}</h5>
              <p className="font-sans text-xs text-earth-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs font-sans text-earth-500">
          <Link href="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-forest">Shop</Link>
          <span>/</span>
          <span className="text-forest font-semibold truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Dynamic Image Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Purchase Configuration */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="sage">{product.category} RITUAL</Badge>
                <Rating rating={product.rating} count={product.reviewCount} size="md" />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight">
                {product.name}
              </h1>

              <p className="font-sans text-sm text-earth-600 leading-relaxed">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-sans text-3xl font-bold text-forest">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-lg text-earth-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {quantity > 1 && (
                  <span className="font-sans text-xs text-earth-500">
                    ({formatPrice(currentPrice)} each)
                  </span>
                )}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-2 border-t border-cream-200">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-bold uppercase tracking-wider text-earth-700">
                  Select Ritual Volume:
                </span>
                <span className="font-bold text-forest">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`p-3 rounded-2xl border text-center font-sans transition-all ${
                      selectedSize === s.size
                        ? 'border-forest bg-forest text-ivory shadow-sm'
                        : 'border-cream-300 bg-ivory text-earth-800 hover:border-forest/50'
                    }`}
                  >
                    <span className="block text-xs font-bold">{s.size}</span>
                    <span className="block text-[11px] opacity-80 mt-0.5">{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Dual CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
                {/* Qty */}
                <div className="flex items-center border border-cream-300 rounded-full bg-cream-50 p-1 flex-shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-earth-700 hover:text-forest rounded-full hover:bg-cream-200 font-bold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 sm:w-10 text-center font-sans text-xs sm:text-sm font-bold text-forest">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-earth-700 hover:text-forest rounded-full hover:bg-cream-200 font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3.5 sm:py-4 px-4 sm:px-6 rounded-full bg-forest text-ivory font-sans text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-forest-700 active:scale-98 transition-all shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdding ? 'Added to Bag' : 'Add to Ritual Bag'}</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={handleWishlist}
                  className={`p-3.5 sm:p-4 rounded-full border transition-all flex-shrink-0 ${
                    isFavorited
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-cream-300 bg-ivory text-earth-600 hover:text-forest hover:border-forest'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? 'fill-red-600' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gold text-forest font-sans text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-sm group"
              >
                <Zap className="w-4 h-4 fill-forest" />
                <span>Instant Checkout • {formatPrice(currentPrice * quantity)}</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-cream-50 border border-cream-200 text-xs font-sans text-earth-700">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sage flex-shrink-0" />
                <span>Free shipping on orders $50+</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sage flex-shrink-0" />
                <span>30-Day Ritual Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-sage flex-shrink-0" />
                <span>100% Certified Organic</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-sage flex-shrink-0" />
                <span>Zero Mineral Oil / Silicones</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="pt-2">
              <Accordion items={accordionItems} defaultOpenId="benefits" />
            </div>

          </div>

        </div>

        {/* Customer Reviews Section */}
        <section className="mt-20 pt-16 border-t border-cream-200 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                Client Reviews ({product.reviewCount})
              </h3>
              <p className="font-sans text-xs text-earth-600 mt-1">
                Verified feedback from real ritualists
              </p>
            </div>
            <Rating rating={product.rating} count={product.reviewCount} size="lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.slice(0, 4).map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-cream-50 border border-cream-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Rating rating={rev.rating} showText={false} />
                  <span className="font-sans text-xs text-earth-400">{rev.date}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest">&ldquo;{rev.headline}&rdquo;</h4>
                <p className="font-sans text-xs text-earth-700 leading-relaxed">{rev.content}</p>
                <div className="pt-2 border-t border-cream-200 flex items-center justify-between text-[11px] font-sans text-earth-500">
                  <span className="font-bold text-forest">{rev.author} ({rev.location})</span>
                  <span>{rev.hairType}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-20 pt-16 border-t border-cream-200 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              Complete Your Hair Care Ritual
            </h3>
            <Link href="/shop" className="font-sans text-xs font-bold uppercase tracking-wider text-forest hover:text-sage flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
