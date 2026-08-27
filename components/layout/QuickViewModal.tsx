'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, Heart, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToast } = useUIStore();
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0]?.size || '50ml');
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentSizeObj = quickViewProduct.sizes.find((s) => s.size === selectedSize) || quickViewProduct.sizes[0];
  const currentPrice = currentSizeObj ? currentSizeObj.price : quickViewProduct.basePrice;
  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addItem(quickViewProduct, selectedSize, quantity);
    addToast({
      type: 'success',
      title: 'Added to Ritual Bag',
      message: `${quickViewProduct.name} (${selectedSize}) x ${quantity}`,
    });
    closeQuickView();
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(quickViewProduct);
    addToast({
      type: 'info',
      title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      message: quickViewProduct.name,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-forest-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-ivory rounded-3xl shadow-2xl border border-cream-300 overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-ivory/80 text-earth-700 hover:bg-forest hover:text-ivory transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Presentation */}
          <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-cream-100">
            <Image
              src={quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              fill
              className="object-cover"
            />
            {quickViewProduct.tag && (
              <div className="absolute top-4 left-4">
                <Badge variant="forest">{quickViewProduct.tag}</Badge>
              </div>
            )}
          </div>

          {/* Right Column: Product Configuration & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs uppercase tracking-widest text-sage font-semibold">
                  {quickViewProduct.category} Ritual
                </span>
                <Rating rating={quickViewProduct.rating} count={quickViewProduct.reviewCount} />
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-bold text-forest leading-tight">
                {quickViewProduct.name}
              </h2>

              <p className="font-sans text-sm text-earth-600 leading-relaxed">
                {quickViewProduct.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-sans text-2xl font-bold text-forest">
                  {formatPrice(currentPrice)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="font-sans text-base text-earth-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-earth-700">
                Select Size: <span className="text-forest font-bold">{selectedSize}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {quickViewProduct.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-sans font-medium transition-all text-center ${
                      selectedSize === s.size
                        ? 'border-forest bg-forest text-ivory shadow-sm'
                        : 'border-cream-300 bg-ivory text-earth-800 hover:border-forest/50'
                    }`}
                  >
                    <span className="block font-bold">{s.size}</span>
                    <span className="block text-[11px] opacity-80">{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                {/* Qty */}
                <div className="flex items-center border border-cream-300 rounded-xl bg-cream-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-earth-700 hover:text-forest rounded-lg hover:bg-cream-200"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-sans text-sm font-bold text-forest">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-earth-700 hover:text-forest rounded-lg hover:bg-cream-200"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Ritual Bag • {formatPrice(currentPrice * quantity)}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-xl border transition-colors ${
                    isFavorited
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-cream-300 bg-ivory text-earth-600 hover:text-forest hover:border-forest'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-600' : ''}`} />
                </button>
              </div>

              {/* View Full Product Details Link */}
              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="flex items-center justify-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-earth-600 hover:text-forest transition-colors py-1 group"
              >
                <span>View Full Botanical Formulation & Ritual Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
