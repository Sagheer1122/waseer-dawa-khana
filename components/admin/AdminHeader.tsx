'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Plus, Bell, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  onOpenSidebar: () => void;
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onOpenSidebar, title }) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0E1E17] border-b border-emerald-900/40 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg text-cream-200 hover:bg-white/5 hover:text-ivory"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {title && (
          <h1 className="font-serif text-lg sm:text-xl font-bold text-ivory tracking-wide">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/admin/products/new"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-[#0A1611] font-sans text-xs font-bold uppercase tracking-wider hover:bg-gold-light active:scale-98 transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>New Product</span>
        </Link>

        {/* Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-emerald-800/40">
          <div className="w-8 h-8 rounded-full bg-emerald-700/60 border border-gold/40 flex items-center justify-center text-ivory text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-gold" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-ivory leading-tight">Admin</span>
            <span className="block text-[10px] text-cream-300">Store Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
};
