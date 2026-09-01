import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { Badge } from '@/components/ui/Badge';

export const CategorySection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-cream-50/60 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-3 max-w-xl">
            <Badge variant="olive">HERBAL HAIR SOLUTIONS</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
              Shop By Hair Goal
            </h2>
            <p className="font-sans text-sm sm:text-base text-earth-600">
              Targeted unani herbal solutions crafted by WASEER Dawa Khana to treat hair fall, dandruff, and split ends naturally.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-forest hover:text-sage transition-colors pb-1 group"
          >
            <span>View All Formulas</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Visual Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group relative rounded-2xl overflow-hidden bg-ivory border border-cream-200 hover:border-sage shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={80}
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-ivory/90 backdrop-blur-sm text-[10px] font-sans font-bold uppercase tracking-widest text-forest">
                  {cat.tagline}
                </span>
              </div>

              {/* Text content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-forest group-hover:text-sage transition-colors">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-xs text-earth-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-cream-200 text-xs font-sans font-semibold text-forest">
                  <span>Explore Rituals</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-sage" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
