'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUIStore } from '@/store/uiStore';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { luxuryEase, smoothEase } from '@/lib/motion';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export const Newsletter: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const addToast = useUIStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterForm) => {
    setIsSuccess(true);
    reset();
    addToast({
      type: 'success',
      title: "You're on the list.",
      message: 'Welcome to WASEER Herbal Hair Oil.',
    });
  };

  return (
    <section className="py-12 sm:py-16 bg-forest text-ivory relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: luxuryEase }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-700 border border-forest-600"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-cream-200">
            SPECIAL OFFERS &amp; DISCOUNTS
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: luxuryEase }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ivory"
        >
          Get Rs. 300 Off Your First Order.
        </motion.h2>

        {/* Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: luxuryEase }}
          className="font-sans text-sm sm:text-base text-cream-200 max-w-xl mx-auto leading-relaxed"
        >
          Subscribe to receive authentic hair care advice from WASEER Dawa Khana, Bait Hazari and special discount coupons.
        </motion.p>

        {/* Form Container */}
        <div className="max-w-md mx-auto pt-4">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="newsletter-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: luxuryEase }}
                className="p-5 rounded-2xl bg-forest-700/80 border border-forest-500 text-ivory flex items-center justify-center gap-3 shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-sage-300 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-serif text-base font-bold text-cream-100">
                    You&apos;re on the list.
                  </p>
                  <p className="font-sans text-xs text-cream-300">
                    Check your inbox for your 15% welcome code: <strong className="text-gold">BOTANICA15</strong>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="newsletter-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3.5 rounded-full bg-forest-900/80 border border-forest-600 text-ivory placeholder:text-cream-400/60 font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-ivory text-forest font-sans text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-forest active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    <span>{isSubmitting ? 'Joining...' : 'Join Us'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
                {errors.email && (
                  <p className="text-xs font-sans text-red-300 text-left px-4">
                    {errors.email.message}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          <p className="font-sans text-[11px] text-cream-400/80 mt-3">
            Zero spam. Unsubscribe anytime with 1-click.
          </p>
        </div>

      </div>
    </section>
  );
};
