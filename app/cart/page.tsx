'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, calculateFreeShippingProgress } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotal,
    promoCode,
    discountAmount,
    applyPromoCode,
    removePromoCode,
    clearCart,
  } = useCartStore();

  const addToast = useUIStore((s) => s.addToast);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = getSubtotal();
  const total = getTotal();
  const { progress, remaining, unlocked } = calculateFreeShippingProgress(subtotal, 50);

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

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-5 bg-ivory">
        <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center text-earth-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Your ritual is waiting.
          </h1>
          <p className="font-sans text-xs sm:text-sm text-earth-600 max-w-sm leading-relaxed">
            Your shopping bag is currently empty. Explore our organic cold-pressed botanical hair oils and start your hair care journey.
          </p>
        </div>
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-md"
        >
          Shop Hair Oils
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Badge variant="sage">YOUR SELECTION</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest mt-1">
            Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
          </h1>
        </div>

        {/* Free shipping banner */}
        <div className="mb-8 p-4 rounded-2xl bg-cream-100 border border-cream-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="font-medium text-earth-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold" />
              {unlocked ? (
                <strong className="text-forest">You&apos;ve unlocked FREE Carbon-Neutral Shipping!</strong>
              ) : (
                <span>
                  Add <strong className="text-forest">{formatPrice(remaining)}</strong> more to unlock FREE shipping
                </span>
              )}
            </span>
            <span className="font-bold text-forest">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-cream-300 rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className={`h-full rounded-full transition-all duration-500 ${
                unlocked ? 'bg-forest' : 'bg-sage'
              }`}
            />
          </div>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Items Table */}
          <div className="lg:col-span-8 space-y-4">
            <div className="divide-y divide-cream-200 border border-cream-200 rounded-2xl bg-ivory overflow-hidden shadow-xs">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-serif text-base sm:text-lg font-bold text-forest hover:text-sage line-clamp-1 leading-snug"
                      >
                        {item.name}
                      </Link>
                      <p className="font-sans text-xs text-earth-500 mt-0.5">
                        Volume: <strong className="text-forest">{item.size}</strong>
                      </p>
                      <p className="font-sans text-xs text-earth-700 font-medium sm:hidden mt-1">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Price Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-200">
                    {/* Qty */}
                    <div className="flex items-center border border-cream-300 rounded-full bg-cream-50 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-earth-700 hover:text-forest rounded-full hover:bg-cream-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-sans text-xs font-bold text-forest">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-earth-700 hover:text-forest rounded-full hover:bg-cream-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total item price */}
                    <span className="font-sans text-base font-bold text-forest min-w-[70px] text-right">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-earth-400 hover:text-red-600 transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href="/shop"
                className="text-xs font-sans font-bold uppercase tracking-wider text-forest hover:text-sage transition-colors underline"
              >
                &larr; Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-xs font-sans text-earth-500 hover:text-red-600 underline"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 bg-cream-50 rounded-3xl p-6 sm:p-8 border border-cream-300 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-forest pb-3 border-b border-cream-200">
              Order Summary
            </h3>

            {/* Promo Code Form */}
            {!promoCode ? (
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-earth-700">
                  Promo Code:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. BOTANICA15"
                    className="flex-1 px-3 py-2 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-forest text-ivory text-xs font-sans font-bold uppercase tracking-wider rounded-xl hover:bg-forest-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] font-sans text-red-600">{promoError}</p>
                )}
              </form>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl bg-forest/10 border border-forest/20 text-xs font-sans">
                <span className="flex items-center gap-1.5 text-forest font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  {promoCode} ({Math.round(discountAmount * 100)}% Discount)
                </span>
                <button
                  onClick={removePromoCode}
                  className="text-earth-500 hover:text-red-600 underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Breakdown */}
            <div className="space-y-2.5 font-sans text-xs text-earth-700 border-t border-cream-200 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-forest">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-sage-700">
                  <span>Promo Discount ({Math.round(discountAmount * 100)}%)</span>
                  <span>-{formatPrice(subtotal * discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{unlocked ? <strong className="text-forest">FREE</strong> : formatPrice(4.95)}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-forest pt-3 border-t border-cream-200">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-md group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] font-sans text-earth-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-sage" />
              <span>30-Day Pure Satisfaction Money-Back Guarantee</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
