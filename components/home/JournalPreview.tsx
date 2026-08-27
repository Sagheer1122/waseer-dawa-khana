import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

export const JournalPreview: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-ivory border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-xl">
            <Badge variant="sage">TRICHOLOGY & BOTANICAL SCIENCE</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
              The Hair Journal
            </h2>
            <p className="font-sans text-sm sm:text-base text-earth-600">
              Evidence-based botanical insights, ancient oiling traditions, and practical guidance for holistic hair wellness.
            </p>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-forest hover:text-sage transition-colors pb-1 group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group bg-cream-50 rounded-2xl overflow-hidden border border-cream-200 hover:border-sage shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-100">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-ivory/90 backdrop-blur-sm text-[10px] font-sans font-bold uppercase tracking-widest text-forest">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-sans text-earth-500">
                    <Clock className="w-3.5 h-3.5 text-sage" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.publishDate}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-forest group-hover:text-sage transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-earth-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-xs font-sans font-semibold text-forest">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sage group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
