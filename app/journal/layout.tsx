import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'The Hair Journal — Botanical Insights & Care Guides | WASEER',
  description:
    'Read insightful botanical guides, unani hair growth remedies, scalp health research, and pre-wash oiling rituals from WASEER Dawa Khana.',
  alternates: {
    canonical: `${SITE_URL}/journal`,
  },
  openGraph: {
    title: 'The Hair Journal — WASEER Botanical Care & Wisdom',
    description: 'Expert hair health tips, scalp oiling rituals, and natural growth strategies.',
    url: `${SITE_URL}/journal`,
  },
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
