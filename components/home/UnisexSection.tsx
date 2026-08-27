import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Sparkles } from 'lucide-react';

export const UnisexSection: React.FC = () => {
  const stories = [
    {
      title: 'Dense Beard & Temple Grooming',
      category: 'Marcus • 4C Texture',
      desc: 'Softens coarse facial bristles, relieves underlying skin tightness, and restores temple edges.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Postpartum & Stress Shedding Recovery',
      category: 'Elena • 3B Curly',
      desc: 'Invigorating French rosemary stimulating micro-capillary flow along thinning partings.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Fine Straight Strand Weightless Gloss',
      category: 'Liam • Straight / Fine',
      desc: 'A single drop of Sonoran jojoba protects fine hair shafts from friction without limp grease.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Bleach & Color Damage Restoration',
      category: 'Camille • High Porosity Waves',
      desc: 'First cold-pressed Moroccan argan lipid matrix seals porous cuticles against breakage.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=85',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-cream-50 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="forest">UNISEX BOTANICAL ETHOS</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            Made For Every Hair Story.
          </h2>
          <p className="font-sans text-sm sm:text-base text-earth-600 max-w-2xl mx-auto leading-relaxed">
            One natural formula. Different routines. Made for anyone who wants better hair care—regardless of gender, age, or hair texture.
          </p>
        </div>

        {/* 4 Authentic Diverse Portrait Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-ivory rounded-2xl overflow-hidden border border-cream-200 hover:border-sage shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-ivory/90 backdrop-blur-sm text-[10px] font-sans font-bold uppercase tracking-widest text-forest">
                  {item.category}
                </span>
              </div>

              {/* Text */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-forest group-hover:text-sage transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-earth-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-forest text-ivory flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-100">
              Not sure which ritual suits your hair?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-cream-300">
              Take our interactive 60-second Hair Type Finder quiz for custom routine guidance.
            </p>
          </div>
          <a
            href="#quiz"
            className="px-6 py-3 rounded-full bg-gold text-forest font-sans text-xs font-bold uppercase tracking-widest hover:bg-gold-400 transition-colors flex-shrink-0 shadow-sm"
          >
            Take 60-Second Quiz &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
