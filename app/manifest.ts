import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WASEER Herbal Hair Oil — WASEER Dawa Khana',
    short_name: 'WASEER',
    description:
      'Pure authentic cold-pressed botanical hair care remedies by WASEER Dawa Khana. Nature Cares For Your Hairs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF9F5',
    theme_color: '#1B3B2B',
    icons: [
      {
        src: '/images/waseer-emblem.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/waseer-emblem.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
