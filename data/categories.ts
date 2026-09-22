export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'growth',
    slug: 'growth',
    name: 'Hair Growth & Density',
    tagline: 'Root-Stimulating Botanicals',
    description: 'Targeted scalp micro-circulation elixirs with rosemary, amla, and Jamaican black castor to support stronger, thicker-looking strands.',
    image: '/images/zulveen-dark-bottle.jpg',
    itemCount: 3,
  },
  {
    id: 'scalp',
    slug: 'scalp',
    name: 'Scalp Health & Balance',
    tagline: 'Microbiome Calming Care',
    description: 'Clarifying and purifying treatments that gently remove buildup, soothe dryness, and restore harmonic scalp balance.',
    image: '/images/zulveen-light-bottle.jpg',
    itemCount: 2,
  },
  {
    id: 'repair',
    slug: 'repair',
    name: 'Dry & Damaged Hair',
    tagline: 'Lipid Cuticle Recovery',
    description: 'Deeply restorative cold-pressed argan and golden jojoba oils to seal fractured cuticles, eliminate brittle ends, and soften coarse texture.',
    image: '/images/zulveen-dark-bottle.jpg',
    itemCount: 2,
  },
  {
    id: 'daily',
    slug: 'daily',
    name: 'Daily Lustre & Styling',
    tagline: 'Weightless Mirror Gloss',
    description: 'Ultra-lightweight botanical nectar that melts effortlessly into hair to tame flyaways, deflect humidity, and bestow natural glass radiance.',
    image: '/images/zulveen-light-bottle.jpg',
    itemCount: 2,
  },
];
