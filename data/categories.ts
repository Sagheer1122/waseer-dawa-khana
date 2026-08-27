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
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85',
    itemCount: 3,
  },
  {
    id: 'scalp',
    slug: 'scalp',
    name: 'Scalp Health & Balance',
    tagline: 'Microbiome Calming Care',
    description: 'Clarifying and purifying treatments that gently remove buildup, soothe dryness, and restore harmonic scalp balance.',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=85',
    itemCount: 3,
  },
  {
    id: 'repair',
    slug: 'repair',
    name: 'Dry & Damaged Hair',
    tagline: 'Lipid Cuticle Recovery',
    description: 'Deeply restorative cold-pressed argan and golden jojoba oils to seal fractured cuticles, eliminate brittle ends, and soften coarse texture.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85',
    itemCount: 3,
  },
  {
    id: 'daily',
    slug: 'daily',
    name: 'Daily Lustre & Styling',
    tagline: 'Weightless Mirror Gloss',
    description: 'Ultra-lightweight botanical nectar that melts effortlessly into hair to tame flyaways, deflect humidity, and bestow natural glass radiance.',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85',
    itemCount: 3,
  },
];
