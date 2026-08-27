'use client';

import React, { useState } from 'react';
import { X, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-forest text-ivory text-xs font-sans border-b border-forest-700 relative z-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-sage-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase text-[10px] font-semibold">100% Organic Certified</span>
          </div>

          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold hidden sm:inline-block" />
            <p className="font-normal tracking-wide text-cream-100">
              <span className="font-semibold text-ivory">FREE DELIVERY ACROSS PAKISTAN</span> on orders over Rs. 3,000 • Cash on Delivery (COD), JazzCash & EasyPaisa
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-[10px] tracking-wider text-sage-300 font-medium">UNISEX FORMULATION</span>
            <button
              onClick={() => setIsVisible(false)}
              className="text-cream-300 hover:text-ivory p-1 transition-colors"
              aria-label="Close announcement bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
