'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface SlideData {
  id: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  subtext: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  productPrice: string;
  productOriginalPrice: string;
  bgImage: string;
  productImage: string;
  accentBadge: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    badge: 'BY THE PRODUCT OF WASEER DAWA KHANA',
    headline: 'Our Most Trusted',
    headlineAccent: 'Herbal Hair Oil.',
    subtext: 'Fast-absorbing, 100% steroid and chemical-free formula by WASEER Dawa Khana to stop excessive hair fall, awaken weak roots, and promote rapid natural growth.',
    primaryCtaText: 'Shop Our Best-Seller',
    primaryCtaLink: '/shop',
    secondaryCtaText: 'WhatsApp Order',
    secondaryCtaLink: 'https://wa.me/923239009042?text=Hello%20WASEER%20Dawa%20Khana,%20I%20want%20to%20order%20Waseer%20Herbal%20Hair%20Oil',
    productPrice: 'Rs. 2,450',
    productOriginalPrice: 'Rs. 2,950',
    bgImage: '/images/waseer-hero-landscape.jpg',
    productImage: '/images/waseer-product-bottle.jpg',
    accentBadge: '100% Herbal • Cold Pressed',
  },
  {
    id: 'slide-2',
    badge: 'ANCIENT UNANI BOTANICAL REMEDY',
    headline: 'Nourish Your Hair,',
    headlineAccent: 'Naturally.',
    subtext: 'Infused with precious hand-selected botanical roots and cold-pressed seeds. Formulated to restore mirror shine, strengthen split ends, and balance your scalp microbiome.',
    primaryCtaText: 'Shop The Best Haircare',
    primaryCtaLink: '/product/organic-botanical-hair-growth-oil',
    secondaryCtaText: 'Free Hair Consultation',
    secondaryCtaLink: 'https://wa.me/923239009042?text=Hello%20WASEER%20Dawa%20Khana,%20I%20need%20a%20free%20consultation%20about%20my%20hair%20problem',
    productPrice: 'Rs. 2,450',
    productOriginalPrice: 'Rs. 2,950',
    bgImage: '/images/waseer-unisex-haircare.jpg',
    productImage: '/images/waseer-haircare-collection.jpg',
    accentBadge: 'No Mineral Oil • Zero Chemicals',
  },
];

export const Hero: React.FC = () => {
  const [slides, setSlides] = useState<SlideData[]>(SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    import('@/lib/api').then(({ getStoreProducts }) => {
      getStoreProducts().then((prods) => {
        if (prods && prods.length > 0) {
          const waseerProd = prods.find((p) => p.slug === 'organic-botanical-hair-growth-oil') || prods[0];
          if (waseerProd) {
            const finalP = waseerProd.finalPrice || waseerProd.basePrice;
            const origP = waseerProd.originalPrice || waseerProd.price;
            setSlides((prev) => [
              {
                ...prev[0],
                productPrice: `Rs. ${finalP.toLocaleString('en-PK')}`,
                productOriginalPrice: `Rs. ${origP.toLocaleString('en-PK')}`,
                productImage: waseerProd.imageUrl || waseerProd.images[0] || prev[0].productImage,
              },
              prev[1],
            ]);
          }
        }
      });
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0A1611]">
      {/* Background Slides with Cross-Fade */}
      {slides.map((s, idx) => (
        <motion.div
          key={s.id}
          initial={false}
          animate={{
            opacity: idx === currentSlide ? 1 : 0,
            scale: idx === currentSlide ? 1 : 1.04,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute inset-0 z-0 ${
            idx === currentSlide ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <Image
            src={s.bgImage}
            alt={s.headline}
            fill
            priority={idx === 0}
            loading={idx === 0 ? 'eager' : 'lazy'}
            sizes="100vw"
            quality={80}
            className="object-cover object-center"
          />
          {/* Ostruce-inspired deep atmospheric gradient: dark on the left for contrast, open on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1611]/95 via-[#0A1611]/80 to-[#0A1611]/40 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1611]/90 via-transparent to-black/30" />
        </motion.div>
      ))}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Social Proof, Headline, Subtext & Pill Buttons (Ostruce Style) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">


            {/* Main Headline */}
            <motion.div
              key={`head-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1"
            >
              <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gold/90 font-sans">
                {slide.badge}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ivory leading-[1.1]">
                {slide.headline} <br />
                <span className="italic font-normal font-serif text-emerald-300">
                  {slide.headlineAccent}
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              key={`sub-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-sm sm:text-base lg:text-lg text-cream-100/90 max-w-xl leading-relaxed font-normal"
            >
              {slide.subtext}
            </motion.p>

            {/* CTAs: Ostruce-Style Dark Pill Button + WhatsApp Order */}
            <motion.div
              key={`cta-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <Link
                href={slide.primaryCtaLink}
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-[#18352A] hover:bg-[#204436] active:scale-[0.98] border border-emerald-700/60 text-ivory font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl group text-center"
              >
                <span>{slide.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={slide.secondaryCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-emerald-600/90 hover:bg-emerald-500 active:scale-[0.98] text-ivory font-sans text-xs sm:text-sm font-bold tracking-wider transition-all shadow-lg text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{slide.secondaryCtaText}</span>
              </a>
            </motion.div>

            {/* Price & Delivery Mini Note */}
            <div className="pt-2 flex items-center gap-4 text-xs font-sans text-cream-200">
              <span className="flex items-center gap-1.5 font-semibold text-ivory">
                <span className="text-gold text-sm font-bold">{slide.productPrice}</span>
                <span className="line-through text-cream-400/80 text-[11px]">{slide.productOriginalPrice}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-cream-400" />
              <span className="text-[11px] text-cream-300">Free Delivery &amp; Cash on Delivery Available</span>
            </div>

          </div>

          {/* Right Column: Hero Product Showcase with Floating Badge */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              {/* Glowing Aura Ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-gold/20 via-emerald-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Staged Presentation Showcase */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 bg-[#0F2218] p-2 sm:p-2.5 backdrop-blur-md group">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-inner">
                  {SLIDES.map((s, idx) => (
                    <motion.div
                      key={`img-${s.id}`}
                      initial={false}
                      animate={{
                        opacity: idx === currentSlide ? 1 : 0,
                        scale: idx === currentSlide ? 1 : 0.96,
                      }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className={`absolute inset-0 ${
                        idx === currentSlide ? 'pointer-events-auto' : 'pointer-events-none'
                      }`}
                    >
                      <Image
                        src={s.productImage}
                        alt="WASEER Herbal Hair Oil by WASEER Dawa Khana"
                        fill
                        priority={idx === 0}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 420px"
                        quality={85}
                        className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Strip inside Card */}
                <div className="mt-2.5 py-2 px-3 rounded-xl bg-[#081810]/90 text-ivory flex items-center justify-between gap-2 shadow-sm border border-gold/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-cream-100">
                      WASEER Dawa Khana
                    </span>
                  </div>
                  <span className="font-sans text-[10px] text-gold font-bold tracking-widest uppercase">
                    Official Store
                  </span>
                </div>
              </div>

              {/* Floating Top-Left Accent Pill */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`pill-${slide.id}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.35 }}
                  className="absolute -top-3 -left-3 bg-[#0D241A] text-gold border border-gold/60 px-3.5 py-1.5 rounded-full text-[10.5px] font-sans font-bold uppercase tracking-wider shadow-xl flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>{slide.accentBadge}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>


      {/* Slide Indicator Dots at the Bottom */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide
                ? 'w-7 bg-gold shadow-md'
                : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
          />
        ))}
      </div>
    </section>
  );
};
