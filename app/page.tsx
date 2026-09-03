import React from 'react';
import { Hero } from '@/components/home/Hero';
import { TrustIndicators } from '@/components/home/TrustIndicators';
import { FeaturedProduct } from '@/components/home/FeaturedProduct';
import { CategorySection } from '@/components/home/CategorySection';
import { IngredientSection } from '@/components/home/IngredientSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { BeforeAfterSlider } from '@/components/home/BeforeAfterSlider';
import { HairQuiz } from '@/components/home/HairQuiz';
import { Newsletter } from '@/components/home/Newsletter';

import { generateWebsiteSchema } from '@/lib/seo';

export default function HomePage() {
  const websiteSchema = generateWebsiteSchema();

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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

      {/* 9. Newsletter & Welcome Gift */}
      <Newsletter />
    </div>
  );
}
