'use client';

import React, { useState } from 'react';
import { REVIEWS } from '@/data/reviews';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { ChevronLeft, ChevronRight, CheckCircle2, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { smoothEase, luxuryEase } from '@/lib/motion';

export const ReviewsCarousel: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prefersReducedMotion = useReducedMotion();

  const reviewsPerPage = 3;
  const maxStart = Math.max(0, REVIEWS.length - reviewsPerPage);

  const prevReview = () => {
    setDirection(-1);
    setStartIndex((prev) => (prev === 0 ? maxStart : Math.max(0, prev - 1)));
  };

  const nextReview = () => {
    setDirection(1);
    setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
  };

  const visibleReviews = REVIEWS.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <section className="py-16 sm:py-24 bg-ivory border-b border-cream-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: luxuryEase }}
            className="space-y-3 max-w-xl"
          >
            <Badge variant="sage">AUTHENTIC CLIENT EXPERIENCES</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
              Loved By Hair-Care Ritualists.
            </h2>
            <p className="font-sans text-sm sm:text-base text-earth-600">
              Over 2,800+ 5-star reviews from men and women across all hair types, textures, and scalp concerns.
            </p>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={prevReview}
              className="p-3 rounded-full border border-cream-300 hover:border-forest text-forest hover:bg-cream-100 transition-colors shadow-xs"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={nextReview}
              className="p-3 rounded-full border border-cream-300 hover:border-forest text-forest hover:bg-cream-100 transition-colors shadow-xs"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout" custom={direction}>
            {visibleReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prefersReducedMotion ? 0 : direction > 0 ? -30 : 30 }}
                transition={{ duration: 0.4, ease: smoothEase }}
                className="bg-cream-50 rounded-3xl p-6 sm:p-8 border border-cream-200 hover:border-sage/40 transition-all flex flex-col justify-between space-y-6 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Rating rating={review.rating} showText={false} />
                    <span className="font-sans text-xs text-earth-400 font-medium">
                      {review.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-forest leading-snug">
                    &ldquo;{review.headline}&rdquo;
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-earth-700 leading-relaxed">
                    {review.content}
                  </p>
                </div>

                {/* Reviewer Metadata */}
                <div className="pt-4 border-t border-cream-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-forest">
                      {review.author}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-sage">
                      <CheckCircle2 className="w-3 h-3 text-sage" /> Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-sans text-earth-500">
                    <span>{review.hairType}</span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> {review.helpfulCount}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
