import type { Metadata, Viewport } from 'next';
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.waseerdawakhana.com';

export const viewport: Viewport = {
  themeColor: '#1B3B2B',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'ZULVEEN Herbal Hair Oil — WASEER Dawa Khana',
  category: 'beauty',
  title: {
    default: 'ZULVEEN Herbal Hair Oil — Nature Cares For Your Hairs | WASEER Dawa Khana',
    template: '%s | ZULVEEN Herbal Hair Oil',
  },
  description:
    'By the product of WASEER Dawa Khana. ZULVEEN pure authentic cold-pressed herbal hair oil formulated to stop hair fall, awaken dormant follicles, strengthen roots, and promote thick natural hair growth across Pakistan. Free Delivery in Lahore, Cash on Delivery nationwide.',
  keywords: [
    'zulveen herbal hair oil',
    'zulveen hair oil',
    'zulveen waseer dawa khana',
    'zulveen hair oil price in pakistan',
    'waseer herbal hair oil',
    'waseer dawa khana',
    'waseer hair oil price in pakistan',
    'best herbal hair oil in pakistan',
    'natural hair growth oil lahore',
    'anti hair fall oil pakistan',
    'cold pressed unani hair oil',
    'organic hair treatment lahore',
    'herbal oil cash on delivery pakistan',
    'hair regrowth oil karachi',
    'dandruff control oil',
    'amla shikakai kalonji hair oil',
    'fast hair growth oil',
  ],
  authors: [{ name: 'WASEER Dawa Khana', url: siteUrl }],
  creator: 'WASEER Dawa Khana',
  publisher: 'ZULVEEN Herbal Hair Oil',
  manifest: '/manifest.webmanifest',
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
    title: 'ZULVEEN Herbal Hair Oil — Nature Cares For Your Hairs | WASEER Dawa Khana',
    description:
      'Pure cold-pressed botanical hair oil. Matte Black (Rs. 1,799) & Crystal Clear (Rs. 1,999). Free Delivery in Lahore & Cash on Delivery across Pakistan.',
    url: siteUrl,
    siteName: 'ZULVEEN HERBAL HAIR OIL — WASEER DAWA KHANA',
    images: [
      {
        url: '/images/zulveen-dark-bottle.jpg',
        width: 1200,
        height: 630,
        alt: 'ZULVEEN Herbal Hair Oil by WASEER Dawa Khana',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZULVEEN Herbal Hair Oil — WASEER Dawa Khana',
    description: 'Stop hair fall and promote rapid growth with 100% natural cold-pressed unani botanicals. Rs. 1,799 & Rs. 1,999.',
    images: ['/images/zulveen-dark-bottle.jpg'],
  },
  icons: {
    icon: [{ url: '/images/waseer-emblem.png', type: 'image/png' }],
    apple: '/images/waseer-emblem.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'YUVX2KG0ZhV90U0Qb4uhCbtigv29B6TDwmSi9tomTWU',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
  other: {
    'geo.region': 'PK-PB',
    'geo.placename': 'Lahore, Pakistan',
    'geo.position': '31.5204;74.3587',
    'ICBM': '31.5204, 74.3587',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-ivory text-earth flex flex-col font-sans selection:bg-forest selection:text-ivory font-jakarta w-full max-w-[100vw] overflow-x-hidden relative" suppressHydrationWarning>
        <StoreLayoutShell>
          {children}
        </StoreLayoutShell>
      </body>
    </html>
  );
}
