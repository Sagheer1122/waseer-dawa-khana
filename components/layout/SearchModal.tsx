'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { PRODUCTS } from '@/data/products';
import { ARTICLES } from '@/data/articles';
import { formatPrice } from '@/lib/utils';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeSearch]);

  const cleanQuery = query.toLowerCase().trim();

  const matchingProducts = cleanQuery
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.description.toLowerCase().includes(cleanQuery) ||
          p.ingredientsSummary.toLowerCase().includes(cleanQuery) ||
          p.concerns.some((c) => c.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchingArticles = cleanQuery
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(cleanQuery) ||
          a.excerpt.toLowerCase().includes(cleanQuery) ||
          a.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      )
    : [];

  const popularSearches = ['Rosemary Oil', 'Scalp Care', 'Argan Gloss', 'Dry Hair', 'Ayurvedic Amla'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-forest-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="relative w-full max-w-2xl bg-ivory rounded-2xl shadow-2xl border border-cream-300 overflow-hidden z-10 flex flex-col max-h-[85vh]"
          >
            {/* Input Header */}
            <div className="p-4 sm:p-5 border-b border-cream-200 flex items-center gap-3 bg-cream-50">
              <Search className="w-5 h-5 text-forest" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search oils, ingredients (e.g. rosemary, scalp, argan)..."
                className="flex-1 bg-transparent font-sans text-base sm:text-lg text-forest placeholder:text-earth-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-earth-400 hover:text-forest"
                  aria-label="Clear search text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="px-3 py-1.5 rounded-lg text-xs font-sans font-semibold uppercase tracking-wider text-earth-600 hover:text-forest hover:bg-cream-200 transition-colors"
              >
                Close
              </button>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto p-5 space-y-6">
              {/* If no query, show popular search suggestions */}
              {!cleanQuery && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-earth-500 text-xs font-sans uppercase tracking-widest font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Popular Botanical Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3.5 py-1.5 rounded-full bg-cream-100 hover:bg-forest hover:text-ivory text-earth-700 text-xs font-sans transition-all border border-cream-300"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-cream-200">
                    <span className="text-earth-500 text-xs font-sans uppercase tracking-widest font-semibold block mb-3">
                      Featured Botanical Recommendations
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PRODUCTS.slice(0, 2).map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/product/${prod.slug}`}
                          onClick={closeSearch}
                          className="flex items-center gap-3 p-2.5 rounded-xl border border-cream-200 hover:border-sage hover:bg-cream-50 transition-all group"
                        >
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0">
                            <Image
                              src={prod.images[0]}
                              alt={prod.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-serif text-sm font-semibold text-forest truncate group-hover:text-sage">
                              {prod.name}
                            </h4>
                            <p className="font-sans text-xs text-earth-600 font-medium">
                              {formatPrice(prod.basePrice)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* If query has matches */}
              {cleanQuery && (
                <>
                  {/* Products Matches */}
                  {matchingProducts.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-sans uppercase tracking-widest font-semibold text-earth-500">
                        Products ({matchingProducts.length})
                      </h3>
                      <div className="space-y-2">
                        {matchingProducts.map((prod) => (
                          <Link
                            key={prod.id}
                            href={`/product/${prod.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream-100 transition-colors group border border-transparent hover:border-cream-300"
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0">
                              <Image
                                src={prod.images[0]}
                                alt={prod.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-base font-semibold text-forest group-hover:text-sage transition-colors truncate">
                                {prod.name}
                              </h4>
                              <p className="font-sans text-xs text-earth-600 line-clamp-1">
                                {prod.subtitle}
                              </p>
                              <p className="font-sans text-xs font-bold text-forest mt-0.5">
                                {formatPrice(prod.basePrice)}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-earth-400 group-hover:text-forest group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Articles Matches */}
                  {matchingArticles.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-cream-200">
                      <h3 className="text-xs font-sans uppercase tracking-widest font-semibold text-earth-500 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        Journal Articles ({matchingArticles.length})
                      </h3>
                      <div className="space-y-2">
                        {matchingArticles.map((art) => (
                          <Link
                            key={art.id}
                            href={`/journal/${art.slug}`}
                            onClick={closeSearch}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-cream-100 transition-colors group"
                          >
                            <div>
                              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-sage">
                                {art.category}
                              </span>
                              <h4 className="font-serif text-sm font-semibold text-forest group-hover:text-sage transition-colors">
                                {art.title}
                              </h4>
                            </div>
                            <span className="text-xs font-sans text-earth-500 flex-shrink-0">
                              {art.readTime}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Results State */}
                  {matchingProducts.length === 0 && matchingArticles.length === 0 && (
                    <div className="text-center py-10 space-y-3">
                      <p className="font-serif text-xl text-forest font-semibold">
                        No botanical results for &ldquo;{query}&rdquo;
                      </p>
                      <p className="font-sans text-xs text-earth-600 max-w-sm mx-auto">
                        Try searching for natural ingredients like &ldquo;rosemary&rdquo;, &ldquo;castor&rdquo;, or &ldquo;scalp care&rdquo;.
                      </p>
                      <Link
                        href="/shop"
                        onClick={closeSearch}
                        className="inline-block mt-2 px-5 py-2.5 rounded-full bg-forest text-ivory text-xs font-sans font-semibold uppercase tracking-wider hover:bg-forest-700 transition-colors"
                      >
                        Browse All Hair Oils
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-3.5 bg-cream-100 border-t border-cream-200 text-center text-xs font-sans text-earth-600">
              Press <kbd className="px-1.5 py-0.5 bg-ivory rounded border border-cream-300 font-mono text-[10px]">ESC</kbd> to close search
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
