'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '923001234567';
  const defaultMessage = 'Hello WASEER Dawa Khana, I want to order WASEER Herbal Hair Oil.';

  const handleOpenWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 sm:w-80 rounded-2xl bg-white shadow-2xl border border-cream-200 overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                  W
                </div>
                <div>
                  <h4 className="font-semibold text-xs leading-tight">WASEER Dawa Khana</h4>
                  <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Online • Bait Hazari Support
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1"
                aria-label="Close WhatsApp chat popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-3.5 bg-[#E5DDD5]/30 space-y-2.5 text-xs text-earth-800">
              <div className="p-3 rounded-xl rounded-tl-none bg-white shadow-xs max-w-[90%] space-y-1">
                <p className="font-semibold text-forest text-[11px]">Assalam-o-Alaikum! 🌿</p>
                <p className="text-[11px] leading-relaxed text-earth-700">
                  Welcome to WASEER Dawa Khana, Bait Hazari. How can we help your hair care journey today?
                </p>
              </div>

              {/* Quick Prompt Options */}
              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => handleOpenWhatsApp('I want to order WASEER Herbal Hair Oil (Cash on Delivery)')}
                  className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-emerald-200/80 text-[11px] text-forest font-medium transition-colors"
                >
                  🛍️ Order WASEER Hair Oil (COD)
                </button>
                <button
                  onClick={() => handleOpenWhatsApp('I have severe hair fall and need free consultation')}
                  className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-emerald-200/80 text-[11px] text-forest font-medium transition-colors"
                >
                  💬 Free Hair Fall Consultation
                </button>
              </div>
            </div>

            {/* Bottom Direct CTA */}
            <div className="p-2.5 bg-white border-t border-cream-200 text-center">
              <button
                onClick={() => handleOpenWhatsApp(defaultMessage)}
                className="w-full py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button with Glowing Ring */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact on WhatsApp"
        className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-all"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-6 h-6 fill-white" />
      </motion.button>
    </div>
  );
};
