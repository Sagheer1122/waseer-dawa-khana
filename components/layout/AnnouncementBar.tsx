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
        className="bg-forest text-ivory text-xs font-sans border-b border-forest-700 relative z-50 overflow-hidden w-full max-w-[100vw]"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2 w-full min-w-0">
          <div className="hidden lg:flex items-center gap-2 text-sage-300 flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase text-[10px] font-semibold">100% Organic Certified</span>
          </div>

          <div className="flex-1 text-center flex items-center justify-center gap-1.5 min-w-0 overflow-hidden px-1">
            <Sparkles className="w-3 h-3 text-gold hidden sm:inline-block flex-shrink-0" />
            <p className="font-normal tracking-wide text-cream-100 text-[10px] sm:text-xs leading-tight text-center truncate sm:whitespace-normal">
              <span className="font-semibold text-ivory">FREE SHIPPING (PK)</span> on Rs. 3,000+ • COD & JazzCash
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsVisible(false)}
              className="text-cream-300 hover:text-ivory p-1 transition-colors flex-shrink-0"
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
