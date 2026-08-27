'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Rating } from '@/components/ui/Rating';
import { luxuryEase } from '@/lib/motion';

export const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const textVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay: prefersReducedMotion ? 0 : custom * 0.12,
        ease: luxuryEase,
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: prefersReducedMotion ? 0 : 0.25,
        ease: luxuryEase,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-ivory py-10 sm:py-14 lg:py-18 border-b border-cream-200">
      {/* Subtle organic background aura */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-50 rounded-full blur-3xl opacity-50 pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clean Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Eyebrow badge */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200/80 border border-cream-300"
            >
              <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-forest">
                100% ORGANIC BOTANICAL HAIR OIL
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-forest leading-[1.08]"
            >
              Healthy Hair <br />
              <span className="italic font-normal font-serif text-sage-600">Starts With Nature.</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="font-sans text-base sm:text-lg text-earth-600 max-w-lg leading-relaxed font-normal"
            >
              Pure single-origin botanical oils crafted to nourish your scalp microbiome, strengthen roots, and restore natural shine. One honest formula for every hair texture.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-forest text-ivory font-sans text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-forest-700 active:scale-[0.98] transition-all shadow-md group"
              >
                <span>Shop All Rituals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/ingredients"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-forest/30 text-forest font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-cream-100 hover:border-forest active:scale-[0.98] transition-all"
              >
                <span>Explore Botanicals</span>
              </Link>
            </motion.div>

            {/* Trust Strip */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="pt-6 border-t border-cream-300 flex flex-wrap items-center gap-6 sm:gap-8 text-earth-700"
            >
              <div className="flex items-center gap-2">
                <Rating rating={4.9} count={2800} size="md" />
              </div>

              <div className="h-4 w-px bg-cream-300 hidden sm:block" />

              <div className="flex items-center gap-4 text-xs font-sans font-semibold tracking-wider uppercase text-forest">
                <span>✦ Cold-Pressed</span>
                <span>✦ Zero Silicones</span>
                <span>✦ Unisex</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Clean Amber Bottle Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-cream-300 bg-cream-100 group">
              <Image
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85"
                alt="Aura Botanica Amber Glass Hair Oil Bottle"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
