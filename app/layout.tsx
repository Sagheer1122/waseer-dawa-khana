import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreLayoutShell } from '@/components/layout/StoreLayoutShell';
import { generateOrganizationSchema } from '@/lib/seo';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waseerhairoil.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'WASEER Herbal Hair Oil — Nature Cares For Your Hairs | WASEER Dawa Khana',
    template: '%s | WASEER Herbal Hair Oil',
  },
  description:
    'By the product of WASEER Dawa Khana. Pure authentic cold-pressed herbal hair oil formulated to stop hair fall, awaken follicles, strengthen roots, and promote thick natural hair growth across Pakistan.',
  keywords: [
    'waseer herbal hair oil',
    'waseer dawa khana',
    'best herbal hair oil in pakistan',
    'natural hair growth oil',
    'anti hair fall oil pakistan',
    'cold pressed unani hair oil',
    'organic hair treatment lahore',
    'herbal oil cash on delivery pakistan',
  ],
  authors: [{ name: 'WASEER Dawa Khana', url: siteUrl }],
  creator: 'WASEER Dawa Khana',
  publisher: 'WASEER Herbal Hair Oil',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'WASEER Herbal Hair Oil — By the product of WASEER Dawa Khana',
    description:
      'Nature Cares for your hairs. Handcrafted herbal hair oil to halt hair fall, strengthen roots, and promote rapid natural growth.',
    url: siteUrl,
    siteName: 'WASEER HERBAL HAIR OIL',
    images: [
      {
        url: '/images/waseer-hero-landscape.jpg',
        width: 1200,
        height: 630,
        alt: 'WASEER Herbal Hair Oil by WASEER Dawa Khana',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WASEER Herbal Hair Oil — WASEER Dawa Khana',
    description: 'Stop hair fall and promote rapid growth with 100% natural cold-pressed unani botanicals.',
    images: ['/images/waseer-hero-landscape.jpg'],
  },
  icons: {
    icon: [{ url: '/images/waseer-emblem.png', type: 'image/png' }],
    apple: '/images/waseer-emblem.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-ivory text-earth flex flex-col font-sans selection:bg-forest selection:text-ivory font-jakarta w-full max-w-[100vw] overflow-x-hidden relative">
        <StoreLayoutShell>
          {children}
        </StoreLayoutShell>
      </body>
    </html>
  );
}
