import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { INGREDIENTS } from '@/data/ingredients';
import { Badge } from '@/components/ui/Badge';

export const IngredientSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-ivory border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <Badge variant="sage">BOTANICAL INTEGRITY</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            Powered By Nature
          </h2>
          <p className="font-sans text-sm sm:text-base text-earth-600">
            Carefully selected single-origin botanical oils, cold-pressed without heat or solvents for your everyday hair ritual.
          </p>
        </div>

        {/* 4 Botanical Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {INGREDIENTS.slice(0, 4).map((ing) => (
            <div
              key={ing.id}
              className="group bg-cream-50 rounded-2xl border border-cream-200 hover:border-forest/40 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Botanical Photography */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-cream-100 shadow-inner">
                  <Image
                    src={ing.image}
                    alt={ing.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-forest-950/10 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-sage block">
                    {ing.origin}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-forest group-hover:text-sage transition-colors">
                    {ing.name}
                  </h3>
                  <p className="font-serif italic text-xs text-earth-500">
                    {ing.botanicalName}
                  </p>
                  <p className="font-sans text-xs text-earth-600 line-clamp-3 leading-relaxed pt-1">
                    {ing.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-cream-200 mt-4">
                <Link
                  href={`/ingredients#${ing.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-forest group-hover:text-sage transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/ingredients"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-forest text-forest hover:bg-forest hover:text-ivory font-sans text-xs font-bold uppercase tracking-widest transition-all shadow-xs"
          >
            <span>Explore Full Botanical Encyclopedia (10+ Botanicals)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
