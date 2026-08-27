'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { ShoppingBag, Eye, Heart, Check, Sparkles, Droplet, ArrowRight } from 'lucide-react';

export const FeaturedProduct: React.FC = () => {
  const featuredProduct = PRODUCTS[0]; // Growth Serum
  const [selectedSize, setSelectedSize] = useState(featuredProduct.sizes[1]?.size || '100ml');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { openQuickView, addToast } = useUIStore();

  const isFavorited = isInWishlist(featuredProduct.id);
  const currentSizeObj = featuredProduct.sizes.find((s) => s.size === selectedSize) || featuredProduct.sizes[1];
  const currentPrice = currentSizeObj ? currentSizeObj.price : featuredProduct.basePrice;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(featuredProduct, selectedSize, quantity);
    addToast({
      type: 'success',
      title: 'Added to Ritual Bag',
      message: `${featuredProduct.name} (${selectedSize}) x ${quantity}`,
    });
    setTimeout(() => setIsAdding(false), 350);
  };

  const handleWishlist = () => {
    const added = toggleWishlist(featuredProduct);
    addToast({
      type: 'info',
      title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      message: featuredProduct.name,
    });
  };

  return (
    <section className="py-10 sm:py-14 bg-ivory border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <Badge variant="sage">FEATURED SIGNATURE BLEND</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            Your Hair&apos;s New Ritual
          </h2>
          <p className="font-sans text-sm sm:text-base text-earth-600">
            One powerful blend. Daily nourishment. Formulated with wild French rosemary, Jamaican black castor, and desert golden jojoba.
          </p>
        </div>

        {/* Featured Showcase Box */}
        <div className="bg-cream-50 rounded-3xl border border-cream-300 p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Product Visuals */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream-100 shadow-md border border-cream-200 group">
              <Image
                src={featuredProduct.images[0]}
                alt={featuredProduct.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="forest">BESTSELLER • 4.9 ★</Badge>
              </div>
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-ivory/90 backdrop-blur-sm text-earth-700 hover:text-red-600 shadow-md transition-all"
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right Column: Configuration & Add to Cart */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <Rating rating={featuredProduct.rating} count={featuredProduct.reviewCount} size="md" />
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-forest leading-tight">
                {featuredProduct.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-earth-600 leading-relaxed">
                {featuredProduct.description}
              </p>
            </div>

            {/* Key Benefits Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-1">
              {featuredProduct.benefits.slice(0, 4).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-sans text-earth-700">
                  <div className="w-4 h-4 rounded-full bg-forest/10 text-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-2 border-t border-cream-200">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-semibold uppercase tracking-wider text-earth-700">
                  Select Size:
                </span>
                <span className="font-bold text-forest">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {featuredProduct.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center font-sans transition-all ${
                      selectedSize === s.size
                        ? 'border-forest bg-forest text-ivory shadow-sm'
                        : 'border-cream-300 bg-ivory text-earth-800 hover:border-forest/50'
                    }`}
                  >
                    <span className="block text-xs font-bold">{s.size}</span>
                    <span className="block text-[10px] sm:text-[11px] opacity-85 mt-0.5 whitespace-nowrap">{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity & Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="font-sans text-2xl sm:text-3xl font-bold text-forest whitespace-nowrap block">
                    {formatPrice(currentPrice * quantity)}
                  </span>
                  {quantity > 1 && (
                    <span className="font-sans text-[11px] text-earth-500 block">
                      ({formatPrice(currentPrice)} each)
                    </span>
                  )}
                </div>

                {/* Qty */}
                <div className="flex items-center border border-cream-300 rounded-full bg-ivory p-0.5 sm:p-1 flex-shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-earth-700 hover:text-forest rounded-full hover:bg-cream-100 font-bold text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-7 sm:w-8 text-center font-sans text-xs font-bold text-forest">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-earth-700 hover:text-forest rounded-full hover:bg-cream-100 font-bold text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-forest text-ivory font-sans text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdding ? 'Added to Bag' : 'Add to Ritual Bag'}</span>
                </button>

                <button
                  onClick={() => openQuickView(featuredProduct)}
                  className="px-6 py-3.5 rounded-full border border-forest/30 text-forest font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-cream-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Quick View</span>
                </button>
              </div>

              <Link
                href={`/product/${featuredProduct.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-sage-700 hover:text-forest transition-colors pt-1"
              >
                <span>View Full Formulation, Routine & Clinical Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
