import React from 'react';
import Link from 'next/link';
import { Leaf, ShieldCheck, Award, HeartHandshake, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest text-ivory border-t border-forest-800">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info Column */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-ivory text-forest flex items-center justify-center font-bold">
                <Leaf className="w-4 h-4 text-forest" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-ivory">
                AURA BOTANICA
              </span>
            </Link>
            <p className="font-sans text-xs text-cream-300 leading-relaxed max-w-sm">
              Cold-pressed organic botanical hair oils designed to restore scalp balance, nourish hair follicles, and celebrate every natural texture. One pure formula. Every hair story.
            </p>
            <div className="pt-2">
              <p className="font-sans text-[11px] uppercase tracking-widest text-sage-300 font-semibold mb-2">
                Certified Botanical Standards
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded bg-forest-700/50 text-[10px] font-mono text-cream-200 border border-forest-600">USDA Organic</span>
                <span className="px-2.5 py-1 rounded bg-forest-700/50 text-[10px] font-mono text-cream-200 border border-forest-600">Vegan Society</span>
                <span className="px-2.5 py-1 rounded bg-forest-700/50 text-[10px] font-mono text-cream-200 border border-forest-600">Carbon Neutral</span>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: SHOP */}
            <div className="space-y-3">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gold">
                Shop Rituals
              </h4>
              <ul className="space-y-2 font-sans text-xs text-cream-300">
                <li><Link href="/shop" className="hover:text-ivory transition-colors">All Botanical Oils</Link></li>
                <li><Link href="/product/organic-botanical-hair-growth-oil" className="hover:text-ivory transition-colors">Growth Serum</Link></li>
                <li><Link href="/product/restorative-argan-jojoba-gloss-elixir" className="hover:text-ivory transition-colors">Argan Gloss Elixir</Link></li>
                <li><Link href="/product/clarifying-rosemary-tea-tree-scalp-detox" className="hover:text-ivory transition-colors">Scalp Detox Ritual</Link></li>
                <li><Link href="/product/the-complete-botanical-hair-ritual-bundle" className="hover:text-ivory transition-colors">Trio Master Bundle</Link></li>
              </ul>
            </div>

            {/* Column 2: LEARN */}
            <div className="space-y-3">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gold">
                Learn & Discover
              </h4>
              <ul className="space-y-2 font-sans text-xs text-cream-300">
                <li><Link href="/ingredients" className="hover:text-ivory transition-colors">Botanical Library</Link></li>
                <li><Link href="/hair-guide" className="hover:text-ivory transition-colors">Hair & Scalp Guide</Link></li>
                <li><Link href="/journal" className="hover:text-ivory transition-colors">The Hair Journal</Link></li>
                <li><Link href="/#quiz" className="hover:text-ivory transition-colors">Hair Type Quiz</Link></li>
                <li><Link href="/#before-after" className="hover:text-ivory transition-colors">Real Results</Link></li>
              </ul>
            </div>

            {/* Column 3: ABOUT */}
            <div className="space-y-3">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gold">
                About Us
              </h4>
              <ul className="space-y-2 font-sans text-xs text-cream-300">
                <li><Link href="/about" className="hover:text-ivory transition-colors">Our Origin Story</Link></li>
                <li><Link href="/about#sustainability" className="hover:text-ivory transition-colors">Cold-Press Method</Link></li>
                <li><Link href="/about#unisex" className="hover:text-ivory transition-colors">Unisex Philosophy</Link></li>
                <li><Link href="/contact" className="hover:text-ivory transition-colors">Botanical Studio</Link></li>
                <li><Link href="/contact#faq" className="hover:text-ivory transition-colors">Client FAQs</Link></li>
              </ul>
            </div>

            {/* Column 4: SUPPORT */}
            <div className="space-y-3">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-gold">
                Client Care
              </h4>
              <ul className="space-y-2 font-sans text-xs text-cream-300">
                <li><Link href="/account" className="hover:text-ivory transition-colors">My Account</Link></li>
                <li><Link href="/wishlist" className="hover:text-ivory transition-colors">Saved Wishlist</Link></li>
                <li><Link href="/cart" className="hover:text-ivory transition-colors">Ritual Bag</Link></li>
                <li><Link href="/checkout" className="hover:text-ivory transition-colors">Checkout</Link></li>
                <li><Link href="/contact" className="hover:text-ivory transition-colors">Help & Inquiries</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-16 pt-8 border-t border-forest-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-cream-300">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-sage-300" />
            <span>United States (USD $) • International Carbon-Neutral Shipping</span>
          </div>
          <p>© {new Date().getFullYear()} AURA BOTANICA INC. All Rights Reserved. Crafted with pure botanical care.</p>
        </div>
      </div>
    </footer>
  );
};
