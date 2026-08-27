'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { MoveHorizontal } from 'lucide-react';
import { luxuryEase } from '@/lib/motion';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="before-after" className="py-10 sm:py-14 bg-cream-50/70 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: luxuryEase }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5"
        >
          <Badge variant="sage">HONEST BOTANICAL PROGRESSION</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            Visible Strand Vitality
          </h2>
          <p className="font-sans text-sm sm:text-base text-earth-600">
            Drag the interactive slider to view the restorative effect of a 6-week organic botanical scalp and hair oil ritual.
          </p>
        </motion.div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onPointerCancel={handlePointerUp}
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: luxuryEase }}
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-cream-300 bg-cream-200 cursor-ew-resize select-none touch-none"
          >
            {/* After Image (Full background - Week 6 Healthy, Glossy, Nourished Hair) */}
            <div className="absolute inset-0">
              <Image
                src="/images/hair_after_healthy.jpg"
                alt="Week 6 After: Deeply nourished, silky hair with radiant botanical shine"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-forest/90 text-ivory backdrop-blur-md px-3.5 py-1.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase shadow-md">
                Week 6 (After Ritual)
              </div>
            </div>

            {/* Before Image (Clipped overlay - Week 0 Dry, Frizzy, Damaged Strands) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <Image
                src="/images/hair_before_damaged.jpg"
                alt="Week 0 Before: Dry, rough, frizzy and damaged hair with split ends"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-earth/90 text-ivory backdrop-blur-md px-3.5 py-1.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase shadow-md">
                Week 0 (Before Ritual)
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-ivory shadow-xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <motion.div
                animate={{ scale: isDragging ? 1.15 : 1 }}
                transition={{ duration: 0.15 }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-forest text-ivory border-2 border-ivory shadow-xl flex items-center justify-center pointer-events-auto"
              >
                <MoveHorizontal className="w-5 h-5 text-gold" />
              </motion.div>
            </div>

            {/* Hint overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-ivory/85 backdrop-blur-md text-[11px] font-sans font-medium text-earth-700 pointer-events-none shadow-sm">
              ⇄ Drag slider horizontally to compare
            </div>
          </motion.div>

          {/* Honest Disclaimer */}
          <div className="text-center mt-4">
            <p className="font-sans text-xs text-earth-500 italic">
              * Results vary by individual hair texture, porosity, and consistency of weekly scalp massage application.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
