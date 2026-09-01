'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Check, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { openQuickView, addToast } = useUIStore();

  const isFavorited = isInWishlist(product.id);
  const popularSize = product.sizes?.find((s) => s.isPopular) || product.sizes?.[0];
  const defaultSize = popularSize?.size || '100ml';
  const defaultPrice = product.finalPrice || popularSize?.price || product.basePrice;
  const originalPrice = (product as any).price || product.originalPrice || defaultPrice;
  const hasDiscount = ((product.discount ?? 0) > 0) && originalPrice > defaultPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, defaultSize, 1);
    addToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${product.name} (${defaultSize})`,
    });
    setTimeout(() => setIsAdding(false), 350);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    addToast({
      type: 'info',
      title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      message: product.name,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-ivory rounded-2xl border border-cream-200 hover:border-sage/40 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-100">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-103 ${
              isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} lifestyle`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-103 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
              }`}
            />
          )}
        </Link>

        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-ivory/90 backdrop-blur-sm text-earth-700 hover:text-red-600 hover:bg-ivory shadow-xs transition-colors"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${isFavorited ? 'fill-red-600 text-red-600' : ''}`} />
        </motion.button>

        {/* Quick View Button (Desktop Hover) */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out hidden sm:block">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleQuickView}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-ivory/95 hover:bg-forest hover:text-ivory text-forest font-sans text-xs font-semibold tracking-wider uppercase backdrop-blur-sm shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </motion.button>
        </div>
      </div>

      {/* Product Details (Clean, Spacious, Uncluttered) */}
      <div className="p-3 sm:p-4.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-1">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-sage">
              {product.category}
            </span>
            <span className="flex items-center text-[10px] sm:text-[11px] font-bold text-earth-800">
              <Star className="w-3 h-3 text-gold fill-gold mr-0.5" />
              {product.rating}
            </span>
          </div>

          {/* Product Name (2 Lines for complete readability) */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-sage transition-colors">
            <h3 className="font-serif text-sm sm:text-base font-bold text-forest leading-snug line-clamp-2 min-h-[2.4rem] sm:min-h-[2.6rem]">
              {product.name}
            </h3>
          </Link>

          {/* Short description (Visible on larger screens) */}
          <p className="font-sans text-xs text-earth-600 line-clamp-2 leading-relaxed font-normal hidden sm:block">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing & Add to Bag CTA */}
        <div className="pt-2.5 border-t border-cream-200 flex items-center justify-between gap-1.5">
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-sans text-xs sm:text-base font-bold text-forest leading-none whitespace-nowrap">
                {formatPrice(defaultPrice)}
              </span>
              {hasDiscount && (
                <span className="font-sans text-[10px] sm:text-xs text-earth-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] font-sans text-earth-500 mt-0.5">
              {defaultSize}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center justify-center gap-1 py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-full font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs flex-shrink-0 whitespace-nowrap ${
              isAdding
                ? 'bg-sage text-ivory'
                : 'bg-forest text-ivory hover:bg-forest-700'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden xs:inline sm:inline">Add</span>
                <span className="hidden sm:inline"> to Bag</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
