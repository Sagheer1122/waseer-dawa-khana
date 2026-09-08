import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest text-ivory border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Brand Info Column */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/images/waseer-emblem.png"
                  alt="WASEER Logo"
                  fill
                  sizes="48px"
                  className="object-contain drop-shadow-md"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1 leading-none">
                  <span className="font-serif text-2xl font-bold tracking-widest text-ivory">
                    WASEER
                  </span>
                  <span className="text-[10px] font-sans font-bold text-gold -mt-1">®</span>
                </div>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold font-bold mt-0.5">
                  HERBAL HAIR OIL
                </span>
                <span className="font-sans text-[9.5px] tracking-wider uppercase text-cream-200 font-semibold mt-1">
                  By the product of WASEER Dawa Khana
                </span>
              </div>
            </Link>
            <p className="font-sans text-xs text-cream-300 leading-relaxed max-w-sm font-normal">
              Pure botanical formulation handcrafted by WASEER Dawa Khana. Nature&apos;s care to nourish hair, strengthen roots, promote growth, and restore healthy shine.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-800/90 border border-gold/40 text-[10px] font-sans text-gold uppercase tracking-wider font-semibold">
              <span>By the product of WASEER Dawa Khana</span>
            </div>
          </div>

          {/* Clean 3 Navigation Columns */}
          <div className="md:col-span-6 grid grid-cols-3 gap-6 sm:gap-8">
            {/* Column 1: SHOP */}
            <div className="space-y-2.5">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gold">
                Shop
              </h4>
              <ul className="space-y-1.5 font-sans text-xs text-cream-300">
                <li><Link href="/shop" className="hover:text-ivory transition-colors">All Oils</Link></li>
                <li><Link href="/product/organic-botanical-hair-growth-oil" className="hover:text-ivory transition-colors">Growth Serum</Link></li>
                <li><Link href="/product/clarifying-rosemary-tea-tree-scalp-detox" className="hover:text-ivory transition-colors">Scalp Detox</Link></li>
                <li><Link href="/shop?category=bundles" className="hover:text-ivory transition-colors">Bundles</Link></li>
              </ul>
            </div>

            {/* Column 2: DISCOVER */}
            <div className="space-y-2.5">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gold">
                Discover
              </h4>
              <ul className="space-y-1.5 font-sans text-xs text-cream-300">
                <li><Link href="/about" className="hover:text-ivory transition-colors">Our Story</Link></li>
                <li><Link href="/ingredients" className="hover:text-ivory transition-colors">Ingredients</Link></li>
                <li><Link href="/hair-guide" className="hover:text-ivory transition-colors">Hair Guide</Link></li>
                <li><Link href="/journal" className="hover:text-ivory transition-colors">Journal</Link></li>
              </ul>
            </div>

            {/* Column 3: CLIENT CARE */}
            <div className="space-y-2.5">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gold">
                Help
              </h4>
              <ul className="space-y-1.5 font-sans text-xs text-cream-300">
                <li><Link href="/contact" className="hover:text-ivory transition-colors">Contact</Link></li>
                <li><Link href="/shop" className="hover:text-ivory transition-colors">Shop Catalog</Link></li>
                <li><Link href="/wishlist" className="hover:text-ivory transition-colors">Wishlist</Link></li>
                <li><Link href="/cart" className="hover:text-ivory transition-colors">Ritual Bag</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-6 pt-4 border-t border-forest-700/40 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-xs text-cream-300">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Leaf className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span>By the product of WASEER Dawa Khana • 100% Herbal &amp; Pure</span>
          </div>
          <div>
            <p suppressHydrationWarning>© {new Date().getFullYear()} WASEER HERBAL HAIR OIL. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
