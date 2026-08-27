'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { INGREDIENTS } from '@/data/ingredients';
import { Badge } from '@/components/ui/Badge';
import { Leaf, MapPin, Droplets, Sparkles, X, ArrowRight, Check } from 'lucide-react';
import { BotanicalIngredient } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function IngredientsPage() {
  const [selectedIngredient, setSelectedIngredient] = useState<BotanicalIngredient | null>(null);

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-cream-50 border-b border-cream-200 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <Badge variant="forest">THE LIVING BOTANICAL APOTHECARY</Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest">
            Botanical Ingredient Library
          </h1>
          <p className="font-sans text-sm sm:text-base text-earth-600 max-w-xl mx-auto">
            Explore the active bioactive chemistry, single-origin geographical provenance, and specific hair benefits behind each plant oil in our formulas.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INGREDIENTS.map((ing) => (
            <div
              key={ing.id}
              id={ing.id}
              className="bg-cream-50 rounded-3xl border border-cream-200 hover:border-sage overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-100">
                  <Image
                    src={ing.image}
                    alt={ing.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-ivory/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-sans font-bold uppercase tracking-wider text-forest flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sage" />
                    <span>{ing.origin}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-forest group-hover:text-sage transition-colors">
                      {ing.name}
                    </h3>
                    <p className="font-serif italic text-xs text-earth-500">{ing.botanicalName}</p>
                  </div>

                  <p className="font-sans text-xs text-earth-600 leading-relaxed line-clamp-3">
                    {ing.description}
                  </p>

                  {/* Extraction Method Tag */}
                  <div className="p-2.5 rounded-xl bg-ivory border border-cream-200 text-[11px] font-sans text-earth-700 flex items-center gap-2">
                    <Droplets className="w-3.5 h-3.5 text-sage flex-shrink-0" />
                    <span className="truncate">{ing.extraction}</span>
                  </div>
                </div>
              </div>

              {/* Action Button to Open Detail */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedIngredient(ing)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-wider hover:bg-forest-700 transition-colors shadow-xs"
                >
                  <span>View Bio-Active Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingredient Detail Modal */}
      <AnimatePresence>
        {selectedIngredient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIngredient(null)}
              className="fixed inset-0 bg-forest-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-ivory rounded-3xl shadow-2xl border border-cream-300 overflow-hidden z-10 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedIngredient(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-cream-200 text-forest hover:bg-forest hover:text-ivory transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <Badge variant="forest">{selectedIngredient.origin}</Badge>
                <h2 className="font-serif text-3xl font-bold text-forest">
                  {selectedIngredient.name}
                </h2>
                <p className="font-serif italic text-sm text-earth-500">
                  {selectedIngredient.botanicalName}
                </p>
              </div>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-cream-100 shadow-inner">
                <Image
                  src={selectedIngredient.image}
                  alt={selectedIngredient.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="font-sans text-sm text-earth-700 leading-relaxed">
                {selectedIngredient.description}
              </p>

              {/* Bioactive compounds */}
              <div className="space-y-2">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-forest block">
                  Key Bio-Active Molecular Compounds:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredient.richIn.map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-cream-100 border border-cream-300 text-xs font-sans text-forest font-semibold"
                    >
                      ✦ {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-forest block">
                  Trichological Benefits:
                </span>
                <ul className="space-y-1.5 text-xs font-sans text-earth-700">
                  {selectedIngredient.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-sage flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-cream-200 flex justify-end">
                <Link
                  href="/shop"
                  onClick={() => setSelectedIngredient(null)}
                  className="px-6 py-3 rounded-full bg-forest text-ivory text-xs font-sans font-bold uppercase tracking-wider hover:bg-forest-700 transition-colors shadow-sm"
                >
                  Shop Formulations Containing This Botanical &rarr;
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
