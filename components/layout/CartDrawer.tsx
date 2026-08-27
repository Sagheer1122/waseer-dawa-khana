'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, calculateFreeShippingProgress } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotal,
    promoCode,
    discountAmount,
    applyPromoCode,
    removePromoCode
  } = useCartStore();

  const addToast = useUIStore((s) => s.addToast);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = getSubtotal();
  const total = getTotal();
  const { progress, remaining, unlocked } = calculateFreeShippingProgress(subtotal, 3000);

  // Prevent background scroll
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoError('');
      setPromoInput('');
      addToast({ type: 'success', title: 'Discount Applied', message: res.message });
    } else {
      setPromoError(res.message);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ivory z-50 flex flex-col shadow-2xl overflow-hidden border-l border-cream-300 h-full max-h-[100dvh]"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-cream-200 flex items-center justify-between bg-cream-50 flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-forest" />
                <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-forest">
                  Your Ritual Bag
                </h2>
                <span className="font-sans text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full font-semibold">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-earth-500 hover:text-forest rounded-full hover:bg-cream-200 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="px-4 py-2.5 bg-cream-100 border-b border-cream-200 space-y-1 flex-shrink-0">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="font-medium text-earth-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  {unlocked ? (
                    <span className="text-forest font-semibold text-[11px] sm:text-xs">
                      Free Nationwide Shipping Unlocked!
                    </span>
                  ) : (
                    <span className="text-[11px] sm:text-xs">
                      Add <strong className="text-forest">{formatPrice(remaining)}</strong> more for FREE delivery
                    </span>
                  )}
                </span>
                <span className="font-bold text-forest text-[11px]">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-cream-300 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full transition-all ${
                    unlocked ? 'bg-forest' : 'bg-sage'
                  }`}
                />
              </div>
            </div>

            {/* Cart Items List or Empty State */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3 min-h-0">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center text-earth-400">
                    <ShoppingBag className="w-8 h-8 text-earth-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-forest">
                      Your ritual is waiting.
                    </h3>
                    <p className="font-sans text-xs text-earth-600 max-w-xs leading-relaxed">
                      Discover our cold-pressed organic hair elixirs and begin your path to nourished, healthier-looking hair.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="px-6 py-3 rounded-full bg-forest text-ivory font-sans text-xs font-semibold tracking-widest uppercase hover:bg-forest-700 transition-colors shadow-sm"
                  >
                    Shop Hair Oils
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-xl border border-cream-200 bg-cream-50/70 hover:border-cream-300 transition-all shadow-2xs"
                  >
                    {/* Item Image */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0 border border-cream-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1.5">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="font-serif text-xs sm:text-sm font-bold text-forest hover:text-sage line-clamp-1 leading-snug"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-earth-400 hover:text-red-600 p-0.5 transition-colors flex-shrink-0"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-sans text-[11px] text-earth-500 font-medium mt-0.5">
                          Size: <span className="text-forest font-semibold">{item.size}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1.5">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-cream-300 rounded-full bg-ivory overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 sm:p-1.5 text-earth-600 hover:text-forest hover:bg-cream-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-sans text-xs font-bold text-forest px-2 min-w-[18px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 sm:p-1.5 text-earth-600 hover:text-forest hover:bg-cream-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-sans text-xs sm:text-sm font-bold text-forest">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer Summary */}
            {items.length > 0 && (
              <div className="p-3.5 sm:p-4 border-t border-cream-200 bg-cream-50 space-y-2.5 flex-shrink-0">
                {/* Promo Code Box */}
                {!promoCode ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-1.5">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo (try BOTANICA15)"
                        className="w-full px-2.5 py-1.5 text-[11px] sm:text-xs font-sans rounded-lg border border-cream-300 bg-ivory focus:outline-none focus:border-forest uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-cream-200 hover:bg-forest hover:text-ivory text-forest text-xs font-sans font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-forest/10 border border-forest/20 text-xs font-sans">
                    <span className="flex items-center gap-1.5 text-forest font-semibold text-[11px]">
                      <Tag className="w-3.5 h-3.5" />
                      {promoCode} ({Math.round(discountAmount * 100)}% off)
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-earth-500 hover:text-red-600 font-medium underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[10px] font-sans text-red-600">{promoError}</p>
                )}

                {/* Calculations */}
                <div className="space-y-1 font-sans text-xs text-earth-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-forest">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sage-700">
                      <span>Botanical Discount ({Math.round(discountAmount * 100)}%)</span>
                      <span>-{formatPrice(subtotal * discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{unlocked ? <span className="text-forest font-bold">FREE</span> : formatPrice(250)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-forest pt-1.5 border-t border-cream-200">
                    <span>Estimated Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout CTAs */}
                <div className="space-y-1.5 pt-0.5">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-wider hover:bg-forest-700 transition-all shadow-md group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="w-full block text-center py-2 rounded-full border border-cream-300 text-forest font-sans text-xs font-semibold hover:bg-cream-100 transition-colors"
                  >
                    View Full Cart Page
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] font-sans text-earth-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                  <span>Guaranteed Safe & Secure Botanical Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
