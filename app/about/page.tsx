import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Leaf, ShieldCheck, HeartHandshake, Sparkles, Droplets, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Editorial Hero */}
      <section className="relative py-20 sm:py-28 bg-cream-50 border-b border-cream-200 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="forest">OUR PURPOSE & HERITAGE</Badge>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-forest leading-tight">
            Rooted In Nature. <br />
            <span className="italic font-normal font-serif text-sage-600">Made For You.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-earth-600 max-w-2xl mx-auto leading-relaxed">
            We founded AURA BOTANICA to dismantle artificial cosmetic complexity and return hair care to its most potent, grounding origin: living plant lipids.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-24">
        
        {/* Section 1: Why We Started */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <Badge variant="sage">THE AWAKENING</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              Why We Started
            </h2>
            <p className="font-sans text-sm sm:text-base text-earth-700 leading-relaxed">
              For decades, the hair-care aisle has been dominated by two extremes: cheap synthetic cocktails loaded with non-biodegradable silicones, or hyper-gendered marketing gimmicks that prioritized artificial fragrances over follicular health.
            </p>
            <p className="font-sans text-sm sm:text-base text-earth-700 leading-relaxed">
              We spent three years working directly with botanical agriculturists and trichologists across France, Morocco, and the Sonoran desert to create unadulterated, single-press lipid formulations that genuinely restore hair vitality from root to tip.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-cream-200 border border-cream-300">
            <Image
              src="https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1200&q=85"
              alt="Wild botanical harvest in Provence"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Section 2: Unisex Mission */}
        <div id="unisex" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-5">
            <Badge variant="olive">ONE UNIVERSAL FORMULA</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              The Unisex Philosophy
            </h2>
            <p className="font-sans text-sm sm:text-base text-earth-700 leading-relaxed">
              Human scalp biology is universal. Whether conditioning a coarse beard, reviving curls after bleaching, or stimulating thinning temples after postpartum hormonal shifts, the foundational need of human hair is lipid balance.
            </p>
            <p className="font-sans text-sm sm:text-base text-earth-700 leading-relaxed">
              We never use artificial colors or synthetic perfumes. Our aromas come entirely from raw, steam-distilled French rosemary, Atlas cedarwood, and Italian bergamot.
            </p>
          </div>

          <div className="lg:col-span-6 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-cream-200 border border-cream-300">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85"
              alt="Unisex hair and beard ritual care"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Section 3: Sustainable Cold-Press Extraction */}
        <div id="sustainability" className="bg-cream-50 rounded-3xl p-8 sm:p-14 border border-cream-300 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <Badge variant="forest">EXTRACTION PURITY</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              Cold-Pressed Under 85°F
            </h2>
            <p className="font-sans text-sm text-earth-600">
              Heat and chemical solvents destroy delicate bioactive lipids. We only use single-pass hydraulic cold pressing to retain 100% of nature’s vitamins and polyphenols.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-ivory rounded-2xl border border-cream-200 space-y-2">
              <Droplets className="w-6 h-6 text-forest" />
              <h4 className="font-serif text-lg font-bold text-forest">Zero Solvent Residue</h4>
              <p className="font-sans text-xs text-earth-600">No hexane, petrochemicals, or industrial solvents ever touch our seeds.</p>
            </div>
            <div className="p-6 bg-ivory rounded-2xl border border-cream-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-forest" />
              <h4 className="font-serif text-lg font-bold text-forest">Amber Glass Bottling</h4>
              <p className="font-sans text-xs text-earth-600">Protected in heavy recyclable glass flacons to prevent photo-oxidation.</p>
            </div>
            <div className="p-6 bg-ivory rounded-2xl border border-cream-200 space-y-2">
              <HeartHandshake className="w-6 h-6 text-forest" />
              <h4 className="font-serif text-lg font-bold text-forest">Fair Trade Cooperatives</h4>
              <p className="font-sans text-xs text-earth-600">Direct partnership with indigenous harvester cooperatives worldwide.</p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-wider sm:tracking-widest hover:bg-forest-700 transition-all shadow-md text-center max-w-full"
            >
              <span className="hidden sm:inline">Explore The Botanical Collection</span>
              <span className="sm:hidden">Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
