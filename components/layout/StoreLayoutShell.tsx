'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { SearchModal } from '@/components/layout/SearchModal';
import { ToastContainer } from '@/components/ui/Toast';

const QuickViewModal = dynamic(() => import('@/components/layout/QuickViewModal').then(mod => mod.QuickViewModal), { ssr: false });
const FloatingWhatsApp = dynamic(() => import('@/components/layout/FloatingWhatsApp').then(mod => mod.FloatingWhatsApp), { ssr: false });

export const StoreLayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname?.startsWith('/admin');

  // Secret Admin Shortcut: Alt + A or Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is actively typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (
        (e.altKey && e.key.toLowerCase() === 'a') ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')
      ) {
        e.preventDefault();
        router.push('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  if (isAdmin) {
    return (
      <>
        {children}
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>

      <Footer />

      {/* Storefront Global Drawers & Modals */}
      <CartDrawer />
      <MobileMenu />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />
      <FloatingWhatsApp />
    </>
  );
};
