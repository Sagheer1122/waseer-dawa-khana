import React from 'react';
import { Leaf, Droplets, Heart, Sparkles } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'Single-source plant-based organic botanicals without synthetic additives.',
    },
    {
      icon: Droplets,
      title: 'Cold Pressed',
      description: 'First single-press extraction preserving full bio-active lipid matrix.',
    },
    {
      icon: Heart,
      title: 'Cruelty Free',
      description: 'Leaping Bunny certified, 100% vegan, and never tested on animals.',
    },
    {
      icon: Sparkles,
      title: 'Made With Care',
      description: 'Handcrafted in small batches with sustainable fair-trade sourcing.',
    },
  ];

  return (
    <section className="bg-cream-50 py-6 sm:py-7 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {indicators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center sm:items-start gap-3.5 p-3 sm:p-0 rounded-2xl bg-ivory/80 sm:bg-transparent border border-cream-300/70 sm:border-0 group">
                <div className="w-10 h-10 rounded-xl bg-ivory border border-cream-300 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-ivory transition-colors flex-shrink-0 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-forest">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-earth-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
