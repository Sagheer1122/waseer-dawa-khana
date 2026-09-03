import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Hair Care & Oiling Ritual Guide | WASEER Dawa Khana',
  description:
    'Learn how to stop hair fall, perform deep scalp oiling rituals, test hair porosity, and stimulate dense new hair growth with unani hair care science.',
  alternates: {
    canonical: `${SITE_URL}/hair-guide`,
  },
  openGraph: {
    title: 'The Hair Care & Oiling Ritual Guide — WASEER Dawa Khana',
    description: 'Master ancient and modern hair oiling techniques to restore weak roots and halt thinning.',
    url: `${SITE_URL}/hair-guide`,
  },
};

export default function HairGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
