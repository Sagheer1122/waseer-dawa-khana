'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { PRODUCTS } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';
import { Check, Sparkles, RefreshCw, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export const SubscriptionSection: React.FC = () => {
  const [frequency, setFrequency] = useState('60');
  const [purchaseType, setPurchaseType] = useState<'subscribe' | 'onetime'>('subscribe');

  const featuredProduct = PRODUCTS[0];
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  const oneTimePrice = 29.99;
  const subscribePrice = 25.49; // 15% discount
  const activePrice = purchaseType === 'subscribe' ? subscribePrice : oneTimePrice;

  const handleAddToCart = () => {
    addItem(featuredProduct, '100ml', 1);
    addToast({
      type: 'success',
      title: purchaseType === 'subscribe' ? 'Subscription Added' : 'Added to Bag',
      message: `${featuredProduct.name} (${purchaseType === 'subscribe' ? `Every ${frequency} Days` : 'One-Time'})`,
    });
  };

  const perks = [
    'Save 15% on every single automated delivery',
    'Cancel or pause anytime with 1 click',
    'Complimentary carbon-neutral delivery on all recurring orders',
    'Priority access to limited botanical seasonal harvests',
  ];

  return (
    <section className="py-16 sm:py-24 bg-cream-50 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ivory rounded-3xl border border-cream-300 p-8 sm:p-12 lg:p-16 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-100 shadow-lg border border-cream-200">
              <Image
                src={featuredProduct.images[0]}
                alt="Aura Botanica Subscription Hair Oil"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="gold">SUBSCRIBE & SAVE 15%</Badge>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer & Checkout Button */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <Badge variant="sage">BOTANICAL AUTO-DELIVERY</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
                Never Miss Your Hair Ritual.
              </h2>
              <p className="font-sans text-sm sm:text-base text-earth-600 leading-relaxed">
                Consistent weekly scalp massage is the key to healthy strand density. Save 15% when you subscribe and enjoy fresh cold-pressed botanicals delivered automatically to your door.
              </p>
            </div>

            {/* Purchase Toggle (One-time vs Subscribe) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Subscribe Option */}
              <button
                onClick={() => setPurchaseType('subscribe')}
                className={`p-4 rounded-2xl border text-left transition-all relative ${
                  purchaseType === 'subscribe'
                    ? 'border-forest bg-cream-100 shadow-sm ring-2 ring-forest/20'
                    : 'border-cream-300 bg-ivory text-earth-700 hover:border-forest/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-forest">
                    Subscribe & Save
                  </span>
                  <span className="font-sans text-xs font-bold text-gold bg-forest px-2 py-0.5 rounded-full">
                    SAVE 15%
                  </span>
                </div>
                <p className="font-sans text-lg font-bold text-forest mt-1">
                  {formatPrice(subscribePrice)} <span className="text-xs font-normal text-earth-500">/ bottle</span>
                </p>
              </button>

              {/* One-Time Option */}
              <button
                onClick={() => setPurchaseType('onetime')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  purchaseType === 'onetime'
                    ? 'border-forest bg-cream-100 shadow-sm ring-2 ring-forest/20'
                    : 'border-cream-300 bg-ivory text-earth-700 hover:border-forest/40'
                }`}
              >
                <span className="font-serif text-base font-bold text-forest block">
                  One-Time Purchase
                </span>
                <p className="font-sans text-lg font-bold text-forest mt-1">
                  {formatPrice(oneTimePrice)} <span className="text-xs font-normal text-earth-500">/ bottle</span>
                </p>
              </button>
            </div>

            {/* Frequency Selector if subscribe */}
            {purchaseType === 'subscribe' && (
              <div className="space-y-2 pt-2 animate-fade-in">
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-earth-700">
                  Select Delivery Frequency:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { days: '30', label: 'Every 30 Days (Intensive)' },
                    { days: '60', label: 'Every 60 Days (Recommended)' },
                    { days: '90', label: 'Every 90 Days (Maintenance)' },
                  ].map((f) => (
                    <button
                      key={f.days}
                      onClick={() => setFrequency(f.days)}
                      className={`p-2.5 rounded-xl border text-center font-sans text-xs transition-all ${
                        frequency === f.days
                          ? 'border-forest bg-forest text-ivory font-bold shadow-xs'
                          : 'border-cream-300 bg-ivory text-earth-700 hover:border-forest/50'
                      }`}
                    >
                      <span>{f.days} Days</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Perks list */}
            <div className="space-y-2 pt-2 border-t border-cream-200">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-sans text-earth-700">
                  <Check className="w-3.5 h-3.5 text-sage flex-shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Subscribe Action Button */}
            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-forest text-ivory font-sans text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-md group"
              >
                <span>{purchaseType === 'subscribe' ? `Start Ritual Subscription • ${formatPrice(activePrice)}` : `Add to Bag • ${formatPrice(activePrice)}`}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
