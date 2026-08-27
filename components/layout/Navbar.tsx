'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, Leaf } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { openSearch, toggleMobileMenu } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'Our Story', href: '/about' },
    { name: 'Ingredients', href: '/ingredients' },
    { name: 'Hair Guide', href: '/hair-guide' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '/contact' },
  ];

  const isHomePage = pathname === '/';

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-cream-200 py-3 sm:py-3.5'
          : 'bg-ivory/90 backdrop-blur-sm border-b border-cream-200 py-5 sm:py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-1.5 text-forest hover:text-sage transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-forest flex items-center justify-center text-ivory group-hover:bg-sage transition-colors shadow-sm flex-shrink-0">
              <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cream-100" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-wider sm:tracking-widest text-forest group-hover:text-sage transition-colors leading-none">
                AURA BOTANICA
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-earth-500 font-semibold mt-0.5 hidden xs:block">
                Pure Organic Hair Rituals
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                className={cn(
                  'font-sans text-[13px] font-medium tracking-wider uppercase transition-colors relative py-1',
                  isActive
                    ? 'text-forest font-semibold'
                    : 'text-earth-600 hover:text-forest'
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Account, Wishlist, Cart) */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={openSearch}
            className="p-2 text-earth-700 hover:text-forest hover:bg-cream-100 rounded-full transition-colors"
            aria-label="Search products and journal"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account */}
          <Link
            href="/account"
            prefetch={true}
            className="hidden sm:inline-flex p-2 text-earth-700 hover:text-forest hover:bg-cream-100 rounded-full transition-colors"
            aria-label="Account Dashboard"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            prefetch={true}
            className="p-2 text-earth-700 hover:text-forest hover:bg-cream-100 rounded-full transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {isMounted && wishlistItems.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-forest text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCart}
            className="flex items-center gap-1.5 sm:gap-2 bg-forest text-ivory hover:bg-forest-700 active:scale-95 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full transition-all duration-200 shadow-sm group ml-1 whitespace-nowrap flex-shrink-0"
            aria-label={`Open shopping cart with ${totalCartItems} items`}
          >
            <ShoppingBag className="w-4 h-4 text-cream-200 group-hover:scale-105 transition-transform flex-shrink-0" />
            <span className="font-sans text-xs font-semibold tracking-wider flex items-center gap-1">
              <span>BAG</span>
              {isMounted && <span className="text-gold font-bold">({totalCartItems})</span>}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
