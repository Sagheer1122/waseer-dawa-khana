import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us & Free Hair Consultation | WASEER Dawa Khana',
  description:
    'Have questions about severe hair fall or our herbal oil? Contact WASEER Dawa Khana client concierge or reach us on WhatsApp at 0323-9009042 for expert guidance.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact WASEER Dawa Khana — Free Hair Care Consultation',
    description: 'Call or WhatsApp 0323-9009042 for direct client support and order inquiries.',
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
