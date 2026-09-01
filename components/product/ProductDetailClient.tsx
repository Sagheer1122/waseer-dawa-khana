'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types';
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
  Heart,
  ShieldCheck,
  Leaf,
  Truck,
  Check,
  ArrowRight,
  Droplet,
  MessageCircle,
} from 'lucide-react';

interface ProductDetailClientProps {
  initialProduct: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  initialProduct,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const [product] = useState<Product>(initialProduct);

  const initialPopularSize =
    initialProduct.sizes?.find((s) => s.isPopular)?.size ||
    initialProduct.sizes?.[0]?.size ||
    '100ml';

  const [selectedSize, setSelectedSize] = useState<string>(initialPopularSize);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const addToast = useUIStore((s) => s.addToast);

  const productSizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : [
          { size: '100ml', price: product.basePrice || (product as any).price || 2450, isPopular: true },
          { size: '200ml', price: Math.round((product.basePrice || (product as any).price || 2450) * 1.8), isPopular: false },
          { size: '300ml', price: Math.round((product.basePrice || (product as any).price || 2450) * 2.5), isPopular: false },
        ];

  const currentSizeObj = productSizes.find((s) => s.size === selectedSize) || productSizes[0];
  const currentPrice = currentSizeObj
    ? currentSizeObj.price
    : product.finalPrice || product.basePrice || (product as any).price || 2450;
  const isFavorited = isInWishlist(product.id);

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

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    addToast({
      type: 'info',
      title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      message: product.name,
    });
  };

  const benefitsList =
    product.benefits && product.benefits.length > 0
      ? product.benefits
      : [
          'Promotes dense, healthy hair growth from the roots',
          'Deeply nourishes scalp and restores moisture balance',
          'Strengthens strand cuticles to reduce breakage and split ends',
          '100% natural, chemical-free cold-pressed herbal formula',
        ];

  const ingredientsSummaryText =
    product.ingredientsSummary ||
    'Pure botanical cold-pressed oils infused with organic Amla, Sikakai, Kalonji, and nourishing herbal extracts.';

  const fullIngredientsList =
    product.ingredientsFull && product.ingredientsFull.length > 0
      ? product.ingredientsFull
      : [
          'Amla (Phyllanthus Emblica) Extract',
          'Pure Cold-Pressed Black Seed (Kalonji) Oil',
          'Moroccan Argan Kernel Oil',
          'Golden Jojoba Seed Oil',
          'Wild Rosemary Leaf Extract',
          'Virgin Coconut Oil',
        ];

  const usageObj = product.usage || {
    step1: 'Dispense 4-6 drops of warm herbal hair oil into palms.',
    step2: 'Gently massage into scalp in slow circular motions for 5 minutes.',
    step3: 'Leave in for at least 45 minutes or overnight before washing.',
    proTip: 'For enhanced penetration, warm the oil slightly or wrap hair with a warm towel.',
  };

  const faqsList =
    product.faqs && product.faqs.length > 0
      ? product.faqs
      : [
          {
            question: 'How often should I use this herbal hair oil?',
            answer: 'For optimal results, apply 2 to 3 times per week consistently.',
          },
          {
            question: 'Is this suitable for all hair types?',
            answer:
              'Yes, our 100% cold-pressed herbal formula is safe and effective for straight, wavy, curly, and coily hair textures.',
          },
          {
            question: 'Does this contain any chemicals or steroids?',
            answer:
              'Zero chemicals, zero steroids, zero mineral oil fillers. 100% pure herbal formulation by WASEER Dawa Khana.',
          },
        ];

  // Accordion Items
  const accordionItems: AccordionItem[] = [
    {
      id: 'benefits',
      title: 'Botanical Benefits & Scalp Impact',
      content: (
        <div className="space-y-3 pt-2">
          <p className="font-sans text-sm text-earth-700">{product.description}</p>
          <ul className="space-y-2 font-sans text-xs text-earth-800">
            {benefitsList.map((b, idx) => (
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
              {ingredientsSummaryText}
            </p>
          </div>

          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-forest block mb-1">
              Full Certified Botanical Disclosures (INCI):
            </span>
            <div className="space-y-1 font-mono text-[11px] text-earth-600">
              {fullIngredientsList.map((ing, i) => (
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
            <p>
              <strong className="text-forest">Step 01 Dispense:</strong> {usageObj.step1}
            </p>
            <p>
              <strong className="text-forest">Step 02 Massage:</strong> {usageObj.step2}
            </p>
            <p>
              <strong className="text-forest">Step 03 Nourish:</strong> {usageObj.step3}
            </p>
            {usageObj.proTip && (
              <p className="p-3 bg-cream-100 rounded-xl border border-cream-200 text-earth-700 italic">
                <strong className="text-forest not-italic">Pro Formulation Tip:</strong> {usageObj.proTip}
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
          {faqsList.map((faq, idx) => (
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 min-w-0">
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-sans text-earth-500 min-w-0">
          <Link href="/" className="hover:text-forest flex-shrink-0">
            Home
          </Link>
          <span className="flex-shrink-0">/</span>
          <Link href="/shop" className="hover:text-forest flex-shrink-0">
            Shop
          </Link>
          <span className="flex-shrink-0">/</span>
          <span className="text-forest font-semibold truncate max-w-[140px] sm:max-w-xs">
            {product.name}
          </span>
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
              <div className="flex flex-wrap items-baseline gap-2 pt-2 min-w-0">
                <span className="font-sans text-2xl sm:text-3xl font-bold text-forest whitespace-nowrap">
                  {formatPrice(currentPrice * quantity)}
                </span>
                {product.originalPrice && product.originalPrice > currentPrice && (
                  <span className="font-sans text-base sm:text-lg text-earth-400 line-through whitespace-nowrap">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {quantity > 1 && (
                  <span className="font-sans text-xs text-earth-500 whitespace-nowrap">
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
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {productSizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`p-2 sm:p-3 rounded-2xl border text-center font-sans transition-all ${
                      selectedSize === s.size
                        ? 'border-forest bg-forest text-ivory shadow-sm'
                        : 'border-cream-300 bg-ivory text-earth-800 hover:border-forest/50'
                    }`}
                  >
                    <span className="block text-xs font-bold">{s.size}</span>
                    <span className="block text-[10px] sm:text-[11px] opacity-80 mt-0.5 whitespace-nowrap">
                      {formatPrice(s.price)}
                    </span>
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
                  disabled={isAdding || !product.inStock}
                  className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3.5 sm:py-4 px-4 sm:px-6 rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-md ${
                    !product.inStock
                      ? 'bg-cream-400 text-earth-700 cursor-not-allowed'
                      : 'bg-forest text-ivory hover:bg-forest-700 active:scale-98'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {!product.inStock
                      ? 'Sold Out'
                      : isAdding
                      ? 'Added to Bag'
                      : 'Add to Ritual Bag'}
                  </span>
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
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? 'fill-red-600' : ''}`}
                  />
                </button>
              </div>

              {/* Direct WhatsApp Order Button */}
              <button
                onClick={() => {
                  const num = '923390010550';
                  const msg = `🌿 *Order via WhatsApp - WASEER Herbal Hair Oil* 🌿\n\nI want to order:\n• ${product.name} (${selectedSize}) x ${quantity}\nTotal: ${formatPrice(currentPrice * quantity)}\n\nPlease dispatch to my address!`;
                  window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-700 hover:bg-emerald-600 text-ivory font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order via WhatsApp • {formatPrice(currentPrice * quantity)}</span>
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
                  <span className="font-bold text-forest">
                    {rev.author} ({rev.location})
                  </span>
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
            <Link
              href="/shop"
              className="font-sans text-xs font-bold uppercase tracking-wider text-forest hover:text-sage flex items-center gap-1"
            >
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
