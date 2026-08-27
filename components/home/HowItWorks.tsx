'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Droplet, Hand, Sparkles } from 'lucide-react';
import { staggerContainer, staggerItem, luxuryEase } from '@/lib/motion';

export const HowItWorks: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      num: '01',
      title: 'APPLY',
      tagline: 'Precision Dispensing',
      desc: 'Section dry or damp hair into quadrants. Using the glass dropper, apply 4–6 drops directly along your scalp parting lines.',
      icon: Droplet,
    },
    {
      num: '02',
      title: 'MASSAGE',
      tagline: 'Vascular Stimulation',
      desc: 'Using fingertip pads, massage in gentle circular motions for 3–5 minutes. This wakes dormant follicles and distributes plant lipids.',
      icon: Hand,
    },
    {
      num: '03',
      title: 'NOURISH',
      tagline: 'Lipid Saturation',
      desc: 'Leave for 30–45 minutes, or wrap in a silk bonnet overnight. Wash out easily with your favorite natural shampoo for luminous strands.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-ivory border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: luxuryEase }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5"
        >
          <Badge variant="sage">THE 3-STEP SACRED RITUAL</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            How It Works
          </h2>
          <p className="font-sans text-sm sm:text-base text-earth-600">
            A simple, grounding 5-minute ritual designed to fit seamlessly into any morning or evening self-care routine.
          </p>
        </motion.div>

        {/* 3 Step Sequence Cards with Staggered Entrance */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                variants={staggerItem}
                className="relative bg-cream-50 rounded-3xl p-8 border border-cream-200 hover:border-forest/40 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-sm group"
              >
                <div className="space-y-4">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-forest/20 group-hover:text-forest/40 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-ivory border border-cream-300 flex items-center justify-center text-forest shadow-xs group-hover:bg-forest group-hover:text-ivory transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-sage">
                      {step.tagline}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-forest">
                      {step.title}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-earth-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="h-1 w-12 bg-forest/20 rounded-full group-hover:w-20 group-hover:bg-forest transition-all duration-400" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
