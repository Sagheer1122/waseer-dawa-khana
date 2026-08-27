'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLES } from '@/data/articles';
import { Badge } from '@/components/ui/Badge';
import { Clock, ArrowRight, Search, BookOpen } from 'lucide-react';

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = ARTICLES[0];

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Rituals & Techniques', label: 'Rituals & Techniques' },
    { id: 'Hair Science', label: 'Hair Science' },
    { id: 'Botanical Science', label: 'Botanical Science' },
    { id: 'Philosophy', label: 'Philosophy' },
  ];

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesQuery =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Page Header */}
      <div className="bg-cream-50 border-b border-cream-200 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <Badge variant="forest">EDITORIAL & SCIENCE</Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest">
            The Hair Journal
          </h1>
          <p className="font-sans text-sm sm:text-base text-earth-600 max-w-xl mx-auto">
            Explorations in lipid chemistry, historical hair rituals, and clean self-care philosophy from our formulation studio.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* Featured Big Article Hero Card */}
        {selectedCategory === 'all' && !searchQuery && (
          <Link
            href={`/journal/${featuredArticle.slug}`}
            className="group block bg-cream-50 rounded-3xl overflow-hidden border border-cream-300 hover:border-sage shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-cream-100">
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 bg-forest text-ivory px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider">
                  FEATURED EDITORIAL
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-sans text-earth-500">
                  <Clock className="w-3.5 h-3.5 text-sage" />
                  <span>{featuredArticle.readTime}</span>
                  <span>•</span>
                  <span>{featuredArticle.publishDate}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-forest group-hover:text-sage transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="font-sans text-sm text-earth-700 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-cream-200">
                    <Image
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-serif text-xs font-bold text-forest">{featuredArticle.author.name}</p>
                    <p className="font-sans text-[10px] text-earth-500">{featuredArticle.author.role}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-cream-200 flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-forest group-hover:text-sage transition-colors">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-cream-200 pb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-colors flex-shrink-0 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-forest text-ivory'
                    : 'bg-cream-100 text-earth-700 hover:bg-cream-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-earth-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & topics..."
              className="w-full pl-10 pr-4 py-2 text-xs font-sans rounded-full bg-cream-50 border border-cream-300 text-forest focus:outline-none focus:border-forest"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group bg-cream-50 rounded-3xl overflow-hidden border border-cream-200 hover:border-sage shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-100">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-3 left-3 bg-ivory/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-sans font-bold uppercase tracking-wider text-forest">
                    {article.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-sans text-earth-500">
                    <Clock className="w-3.5 h-3.5 text-sage" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.publishDate}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-forest group-hover:text-sage transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs text-earth-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-cream-200/80 mt-2 flex items-center justify-between text-xs font-sans font-semibold text-forest">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-sage group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
