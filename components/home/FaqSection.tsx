'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { HOMEPAGE_FAQS } from '@/lib/seo';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-ivory border-t border-cream-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-forest font-bold tracking-tight">
            Common Questions About WASEER Hair Oil
          </h2>
          <p className="text-earth-600 text-sm sm:text-base max-w-xl mx-auto font-sans">
            Everything you need to know about our authentic unani botanical formulation, application ritual, and nationwide delivery.
          </p>
        </div>

        <div className="space-y-4">
          {HOMEPAGE_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-cream-50/80 border border-cream-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-forest/30"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-serif text-lg text-forest font-semibold focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-forest/50 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-forest/70 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-forest' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-earth-700 text-sm sm:text-base font-sans leading-relaxed border-t border-cream-200/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-sm text-earth-500 font-sans">
          Have more questions? Chat directly with our herbal consultants on WhatsApp:{' '}
          <a
            href="https://wa.me/923239009042?text=Hello%20WASEER%20Dawa%20Khana%2C%20I%20have%20a%20question%20about%20your%20hair%20oil."
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest font-semibold underline underline-offset-4 hover:text-forest/80"
          >
            +92 323 9009042
          </a>
        </div>
      </div>
    </section>
  );
};
