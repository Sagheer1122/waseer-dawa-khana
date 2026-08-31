'use client';

import React, { useState, useEffect } from 'react';
import { X, PhoneCall, Truck, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const announcements = [
    {
      icon: PhoneCall,
      text: 'CALL / WHATSAPP: 0300-1234567 FOR FREE HAIR CONSULTATION',
      highlight: 'FREE HAIR CONSULTATION',
      href: 'https://wa.me/923001234567?text=Hello%20WASEER%20Dawa%20Khana,%20I%20need%20hair%20consultation',
    },
    {
      icon: Truck,
      text: 'FREE SHIPPING NATIONWIDE ON ORDERS OVER RS. 2,990 • CASH ON DELIVERY (COD)',
      highlight: 'FREE SHIPPING NATIONWIDE',
      href: '/shop',
    },
    {
      icon: ShieldCheck,
      text: '100% PURE HERBAL FORMULA • BY THE PRODUCT OF WASEER DAWA KHANA, BAIT HAZARI',
      highlight: 'WASEER DAWA KHANA, BAIT HAZARI',
      href: '/about',
    },
  ];

  // Auto rotate announcements every 4 seconds like Ostruce
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className="bg-[#10241B] text-ivory text-xs font-sans border-b border-forest-800/80 relative z-50 overflow-hidden w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2 w-full min-w-0">
        
        {/* Left: Consultation hotline on desktop */}
        <div className="hidden lg:flex items-center gap-2 text-gold flex-shrink-0 text-[11px] font-semibold tracking-wider">
          <PhoneCall className="w-3.5 h-3.5 text-gold" />
          <a
            href="tel:+923001234567"
            className="hover:underline text-cream-100"
          >
            Helpline: <span className="text-gold">0300-1234567</span>
          </a>
        </div>

        {/* Center: Rotating Announcement Slider */}
        <div className="flex-1 text-center flex items-center justify-center min-w-0 overflow-hidden px-2 relative h-5">
          <AnimatePresence mode="wait">
            <motion.a
              key={currentIndex}
              href={current.href}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-medium tracking-wide text-cream-100 hover:text-white transition-colors truncate max-w-full"
            >
              <IconComponent className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span className="truncate">
                {current.text}
              </span>
            </motion.a>
          </AnimatePresence>
        </div>

        {/* Right: WhatsApp Link & Close button */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="https://wa.me/923001234567?text=Hello%20WASEER%20Dawa%20Khana"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold tracking-wider"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="text-cream-400 hover:text-ivory p-1 transition-colors flex-shrink-0"
            aria-label="Close announcement bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
