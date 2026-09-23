'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Instagram, Facebook, ChevronRight, ArrowLeft, HelpCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = 'w-4 h-4',
  ...props
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
  </svg>
);

interface FAQItem {
  id: string;
  label: string;
  badge?: string;
  quickAnswer: string;
  points?: string[];
  siteAction?: {
    label: string;
    href: string;
  };
  whatsappMessage: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'pricing',
    label: '💰 What are the bottle sizes & prices?',
    badge: 'Pricing',
    quickAnswer: 'We offer 3 bottle sizes handcrafted for every stage of your hair restoration:',
    points: [
      '50ml Starter Pack: Rs. 1,450 (Trial pack • 2–3 weeks)',
      '100ml Full Treatment: Rs. 2,450 (Best Seller • 4–6 weeks)',
      '200ml Family Value Pack: Rs. 4,200 (Maximum savings)',
      '🎁 FREE Nationwide Shipping on orders of 2+ bottles!',
    ],
    siteAction: {
      label: 'View Shop Catalog & Order Online',
      href: '/shop',
    },
    whatsappMessage: 'Hello! I want to order WASEER Herbal Hair Oil with Cash on Delivery.',
  },
  {
    id: 'delivery',
    label: '🚚 What is the delivery time & shipping cost?',
    badge: 'Fast Delivery',
    quickAnswer: 'Nationwide shipping details across all cities in Pakistan:',
    points: [
      'Delivery Timeline: 2 to 4 business days via TCS / Trax express courier.',
      'Shipping Fee: Rs. 200 standard delivery (FREE on 2+ bottles or bundles).',
      'Payment Options: Cash on Delivery (COD) available everywhere.',
    ],
    siteAction: {
      label: 'Browse Products (Cash on Delivery)',
      href: '/shop',
    },
    whatsappMessage: 'Hello! What is the delivery timeline and shipping fee for my city?',
  },
  {
    id: 'how-to-use',
    label: '✨ How do I apply the oil for best results?',
    badge: 'Hair Routine',
    quickAnswer: 'Follow this proven 3-step ritual for maximum thickness and root strength:',
    points: [
      '1. Frequency: Apply 3 times weekly directly to the scalp.',
      '2. Gentle Massage: Warm 5–10 drops and massage in circular motions for 5–10 minutes.',
      '3. Timing: Leave on for at least 2 hours or overnight, then wash with a mild shampoo.',
    ],
    siteAction: {
      label: 'Read Complete Botanical Hair Guide',
      href: '/hair-guide',
    },
    whatsappMessage: 'Hello! What is the recommended application routine for WASEER Herbal Hair Oil?',
  },
  {
    id: 'organic-safety',
    label: '🌿 Is it 100% natural and chemical-free?',
    badge: 'Pure Herbal',
    quickAnswer: 'Yes! Handcrafted by WASEER Dawa Khana using traditional Unani cold-press extraction:',
    points: [
      'Pure Botanicals: French Rosemary, Amla, Sikakai, Kalonji, Jamaican Castor & Virgin Argan.',
      'Zero Harmful Chemicals: 0% Mineral Oil, 0% Silicones, 0% Steroids, 0% Artificial Perfumes.',
      '100% Safe: Suitable for all hair types, men, and women of all ages.',
    ],
    siteAction: {
      label: 'Explore Our Botanical Ingredients',
      href: '/ingredients',
    },
    whatsappMessage: 'Hello! Are there any chemicals or side effects in WASEER Herbal Hair Oil?',
  },
  {
    id: 'results',
    label: '❄️ Does it stop hair fall & clear dandruff?',
    badge: 'Proven Results',
    quickAnswer: 'Our clinical botanical formulation treats underlying scalp issues directly:',
    points: [
      'Hair Fall Reduction: Strengthens follicles and curbs excessive shedding within 14–21 days.',
      'Dandruff Relief: Neem and Tea Tree extracts soothe itchiness and clear flakes in 3–4 washes.',
      'New Growth: Stimulates dormant follicles for visible baby hair growth from week 4 onward.',
    ],
    siteAction: {
      label: 'Take 60-Second Consultation Quiz',
      href: '/#quiz',
    },
    whatsappMessage: 'Hello! I have severe hair fall and need personalized consultation.',
  },
  {
    id: 'track-order',
    label: '📦 How can I track my existing parcel?',
    badge: 'Live Tracking',
    quickAnswer: 'Once your parcel is dispatched, a courier tracking number is automatically sent to your phone via SMS. If you need live status:',
    points: [
      'Share your Order Number or registered mobile number with us.',
      'Our team will fetch your live courier tracking link within minutes.',
    ],
    whatsappMessage: 'Hello! I would like to track the live status of my parcel.',
  },
];

export const FloatingWhatsApp: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const whatsappNumber = '923239009042';
  const defaultMessage = 'Hello WASEER Dawa Khana, I would like to inquire about WASEER Herbal Hair Oil.';

  const handleOpenWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFAQ(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* WhatsApp Popup Window (Docks cleanly at bottom-right without overflowing top of screen) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="fixed bottom-5 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[420px] max-h-[min(580px,calc(100vh-3rem))] rounded-2xl bg-white shadow-2xl border border-cream-200 overflow-hidden font-sans flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                  W
                </div>
                <div>
                  <h4 className="font-semibold text-xs leading-tight">WASEER Dawa Khana</h4>
                  <span className="text-[10px] text-emerald-200 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Online • Smart Botanical Concierge
                  </span>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-3 sm:p-3.5 bg-[#F8F9FA] overflow-y-auto flex-1 space-y-2.5 text-xs text-earth-800">
              {/* Greeting Bubble */}
              <div className="p-3 rounded-xl rounded-tl-none bg-white shadow-xs space-y-1 border border-cream-200/60">
                <p className="font-semibold text-forest text-[11px] flex items-center gap-1.5">
                  <span>Welcome to WASEER Dawa Khana</span> 🌿
                </p>
                <p className="text-[11px] leading-relaxed text-earth-700">
                  Select a question below for complete details, or connect directly with our support team on WhatsApp:
                </p>
              </div>

              {/* View 1: Detailed Answer View with On-Site Actions */}
              {selectedFAQ ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <button
                    onClick={() => setSelectedFAQ(null)}
                    className="inline-flex items-center gap-1.5 text-[11px] text-forest font-semibold hover:underline py-0.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to all questions</span>
                  </button>

                  <div className="p-3.5 rounded-xl bg-white border border-emerald-200/80 shadow-xs space-y-2.5">
                    <div className="font-semibold text-forest text-xs pb-1.5 border-b border-cream-100 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{selectedFAQ.label}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100/80 text-[11px] text-earth-800 leading-relaxed space-y-2">
                      <p className="font-medium text-forest-900">{selectedFAQ.quickAnswer}</p>

                      {selectedFAQ.points && (
                        <ul className="space-y-1 pt-1 border-t border-emerald-200/50">
                          {selectedFAQ.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-earth-700 font-normal">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span className="leading-snug">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="space-y-1.5 pt-1">
                      {selectedFAQ.siteAction && (
                        <Link
                          href={selectedFAQ.siteAction.href}
                          onClick={handleClose}
                          className="w-full py-2.5 px-3 rounded-xl bg-forest hover:bg-forest-900 text-ivory font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <span>{selectedFAQ.siteAction.label}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-gold" />
                        </Link>
                      )}

                      <button
                        onClick={() => handleOpenWhatsApp(selectedFAQ.whatsappMessage)}
                        className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300/80 text-forest font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
                        <span>Still have questions? Chat on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* View 2: Questions List */
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-earth-500 uppercase tracking-wider px-1">
                    <span>Frequently Asked Questions ({FAQS.length})</span>
                    <span>Instant Answers</span>
                  </div>

                  <div className="space-y-1.5 max-h-[230px] sm:max-h-[260px] overflow-y-auto pr-1">
                    {FAQS.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => setSelectedFAQ(faq)}
                        className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50/90 border border-emerald-100 text-[11px] text-forest font-medium transition-all shadow-2xs hover:shadow-xs flex items-center justify-between gap-2 group cursor-pointer"
                      >
                        <span className="flex-1 leading-snug line-clamp-1">{faq.label}</span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {faq.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider">
                              {faq.badge}
                            </span>
                          )}
                          <ChevronRight className="w-3.5 h-3.5 text-earth-400 group-hover:text-forest transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Direct CTA */}
            <div className="p-2.5 bg-white border-t border-cream-200 text-center flex-shrink-0">
              <button
                onClick={() => handleOpenWhatsApp(defaultMessage)}
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Direct WhatsApp Consultation</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons Bar (Fixed bottom-right corner) */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
        {/* WhatsApp Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contact on WhatsApp"
          className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>
          <WhatsAppIcon className="w-6 h-6 fill-white" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-forest-950/90 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md">
            WhatsApp Support
          </span>
        </motion.button>

        {/* Floating Instagram Button */}
        <motion.a
          href="https://www.instagram.com/waseerdawakhana?stkn=YmNsNjNhMXFybTB6"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Follow WASEER Herbal Hair Oil on Instagram"
          className="relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer"
        >
          <Instagram className="w-6 h-6 text-white" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-forest-950/90 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md">
            Follow on Instagram
          </span>
        </motion.a>

        {/* Floating Facebook Button */}
        <motion.a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Follow WASEER Herbal Hair Oil on Facebook"
          className="relative group p-3.5 sm:p-4 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer"
        >
          <Facebook className="w-6 h-6 text-white" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-forest-950/90 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md">
            Follow on Facebook
          </span>
        </motion.a>
      </div>
    </>
  );
};

export default FloatingWhatsApp;
