import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Botanical Ingredients & Bio-Actives | WASEER Dawa Khana',
  description:
    'Discover the 100% natural cold-pressed herbs, rosemary, amla, kalonji, and unani botanicals formulated into WASEER Herbal Hair Oil. Zero chemicals, zero mineral oils.',
  alternates: {
    canonical: `${SITE_URL}/ingredients`,
  },
  openGraph: {
    title: 'WASEER Botanical Ingredient Library — 100% Pure Herbs',
    description: 'Explore active botanical ingredients and cold-pressed bio-actives in WASEER Herbal Hair Oil.',
    url: `${SITE_URL}/ingredients`,
  },
};

export default function IngredientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
