import React from 'react';
import Link from 'next/link';
import { Leaf, Globe, Truck, CreditCard, ShieldCheck, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest text-ivory border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Brand Info Column */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-ivory text-forest flex items-center justify-center font-bold">
                <Leaf className="w-4 h-4 text-forest" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-ivory">
                AURA BOTANICA
              </span>
            </Link>
            <p className="font-sans text-xs text-cream-300 leading-relaxed max-w-sm font-normal">
              100% organic cold-pressed botanical hair oils crafted to restore scalp balance, nourish follicles, and celebrate every natural texture.
            </p>
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
                <li><Link href="/account" className="hover:text-ivory transition-colors">My Account</Link></li>
                <li><Link href="/wishlist" className="hover:text-ivory transition-colors">Wishlist</Link></li>
                <li><Link href="/cart" className="hover:text-ivory transition-colors">Ritual Bag</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Pakistan Trust & Payment Strip */}
        <div className="mt-8 pt-6 border-t border-forest-700/60 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          <div className="flex items-center gap-2.5 text-cream-200">
            <Truck className="w-4 h-4 text-gold flex-shrink-0" />
            <div>
              <strong className="block text-ivory text-[11px] font-semibold">TCS / Leopards Courier</strong>
              <span className="text-[10px] text-cream-300">2–3 Days Nationwide Delivery</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-cream-200">
            <CreditCard className="w-4 h-4 text-gold flex-shrink-0" />
            <div>
              <strong className="block text-ivory text-[11px] font-semibold">COD & Mobile Wallets</strong>
              <span className="text-[10px] text-cream-300">Cash on Delivery • JazzCash • EasyPaisa</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-cream-200">
            <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
            <div>
              <strong className="block text-ivory text-[11px] font-semibold">100% Pure & Halal Organic</strong>
              <span className="text-[10px] text-cream-300">Cold-Pressed Single Origin</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-cream-200">
            <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
            <div>
              <strong className="block text-ivory text-[11px] font-semibold">Gulberg III, Lahore, PK</strong>
              <span className="text-[10px] text-cream-300">WhatsApp: +92 300 1234567</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-6 pt-4 border-t border-forest-700/40 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-xs text-cream-300">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Leaf className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span>Mindfully Formulated with 100% Single-Press Organic Botanicals</span>
          </div>
          <p>© {new Date().getFullYear()} AURA BOTANICA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
