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
  title: 'AURA BOTANICA — 100% Organic Unisex Botanical Hair & Scalp Oil',
  description: 'Pure single-origin cold-pressed botanical hair oils crafted to nourish your scalp microbiome, strengthen roots, and restore radiant shine. 100% natural, unisex, cruelty-free.',
  keywords: ['organic hair oil', 'rosemary scalp oil', 'unisex hair care', 'cold pressed hair serum', 'natural hair growth', 'argan oil hair gloss'],
  openGraph: {
    title: 'AURA BOTANICA — Pure Botanical Hair & Scalp Rituals',
    description: 'One natural formula. Every hair story. Cold-pressed organic botanical elixirs.',
    url: 'https://aurabotanica.com',
    siteName: 'AURA BOTANICA',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Aura Botanica Organic Hair Oil',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
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
      </body>
    </html>
  );
}
