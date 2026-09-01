import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreLayoutShell } from '@/components/layout/StoreLayoutShell';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://waseerhairoil.com'),
  title: 'WASEER Herbal Hair Oil — Nature Cares For Your Hairs | WASEER Dawa Khana',
  description: 'By the product of WASEER Dawa Khana. Pure authentic cold-pressed herbal hair oil formulated to nourish hair, strengthen roots, promote growth, and restore healthier, shinier hair.',
  keywords: ['waseer herbal hair oil', 'waseer dawa khana', 'herbal hair oil pakistan', 'natural hair growth oil', 'unani hair oil'],
  openGraph: {
    title: 'WASEER Herbal Hair Oil — By the product of WASEER Dawa Khana',
    description: 'Nature Cares for your hairs. Handcrafted herbal hair oil to nourish hair, strengthen roots, and promote growth.',
    url: 'https://waseerhairoil.com',
    siteName: 'WASEER HERBAL HAIR OIL',
    images: [
      {
        url: '/images/waseer-product-bottle.jpg',
        width: 1200,
        height: 1200,
        alt: 'WASEER Herbal Hair Oil by WASEER Dawa Khana',
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
        <StoreLayoutShell>
          {children}
        </StoreLayoutShell>
      </body>
    </html>
  );
}
