import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Sparkles } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
      caption: 'Amber glass ritual bottle in morning light',
      aspect: 'aspect-square',
    },
    {
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
      caption: 'Natural curly hair nourishment ritual',
      aspect: 'aspect-[3/4]',
    },
    {
      src: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=85',
      caption: 'Wild French rosemary botanicals',
      aspect: 'aspect-square',
    },
    {
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
      caption: 'Beard and hairline density care',
      aspect: 'aspect-[3/4]',
    },
    {
      src: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85',
      caption: 'Moroccan argan & golden jojoba glow',
      aspect: 'aspect-square',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-ivory border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <Badge variant="olive">COMMUNITY RITUALS</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            Your Hair. Your Ritual.
          </h2>
          <p className="font-sans text-sm sm:text-base text-earth-600">
            A glimpse into the daily mindful scalp and strand rituals of our global community.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden bg-cream-100 border border-cream-200 shadow-sm group ${item.aspect}`}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-forest-950/20 group-hover:bg-forest-950/40 transition-colors" />
              <div className="absolute inset-0 p-4 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-sans text-[11px] font-medium text-ivory drop-shadow-md">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
