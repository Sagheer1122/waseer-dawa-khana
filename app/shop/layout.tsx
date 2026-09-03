import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Shop All Herbal Hair Oils & Ritual Bundles | WASEER Dawa Khana',
  description:
    'Explore our handcrafted cold-pressed unani hair oils, regrowth scalp serums, and bundle sets. Free nationwide delivery across Pakistan on qualifying orders with Cash on Delivery.',
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  openGraph: {
    title: 'Shop WASEER Herbal Hair Oils — Handcrafted Natural Care',
    description: '100% natural, chemical-free herbal oils to eliminate hair fall and stimulate rapid natural growth.',
    url: `${SITE_URL}/shop`,
    images: [
      {
        url: `${SITE_URL}/images/waseer-haircare-collection.jpg`,
        width: 1200,
        height: 630,
        alt: 'WASEER Herbal Hair Care Collection',
      },
    ],
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
