'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { getStoreProducts } from '@/lib/api';
import { Product } from '@/types';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';
import { luxuryEase, smoothEase } from '@/lib/motion';

export const HairQuiz: React.FC = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState({
    hairType: '',
    concern: '',
    frequency: '',
    goal: '',
  });

  const [products, setProducts] = useState<Product[]>([]);

  React.useEffect(() => {
    getStoreProducts().then((data) => {
      if (data && data.length > 0) setProducts(data);
    });
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  const questions = [
    {
      id: 1,
      title: "What's your natural hair texture or type?",
      options: [
        { label: 'Straight (Type 1)', value: 'straight', desc: 'Fine or coarse with natural root oils' },
        { label: 'Wavy (Type 2)', value: 'wavy', desc: 'S-shaped bends prone to mid-length dryness' },
        { label: 'Curly (Type 3)', value: 'curly', desc: 'Spiral loops requiring continuous hydration' },
        { label: 'Coily (Type 4)', value: 'coily', desc: 'Tight zig-zag coils craving dense plant lipids' },
      ],
    },
    {
      id: 2,
      title: 'What is your primary hair or scalp focus?',
      options: [
        { label: 'Excessive Hair Fall & Density', value: 'growth', desc: 'Awakening weak follicles to stop thinning' },
        { label: 'Dry, Split Ends & Breakage', value: 'damage', desc: 'Deep moisture replenishment & shaft repair' },
        { label: 'Flakes, Itch & Scalp Buildup', value: 'scalp', desc: 'Balancing microflora and clearing roots' },
        { label: 'Dullness & Frizzy Flyaways', value: 'shine', desc: 'Weightless lipid smoothing for mirror gloss' },
      ],
    },
    {
      id: 3,
      title: 'How often do you currently oil or treat your hair?',
      options: [
        { label: 'Rarely / Never', value: 'rarely', desc: 'New to botanical oil treatments' },
        { label: 'Once weekly', value: 'weekly', desc: 'Consistent Sunday ritualist' },
        { label: '2–3 times a week', value: 'multi', desc: 'Deep therapeutic practitioner' },
        { label: 'Daily for styling', value: 'daily', desc: 'Smoothing flyaways & cuticle edges' },
      ],
    },
    {
      id: 4,
      title: 'What is your ultimate haircare dream result?',
      options: [
        { label: 'Thicker, longer regrowth', value: 'growth', desc: 'Dense, visible fullness at crown & hairline' },
        { label: 'Zero frizz, silky mirror light', value: 'shine', desc: 'Glass-hair glide with no greasy weight' },
        { label: 'Calm, balanced, flake-free scalp', value: 'scalp', desc: 'Fresh, breathable roots that feel invigorated' },
        { label: 'Complete 3-step transformative bundle', value: 'bundle', desc: 'Growth + repair + scalp synergy' },
      ],
    },
  ];

  const handleSelectOption = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      setStep(5); // Show results
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setDirection(-1);
    setStep(1);
    setAnswers({ hairType: '', concern: '', frequency: '', goal: '' });
  };

  // Determine recommendation based on answers
  const getRecommendedProduct = (): Product | null => {
    if (products.length === 0) return null;
    if (answers.goal === 'bundle' || (answers.concern === 'growth' && answers.goal === 'bundle')) {
      return products.find((p) => p.category === 'bundles') || products[0];
    }
    if (answers.concern === 'scalp' || answers.goal === 'scalp') {
      return products.find((p) => p.category === 'scalp') || products[0];
    }
    if (answers.concern === 'dryness' || answers.goal === 'shine') {
      return products.find((p) => p.category === 'repair') || products[0];
    }
    if (answers.hairType === 'coily' || answers.concern === 'damage') {
      return products.find((p) => p.category === 'repair' || p.category === 'daily') || products[0];
    }
    return products.find((p) => p.category === 'growth') || products[0];
  };

  const recommendedProduct = getRecommendedProduct();

  const slideVariants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: smoothEase },
    },
    exit: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? -20 : 20,
      opacity: 0,
      transition: { duration: 0.25, ease: smoothEase },
    }),
  };

  return (
    <section id="quiz" className="py-10 sm:py-14 bg-cream-100/60 border-b border-cream-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2.5">
          <Badge variant="forest">FREE HAIR CONSULTATION</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            Find Your Ideal Herbal Formula
          </h2>
          <p className="font-sans text-sm sm:text-base text-earth-600">
            Answer 4 quick questions to find the perfect WASEER herbal solution for your specific hair and scalp needs.
          </p>
        </div>

        {/* Quiz Box */}
        <div className="bg-ivory rounded-3xl border border-cream-300 p-6 sm:p-10 shadow-lg relative overflow-hidden">
          
          <AnimatePresence mode="wait" custom={direction}>
            {step <= 4 ? (
              <motion.div
                key={`quiz-step-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                {/* Progress indicator */}
                <div className="flex items-center justify-between text-xs font-sans border-b border-cream-200 pb-4">
                  <span className="font-bold text-forest uppercase tracking-widest">
                    Question {step} of 4
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.span
                        key={i}
                        animate={{
                          width: i === step ? 32 : 16,
                          backgroundColor: i === step ? '#18352A' : i < step ? '#526B52' : '#E6E0D4',
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-1.5 rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Question Title */}
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                    {questions[step - 1].title}
                  </h3>
                  <p className="font-sans text-xs text-earth-500">
                    Select the option that best reflects your current hair state.
                  </p>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {questions[step - 1].options.map((opt) => {
                    const currentAnswerKey =
                      step === 1
                        ? 'hairType'
                        : step === 2
                        ? 'concern'
                        : step === 3
                        ? 'frequency'
                        : 'goal';
                    const isSelected = answers[currentAnswerKey as keyof typeof answers] === opt.value;

                    return (
                      <motion.button
                        key={opt.value}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectOption(currentAnswerKey as keyof typeof answers, opt.value)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-forest bg-cream-100/90 shadow-sm ring-2 ring-forest/20'
                            : 'border-cream-300 bg-cream-50/50 hover:border-forest/40 hover:bg-cream-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-base font-bold text-forest">
                            {opt.label}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-forest bg-forest text-ivory' : 'border-cream-400'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3 h-3 text-ivory" />}
                          </div>
                        </div>
                        <p className="font-sans text-xs text-earth-600 mt-1">
                          {opt.desc}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-cream-200 gap-2">
                  <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-colors flex-shrink-0 ${
                      step === 1 ? 'opacity-0 pointer-events-none' : 'text-earth-600 hover:text-forest hover:bg-cream-100'
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-3 sm:py-3.5 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-wider sm:tracking-widest hover:bg-forest-700 active:scale-98 transition-all shadow-md whitespace-nowrap flex-shrink-0"
                  >
                    <span>{step === 4 ? 'Reveal Ritual' : 'Next Step'}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* Result Screen */
              <motion.div
                key="quiz-result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: luxuryEase }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/10 text-sage font-sans text-[11px] font-bold tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    YOUR TAILORED BOTANICAL PRESCRIPTION
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                    Your Recommended Ritual
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-earth-600 max-w-md mx-auto">
                    Based on your {answers.hairType || 'unique'} texture and focus on {answers.concern || 'nourishment'}, this cold-pressed elixir delivers optimal lipid bio-compatibility.
                  </p>
                </div>

                {/* Recommended Product Box */}
                {recommendedProduct ? (
                  <div className="bg-cream-50 rounded-2xl border border-cream-300 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-5 relative aspect-square rounded-xl overflow-hidden bg-cream-100">
                      <Image
                        src={recommendedProduct.images[0]}
                        alt={recommendedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="sm:col-span-7 space-y-4">
                      <div>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-sage">
                          {recommendedProduct.category} Treatment
                        </span>
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-forest">
                          {recommendedProduct.name}
                        </h4>
                        <p className="font-sans text-xs text-earth-600 mt-1 line-clamp-2">
                          {recommendedProduct.description}
                        </p>
                      </div>

                      <div className="space-y-1 text-xs font-sans text-earth-700 bg-ivory p-3 rounded-xl border border-cream-200">
                        <p className="font-semibold text-forest">Suggested Ritual Routine:</p>
                        <p>Apply 4–6 drops along scalp partings 2–3x weekly. Leave for 30 minutes before shampooing.</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-sans text-xl font-bold text-forest">
                          {formatPrice(recommendedProduct.basePrice)}
                        </span>

                        <div className="flex items-center gap-3">
                          <Link
                            href={`/product/${recommendedProduct.slug}`}
                            className="px-5 py-2.5 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-wider hover:bg-forest-700 transition-colors shadow-sm"
                          >
                            View Product
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-forest font-serif">
                    Finding your formulation...
                  </div>
                )}

                {/* Retake Button */}
                <div className="text-center pt-2">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-earth-600 hover:text-forest transition-colors uppercase tracking-wider"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Consultation Quiz</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
