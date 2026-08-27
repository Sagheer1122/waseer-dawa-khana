import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Leaf, Droplet, FlaskConical, Sparkles, Heart } from 'lucide-react';

export const ProductStory: React.FC = () => {
  const steps = [
    {
      title: 'Botanicals',
      tagline: 'Step 01 • Ethical Harvesting',
      desc: 'Sustainably wild-harvested French rosemary, fair-trade Moroccan argan, and desert jojoba shrubs.',
      icon: Leaf,
    },
    {
      title: 'Extraction',
      tagline: 'Step 02 • Single Cold-Press',
      desc: 'Gentle hydraulic pressing under 85°F without chemical solvents, preserving natural bio-active enzymes.',
      icon: Droplet,
    },
    {
      title: 'Formulation',
      tagline: 'Step 03 • Small Batch Blending',
      desc: 'Calibrated trichologist-tested lipid ratios that replicate natural human sebum and penetrate strand cuticles.',
      icon: FlaskConical,
    },
    {
      title: 'Amber Bottle',
      tagline: 'Step 04 • UV-Shield Protection',
      desc: 'Poured into heavy apothecary amber glass flacons that protect delicate botanical lipids from light oxidation.',
      icon: Sparkles,
    },
    {
      title: 'Your Ritual',
      tagline: 'Step 05 • Daily Self-Care',
      desc: 'Grounding 5-minute pre-wash scalp massage restoring density, luster, and confidence to your strands.',
      icon: Heart,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-ivory border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="olive">SEED TO STRAND</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            From Earth To Your Hair.
          </h2>
          <p className="font-sans text-sm sm:text-base text-earth-600">
            A transparent journey from ethical wild-harvested botanicals to the amber bottle resting on your bathroom counter.
          </p>
        </div>

        {/* 5-Step Visual Progression Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-cream-50 rounded-2xl p-6 border border-cream-200 hover:border-forest/40 transition-all flex flex-col justify-between space-y-4 group hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-ivory border border-cream-300 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-sage block">
                    {s.tagline}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-forest">
                    {s.title}
                  </h3>
                  <p className="font-sans text-xs text-earth-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-cream-200 text-[11px] font-mono text-earth-500">
                  <span>Phase {idx + 1}/5</span>
                  {idx < 4 && <span className="hidden md:inline text-forest">→</span>}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
