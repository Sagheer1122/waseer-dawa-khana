'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { ProductCategory } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as ProductCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = [
    { label: 'All Rituals', value: 'all' },
    { label: 'Growth & Density', value: 'growth' },
    { label: 'Dry & Damaged Repair', value: 'repair' },
    { label: 'Scalp Health', value: 'scalp' },
    { label: 'Daily Gloss & Styling', value: 'daily' },
    { label: 'Ritual Bundles', value: 'bundles' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [selectedCategory, sortBy]);

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Page Header (Clean, Spacious) */}
      <div className="bg-cream-50/70 border-b border-cream-200 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <Badge variant="forest">THE BOTANICAL APOTHECARY</Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest">
            Shop All Rituals
          </h1>
          <p className="font-sans text-sm sm:text-base text-earth-600 max-w-lg mx-auto leading-relaxed">
            100% natural single-origin cold-pressed botanical elixirs crafted for every hair texture, routine, and story.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Horizontal Category Navigation Pills & Sorting */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-cream-200">
          
          {/* Category Pills Bar (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat.value
                    ? 'bg-forest text-ivory shadow-xs'
                    : 'bg-cream-100/80 text-earth-700 hover:bg-cream-200 hover:text-forest'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Sorting & Count */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4 self-end md:self-auto">
            <span className="font-sans text-xs text-earth-500 font-medium">
              {filteredProducts.length} formulations
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-1.5 rounded-full bg-ivory border border-cream-300 text-xs font-sans font-medium text-forest focus:outline-none focus:border-forest"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Top Rated (4.8+)</option>
              <option value="reviews">Most Reviewed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Spacious Product Grid */}
        <div className="pt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory py-20 text-center font-serif text-xl text-forest">Loading Botanical Apothecary...</div>}>
      <ShopContent />
    </Suspense>
  );
}
