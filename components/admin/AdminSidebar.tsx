'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  ExternalLink,
  LogOut,
  Sparkles,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'All Products', href: '/admin/products', icon: Package, exact: true },
    { label: 'Add Product', href: '/admin/products/new', icon: PlusCircle, exact: false },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag, exact: false },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0A1611] text-ivory border-r border-emerald-900/50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="p-5 border-b border-emerald-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-serif font-bold text-lg">
              W
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm text-ivory tracking-wide leading-tight">
                WASEER
              </h2>
              <p className="text-[10px] font-sans text-gold/80 uppercase tracking-wider">
                Admin Portal
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-cream-300 hover:text-ivory p-1"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-emerald-800/60 text-gold border border-gold/30 shadow-sm'
                    : 'text-cream-200/80 hover:bg-white/5 hover:text-ivory'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-cream-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-emerald-900/40 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-sans font-medium text-cream-300 hover:bg-white/5 hover:text-ivory transition-all"
          >
            <span className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-emerald-400" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] text-cream-400 uppercase tracking-widest">Store</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-xs font-sans font-semibold text-rose-300 hover:bg-rose-950/40 transition-all text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
