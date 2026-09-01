'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  const handleAddToCart = (item: any) => {
    const size = item.sizes?.[0]?.size || '100ml';
    addItem(item, size, 1);
    addToast({
      type: 'success',
      title: 'Moved to Ritual Bag',
      message: `${item.name} (${size})`,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4 bg-ivory">
        <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center text-earth-400">
          <Heart className="w-10 h-10 text-earth-500" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Your Wishlist is Waiting.
          </h1>
          <p className="font-sans text-xs sm:text-sm text-earth-600 max-w-sm leading-relaxed">
            Save products you want to make part of your routine. Tap the heart icon on any formulation to curate your collection.
          </p>
        </div>
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-md"
        >
          Explore Botanical Oils
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 border-b border-cream-200 pb-6">
          <div className="space-y-1">
            <Badge variant="forest">SAVED RITUALS</Badge>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
              Your Wishlist ({items.length})
            </h1>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs font-sans text-earth-500 hover:text-red-600 underline"
          >
            Clear Entire Wishlist
          </button>
        </div>

        {/* Grid of Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-cream-50 rounded-2xl border border-cream-200 hover:border-sage overflow-hidden flex flex-col justify-between p-4 space-y-4 shadow-sm transition-all"
            >
              <div className="space-y-3">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-cream-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-ivory/80 text-earth-600 hover:text-red-600 shadow-sm"
                    aria-label="Remove item from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-sage">
                    {item.category} Ritual
                  </span>
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-serif text-base font-bold text-forest hover:text-sage line-clamp-1 block"
                  >
                    {item.name}
                  </Link>
                  <p className="font-sans text-xs text-earth-600 line-clamp-1 mt-0.5">{item.subtitle}</p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-sans text-base font-bold text-forest">{formatPrice(item.price)}</span>
                  <Rating rating={item.rating} showText={false} size="sm" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-cream-200">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-wider hover:bg-forest-700 transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
                <Link
                  href={`/product/${item.slug}`}
                  className="block text-center text-[11px] font-sans font-semibold uppercase tracking-wider text-earth-600 hover:text-forest py-1"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
