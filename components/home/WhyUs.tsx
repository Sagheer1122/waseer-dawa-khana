'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { luxuryEase, staggerContainer, staggerItem } from '../../lib/motion';

export const WhyUs: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const cleanStandards = [
    'No harsh chemicals or steroids',
    'No synthetic artificial fragrances',
    'No cheap mineral oil or petroleum fillers',
    '100% Traditional Unani botanical extraction',
    'Cold-pressed single-source herbal bio-actives',
    'Handcrafted by WASEER Dawa Khana, Bait Hazari',
  ];

  return (
    <section className="py-14 sm:py-20 bg-cream-100/70 border-b border-cream-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Large Editorial Photography */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: luxuryEase }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-cream-300 bg-cream-200">
              <Image
                src="/images/waseer-product-bottle.jpg"
                alt="WASEER Herbal Hair Oil by WASEER Dawa Khana Bait Hazari"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-ivory/95 backdrop-blur-md border border-gold/30 shadow-lg">
                <p className="font-serif italic text-sm text-forest">
                  &ldquo;We formulate without filler mineral oils or artificial chemicals. Handcrafted with traditional unani botanical wisdom to stop hair fall and stimulate healthy roots.&rdquo;
                </p>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-forest block mt-2">
                  — By the product of WASEER Dawa Khana, Bait Hazari
                </span>
              </div>
            </div>

            {/* Decorative background shape */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-sage-100/60 -z-10 blur-xl" />
          </motion.div>

          {/* Right Column: Clean Standards */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: luxuryEase }}
              className="space-y-3"
            >
              <Badge variant="forest">HERITAGE &amp; PURITY</Badge>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest leading-tight">
                Pure Botanicals. <br />
                <span className="italic font-normal font-serif text-sage-600">Zero Compromise.</span>
              </h2>
              <p className="font-sans text-base sm:text-lg text-earth-600 leading-relaxed pt-2">
                Rooted in Bait Hazari, WASEER Dawa Khana formulates hair care using centuries of unani herbal wisdom. We never use mineral oil fillers or artificial chemicals that suffocate follicles.
              </p>
            </motion.div>

            {/* Clean Standards List */}
            <motion.div
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-3 pt-2"
            >
              {cleanStandards.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="flex items-center gap-3 text-sm font-sans text-earth-800"
                >
                  <div className="w-5 h-5 rounded-full bg-forest text-ivory flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Check className="w-3 h-3 text-cream-100" />
                  </div>
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-forest text-ivory font-sans text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-forest-700 active:scale-98 transition-all shadow-md group"
              >
                <span>Order WASEER Oil</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
