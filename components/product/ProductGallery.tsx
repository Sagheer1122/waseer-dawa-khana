'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails list */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
              activeIndex === idx
                ? 'border-forest ring-2 ring-forest/20 shadow-md'
                : 'border-cream-300 hover:border-forest/50 opacity-70 hover:opacity-100'
            }`}
            aria-label={`View image ${idx + 1} of ${productName}`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image Viewport */}
      <div className="relative flex-1 aspect-[4/5] bg-cream-100 rounded-3xl overflow-hidden shadow-lg border border-cream-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[activeIndex]}
              alt={`${productName} photograph ${activeIndex + 1}`}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Previous / Next Arrow Controls */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <button
              onClick={prevImage}
              className="p-2.5 rounded-full bg-ivory/80 backdrop-blur-md text-forest hover:bg-forest hover:text-ivory shadow-md pointer-events-auto transition-all"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="p-2.5 rounded-full bg-ivory/80 backdrop-blur-md text-forest hover:bg-forest hover:text-ivory shadow-md pointer-events-auto transition-all"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Pagination Dots on Mobile */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 lg:hidden">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === idx ? 'bg-forest w-5' : 'bg-ivory/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
