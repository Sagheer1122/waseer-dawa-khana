import React from 'react';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/home/Hero';
import { TrustIndicators } from '@/components/home/TrustIndicators';
import { FeaturedProduct } from '@/components/home/FeaturedProduct';
import { CategorySection } from '@/components/home/CategorySection';
import { IngredientSection } from '@/components/home/IngredientSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { generateWebsiteSchema, generateFAQSchema, HOMEPAGE_FAQS } from '@/lib/seo';

const BeforeAfterSlider = dynamic(
  () => import('@/components/home/BeforeAfterSlider').then((mod) => mod.BeforeAfterSlider),
  {
    loading: () => <div className="py-20 text-center text-forest/40 min-h-[420px] flex items-center justify-center font-serif text-lg">Loading visual transformations...</div>,
  }
);

const HairQuiz = dynamic(
  () => import('@/components/home/HairQuiz').then((mod) => mod.HairQuiz),
  {
    loading: () => <div className="py-16 min-h-[300px]" />,
  }
);

const FaqSection = dynamic(
  () => import('@/components/home/FaqSection').then((mod) => mod.FaqSection),
  {
    loading: () => <div className="py-16 min-h-[300px]" />,
  }
);

const Newsletter = dynamic(
  () => import('@/components/home/Newsletter').then((mod) => mod.Newsletter),
  {
    loading: () => <div className="py-12 min-h-[200px]" />,
  }
);

export default function HomePage() {
  const websiteSchema = generateWebsiteSchema();
  const faqSchema = generateFAQSchema(HOMEPAGE_FAQS);

  return (
    <div className="flex flex-col w-full" suppressHydrationWarning>
      <script
        id="homepage-website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        id="homepage-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Indicators */}
      <TrustIndicators />

      {/* 3. Featured Bestseller */}
      <FeaturedProduct />

      {/* 4. Goal Categories */}
      <CategorySection />

      {/* 5. Proven Visual Transformation Slider */}
      <BeforeAfterSlider />

      {/* 6. Botanical Key Ingredients */}
      <IngredientSection />

      {/* 7. Simple 3-Step Ritual */}
      <HowItWorks />

      {/* 8. 60-Second Consultation Quiz */}
      <HairQuiz />

      {/* 9. Frequently Asked Questions (SEO & Customer Trust) */}
      <FaqSection />

      {/* 10. Newsletter & Welcome Gift */}
      <Newsletter />
    </div>
  );
}
