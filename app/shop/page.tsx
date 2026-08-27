'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { ProductCategory } from '@/types';
import { SlidersHorizontal, X, RotateCcw, Check } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramCategory = searchParams.get('category') as ProductCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<string>(paramCategory || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync category with URL
  useEffect(() => {
    if (paramCategory) {
      setSelectedCategory(paramCategory);
    } else {
      setSelectedCategory('all');
    }
  }, [paramCategory]);

  const categories = [
    { label: 'All Oils', value: 'all', count: PRODUCTS.length },
    { label: 'Hair Growth & Density', value: 'growth', count: PRODUCTS.filter((p) => p.category === 'growth').length },
    { label: 'Dry & Damaged Repair', value: 'repair', count: PRODUCTS.filter((p) => p.category === 'repair').length },
    { label: 'Scalp Health & Detox', value: 'scalp', count: PRODUCTS.filter((p) => p.category === 'scalp').length },
    { label: 'Daily Gloss & Shine', value: 'daily', count: PRODUCTS.filter((p) => p.category === 'daily').length },
    { label: 'Ritual Bundles (Sets)', value: 'bundles', count: PRODUCTS.filter((p) => p.category === 'bundles').length },
  ];

  const hasActiveFilters = selectedCategory !== 'all' || maxPrice < 10000;

  const handleCategorySelect = (val: string) => {
    setSelectedCategory(val);
    const newUrl = val === 'all' ? '/shop' : `/shop?category=${val}`;
    window.history.replaceState(null, '', newUrl);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(10000);
    setSortBy('featured');
    window.history.replaceState(null, '', '/shop');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (product.basePrice > maxPrice) {
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
  }, [selectedCategory, maxPrice, sortBy]);

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-cream-50/70 border-b border-cream-200 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <Badge variant="forest">THE BOTANICAL APOTHECARY</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-forest">
            Shop All Rituals
          </h1>
          <p className="font-sans text-xs sm:text-sm text-earth-600 max-w-md mx-auto leading-relaxed">
            100% natural single-origin cold-pressed botanical hair oils crafted for every hair story.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-cream-200">
          
          {/* Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-100 border border-cream-300 text-xs font-sans font-semibold text-forest hover:bg-cream-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>

            <span className="font-sans text-xs sm:text-sm text-earth-600">
              Showing <strong className="text-forest font-bold">{filteredProducts.length}</strong> botanical formulations
            </span>
          </div>

          {/* Right: Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label className="font-sans text-xs text-earth-600 font-semibold hidden sm:inline-block">
              Sort By:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-1.5 rounded-full bg-ivory border border-cream-300 text-xs font-sans font-medium text-forest focus:outline-none focus:border-forest cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Top Rated (4.8+)</option>
              <option value="reviews">Most Reviewed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Main 2-Column Layout (Left Sidebar + Right Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8 items-start">
          
          {/* Left Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 bg-cream-50/60 p-6 rounded-2xl border border-cream-200">
            
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <span className="font-serif text-lg font-bold text-forest">Categories</span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-sans text-sage hover:text-forest underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter List */}
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategorySelect(cat.value)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-sans font-medium transition-colors text-left ${
                    selectedCategory === cat.value
                      ? 'bg-forest text-ivory font-semibold shadow-xs'
                      : 'text-earth-700 hover:bg-cream-100 hover:text-forest'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-bold ${
                    selectedCategory === cat.value ? 'text-gold' : 'text-earth-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Price Filter Slider */}
            <div className="pt-5 border-t border-cream-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="font-bold uppercase tracking-wider text-earth-700">Max Price:</span>
                <span className="font-bold text-forest">Rs. {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-forest cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-earth-400 font-sans">
                <span>Rs. 2,000</span>
                <span>Rs. 10,000</span>
              </div>
            </div>

          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3.5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-3">
                <h3 className="font-serif text-xl font-bold text-forest">No formulations found</h3>
                <p className="font-sans text-xs text-earth-600">Please adjust your price or category filter.</p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 rounded-full bg-forest text-ivory text-xs font-sans font-bold uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-ivory shadow-2xl flex flex-col z-10 border-r border-cream-300">
            {/* Header */}
            <div className="p-4 border-b border-cream-200 flex items-center justify-between bg-cream-50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-forest" />
                <h3 className="font-serif text-lg font-bold text-forest">Filter Categories</h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-full hover:bg-cream-200 text-earth-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="p-5 overflow-y-auto flex-1 space-y-5">
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      handleCategorySelect(cat.value);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-sans transition-colors text-left ${
                      selectedCategory === cat.value
                        ? 'bg-forest text-ivory font-semibold'
                        : 'text-earth-700 hover:bg-cream-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] font-bold">({cat.count})</span>
                  </button>
                ))}
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-cream-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-bold text-earth-700">Max Price:</span>
                  <span className="font-bold text-forest">Rs. {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-forest cursor-pointer"
                />
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 border-t border-cream-200 bg-cream-50 flex items-center gap-2">
              <button
                onClick={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 rounded-full border border-forest/30 text-forest text-xs font-sans font-bold uppercase"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-forest text-ivory text-xs font-sans font-bold uppercase shadow-sm"
              >
                View ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

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
