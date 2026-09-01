import React from 'react';
import { Leaf, ShieldCheck, Truck, RotateCcw, MapPin } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Leaf,
      title: '100% Natural Ingredients',
      description: 'Pure cold-pressed botanical herbs without any mineral oil or chemicals.',
    },
    {
      icon: ShieldCheck,
      title: 'Satisfaction Guaranteed',
      subtitle: 'Visible root-strength & shine',
      description: 'Tested traditional unani formula for real, visible hair revival.',
    },
    {
      icon: Truck,
      title: 'Fast Nationwide Delivery',
      description: 'Delivered in 2–3 working days across Pakistan via TCS & Leopards.',
    },
    {
      icon: RotateCcw,
      title: 'Cash on Delivery (COD)',
      description: 'Pay cash at your doorstep in Karachi, Lahore, Islamabad & nationwide.',
    },
    {
      icon: MapPin,
      title: 'WASEER Dawa Khana',
      description: 'A genuine unani formulation crafted with generations of herbal mastery.',
    },
  ];

  return (
    <section className="bg-[#FAF7F2] py-5 sm:py-6 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {indicators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-2.5 sm:p-2 rounded-xl bg-ivory sm:bg-transparent border border-cream-200/80 sm:border-0 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#18352A]/10 border border-[#18352A]/20 flex items-center justify-center text-forest group-hover:bg-[#18352A] group-hover:text-gold transition-colors flex-shrink-0 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-sans text-xs sm:text-[13px] font-bold text-forest leading-tight truncate">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[10px] sm:text-[11px] text-earth-600 truncate mt-0.5">
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
