import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { SearchModal } from '@/components/layout/SearchModal';
import { QuickViewModal } from '@/components/layout/QuickViewModal';
import { ToastContainer } from '@/components/ui/Toast';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WASEER Herbal Hair Oil — Nature Cares For Your Hairs | WASEER Dawa Khana Bait Hazari',
  description: 'By the product of WASEER Dawa Khana, Bait Hazari. Pure authentic cold-pressed herbal hair oil formulated to nourish hair, strengthen roots, promote growth, and restore healthier, shinier hair.',
  keywords: ['waseer herbal hair oil', 'waseer dawa khana', 'waseer dawa khana bait hazari', 'herbal hair oil pakistan', 'natural hair growth oil', 'unani hair oil'],
  openGraph: {
    title: 'WASEER Herbal Hair Oil — By the product of WASEER Dawa Khana, Bait Hazari',
    description: 'Nature Cares for your hairs. Handcrafted herbal hair oil to nourish hair, strengthen roots, and promote growth.',
    url: 'https://waseerhairoil.com',
    siteName: 'WASEER HERBAL HAIR OIL',
    images: [
      {
        url: '/images/waseer-product-bottle.jpg',
        width: 1200,
        height: 1200,
        alt: 'WASEER Herbal Hair Oil by WASEER Dawa Khana Bait Hazari',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/images/waseer-emblem.png', type: 'image/png' },
    ],
    apple: '/images/waseer-emblem.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-ivory text-earth flex flex-col font-sans selection:bg-forest selection:text-ivory font-jakarta w-full max-w-[100vw] overflow-x-hidden relative">
        <AnnouncementBar />
        <Navbar />

        <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
          {children}
        </main>

        <Footer />

        {/* Global Drawers, Modals & Notifications */}
        <CartDrawer />
        <MobileMenu />
        <SearchModal />
        <QuickViewModal />
        <ToastContainer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
