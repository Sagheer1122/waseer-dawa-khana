'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Search, BookOpen, Droplets, Sparkles, Check, ArrowRight, HelpCircle } from 'lucide-react';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';

export default function HairGuidePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const guideTopics = [
    {
      id: 'porosity',
      category: 'science',
      title: 'The Hair Porosity Float Test & Lipid Absorption',
      summary: 'How to determine whether your strand cuticles are low, medium, or high porosity, and which molecular weight oils penetrate best.',
      content: (
        <div className="space-y-3 pt-2 text-xs font-sans text-earth-700 leading-relaxed">
          <p>
            <strong>The Glass Float Test:</strong> Drop a clean shed strand into a glass of room-temperature water. If it floats on top after 4 minutes, you have low porosity hair (tight cuticles). If it sinks to the middle, normal porosity. If it sinks to the bottom immediately, high porosity (open/damaged cuticles).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-cream-100 rounded-xl border border-cream-200">
              <strong className="text-forest block">Low Porosity Match:</strong>
              <span>Lightweight esters like Golden Jojoba and Argan that slip effortlessly beneath tight cuticles without buildup.</span>
            </div>
            <div className="p-3 bg-cream-100 rounded-xl border border-cream-200">
              <strong className="text-forest block">High Porosity Match:</strong>
              <span>Heavy sealing lipids like Jamaican Black Castor and Virgin Coconut that plug cuticle gaps and trap moisture inside.</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'scalp-massage',
      category: 'rituals',
      title: 'Scalp Massage Direction & Follicular Stimulation',
      summary: 'The precise biomechanical finger techniques that activate micro-capillary blood supply to the dermal papilla.',
      content: (
        <div className="space-y-3 pt-2 text-xs font-sans text-earth-700 leading-relaxed">
          <p>
            Always massage in small upward circular motions using only the fleshy pads of your fingers. Never use sharp fingernails, which create micro-abrasions in delicate scalp skin.
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Nape to Crown: Follow lymphatic flow to relieve occipital muscle tension.</li>
            <li>Temples & Hairline: Gentle butterfly circles to encourage baby hair density.</li>
            <li>Duration: 4 to 6 minutes is the clinical threshold for increased capillary blood flow.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'washing',
      category: 'rituals',
      title: 'The Pre-Wash Emulsification Method (No Greasy Residue)',
      summary: 'Why massaging shampoo into dry oiled hair before turning on water is the secret to completely clean, weightless roots.',
      content: (
        <div className="space-y-3 pt-2 text-xs font-sans text-earth-700 leading-relaxed">
          <p>
            Water and oil repel each other. If you drench your hair in water before applying shampoo, the water forms a barrier preventing surfactant molecules from attaching to the oil.
          </p>
          <p className="p-3 bg-forest/10 rounded-xl border border-forest/20 text-forest font-medium">
            <strong>The Master Trick:</strong> Apply your first pump of shampoo directly onto damp/un-rinsed scalp and lather for 30 seconds. Then turn on warm water to effortlessly rinse the emulsified oil clean away.
          </p>
        </div>
      ),
    },
    {
      id: 'types',
      category: 'types',
      title: 'The 4 Hair Texture Spectrum (Type 1 to Type 4)',
      summary: 'From fine straight strands to tight zigzag coily textures: how natural sebum travels along distinct fiber geometry.',
      content: (
        <div className="space-y-2 pt-2 text-xs font-sans text-earth-700">
          <p><strong>Type 1 Straight:</strong> Natural sebum travels quickly to ends. Requires very light root stimulation and micro-doses of oil.</p>
          <p><strong>Type 2 Wavy:</strong> Prone to frizz during humidity changes. Benefits from pre-wash cuticle sealing.</p>
          <p><strong>Type 3 Curly:</strong> Spiral twists prevent sebum from reaching ends. Requires weekly deep oil soaking.</p>
          <p><strong>Type 4 Coily/Kinky:</strong> Dense z-coils need dense ricinoleic castor protection to guard against comb friction.</p>
        </div>
      ),
    },
  ];

  const filteredTopics = guideTopics.filter((t) => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-cream-50 border-b border-cream-200 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <Badge variant="forest">THE EDUCATIONAL ACADEMY</Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest">
            The Hair & Scalp Guide
          </h1>
          <p className="font-sans text-sm sm:text-base text-earth-600 max-w-xl mx-auto">
            Practical trichological wisdom, step-by-step rituals, and honest answers for every hair texture and scalp condition.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-8">
        
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-earth-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. porosity, washing)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-cream-50 border border-cream-300 text-xs font-sans text-forest focus:outline-none focus:border-forest"
            />
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full sm:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'science', label: 'Hair Science' },
              { id: 'rituals', label: 'Ritual Methods' },
              { id: 'types', label: 'Textures & Types' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-colors flex-shrink-0 whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-forest text-ivory'
                    : 'bg-cream-100 text-earth-700 hover:bg-cream-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Accordions */}
        <div className="space-y-4">
          {filteredTopics.length > 0 ? (
            <Accordion
              items={filteredTopics.map((t) => ({
                id: t.id,
                title: t.title,
                content: t.content,
              }))}
              defaultOpenId="porosity"
              allowMultiple
            />
          ) : (
            <div className="text-center py-12 bg-cream-50 rounded-2xl border border-cream-200">
              <p className="font-serif text-lg text-forest font-bold">No educational guides match &ldquo;{searchQuery}&rdquo;</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-2 text-xs font-sans font-bold text-sage hover:underline uppercase tracking-wider"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-forest text-ivory flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-100">Ready to begin your ritual?</h3>
            <p className="font-sans text-xs text-cream-300">Discover our certified cold-pressed botanical hair oils.</p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full bg-gold text-forest font-sans text-xs font-bold uppercase tracking-wider sm:tracking-widest hover:bg-gold-400 transition-colors shadow-md whitespace-nowrap flex-shrink-0"
          >
            <span>Explore Apothecary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
