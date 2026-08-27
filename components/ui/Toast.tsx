'use client';

import React from 'react';
import { useUIStore } from '@/store/uiStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-start gap-3 bg-forest text-ivory p-4 rounded-lg shadow-xl border border-forest-700 backdrop-blur-md"
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-sage-300 flex-shrink-0 mt-0.5" />
            )}
            {toast.type === 'warning' && (
              <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-olive-300 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-ivory">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="font-sans text-xs text-cream-200 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-cream-400 hover:text-ivory transition-colors p-0.5"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
