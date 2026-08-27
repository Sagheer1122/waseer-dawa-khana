'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronRight, Leaf, Heart, User, ShoppingBag, PhoneCall, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = useCartStore((s) => s.getTotalItems());
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const links = [
    { name: 'Shop All Products', href: '/shop', highlight: true },
    { name: 'Hair Growth Elixir', href: '/product/organic-botanical-hair-growth-oil' },
    { name: 'Our Story & Mission', href: '/about' },
    { name: 'Botanical Ingredients', href: '/ingredients' },
    { name: 'Hair & Scalp Guide', href: '/hair-guide' },
    { name: 'The Hair Journal', href: '/journal' },
    { name: 'Contact & Studio', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-ivory z-50 lg:hidden flex flex-col shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="p-5 border-b border-cream-200 flex items-center justify-between bg-cream-50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-forest flex items-center justify-center text-ivory">
                  <Leaf className="w-3.5 h-3.5 text-cream-100" />
                </div>
                <span className="font-serif text-lg font-bold tracking-widest text-forest">
                  AURA BOTANICA
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-1.5 text-earth-500 hover:text-forest rounded-full hover:bg-cream-200 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Strip */}
            <div className="grid grid-cols-3 divide-x divide-cream-200 border-b border-cream-200 bg-ivory text-center py-3 text-xs font-sans">
              <Link href="/account" className="flex flex-col items-center gap-1 text-earth-700 hover:text-forest">
                <User className="w-4 h-4 text-forest" />
                <span>Account</span>
              </Link>
              <Link href="/wishlist" className="flex flex-col items-center gap-1 text-earth-700 hover:text-forest">
                <Heart className="w-4 h-4 text-forest" />
                <span>Saved ({wishlistCount})</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center gap-1 text-earth-700 hover:text-forest">
                <ShoppingBag className="w-4 h-4 text-forest" />
                <span>Bag ({cartCount})</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-4 px-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between p-3.5 rounded-lg text-sm font-sans font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-cream-200/70 text-forest font-semibold'
                      : link.highlight
                      ? 'bg-forest/5 text-forest font-semibold hover:bg-forest/10'
                      : 'text-earth-700 hover:bg-cream-100 hover:text-forest'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.highlight && <Sparkles className="w-4 h-4 text-gold" />}
                    {link.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-earth-400" />
                </Link>
              ))}
            </div>

            {/* Bottom Promo Note */}
            <div className="p-5 border-t border-cream-200 bg-cream-50">
              <div className="p-4 rounded-xl bg-forest text-ivory text-center space-y-2">
                <p className="font-serif text-base font-semibold text-cream-100">
                  Complimentary Global Shipping
                </p>
                <p className="font-sans text-xs text-cream-300">
                  On all botanical orders over $50. Clean, carbon-neutral delivery.
                </p>
                <Link
                  href="/shop"
                  className="inline-block mt-1 text-xs font-sans font-bold uppercase tracking-widest text-gold hover:underline"
                >
                  Explore Collection &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
