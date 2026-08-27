import { Article } from '@/types';

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'how-to-oil-your-hair-properly-complete-ritual-guide',
    title: 'The Art of Hair Oiling: A Complete Pre-Wash Ritual Guide',
    excerpt: 'Step-by-step guidance on application techniques, scalp massage direction, timing, and washing methods to unlock maximum botanical benefit.',
    category: 'Rituals & Techniques',
    readTime: '6 min read',
    publishDate: 'August 18, 2025',
    author: {
      name: 'Dr. Camille Laurent',
      role: 'Head Botanical Formulator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    tags: ['Hair Oiling', 'Scalp Care', 'Pre-Wash Ritual', 'Beginner Guide'],
    content: [
      {
        sectionHeading: 'Why Modern Hair Care is Returning to Ancient Plant Lipids',
        paragraphs: [
          'For centuries, traditional cultures across the Mediterranean, South Asia, and the Caribbean understood that true hair health begins where strands are generated: deep within the scalp follicle matrix.',
          'Unlike synthetic silicone serums that coat hair in a non-breathable polymer film, cold-pressed botanical oils supply essential fatty acids (Omegas 3, 6, and 9), phytosterols, and natural antioxidants that actively integrate with human hair cuticles.'
        ],
        pullQuote: 'Scalp oiling is not simply moisturizing—it is a vascular stimulant that delivers nutrient-rich blood flow to the hair bulb.'
      },
      {
        sectionHeading: 'The 4-Step Pre-Wash Application Protocol',
        paragraphs: [
          '1. Section Thoroughly: Never pour oil haphazardly over your crown. Part your hair into clean 1-inch sections so the botanical drops reach the scalp skin directly.',
          '2. Warming the Lipids: Dispense 4-6 drops of botanical oil into clean palms and rub briskly together for 5 seconds to warm the natural esters.',
          '3. Focused Circular Massage: Using the soft pads of your fingertips (never your fingernails), work in small upward circular motions starting at the nape of the neck toward the crown.',
          '4. The Optimal Duration: Leave the oil on for a minimum of 30 to 45 minutes. For deep lipid hydration, leave overnight in a silk hair wrap.'
        ],
        bulletPoints: [
          'Frequency: 2 to 3 times per week for active growth phases',
          'Rinsing: Always lather shampoo into dry/damp hair first before adding water for easy lipid emulsification',
          'Temperature: Always wash out with lukewarm water rather than scalding hot water to avoid cuticle shock'
        ]
      }
    ]
  },
  {
    id: 'art-2',
    slug: 'understanding-hair-porosity-and-oil-selection',
    title: 'Understanding Hair Porosity: Which Botanical Oils Suit Your Strands?',
    excerpt: 'Discover why high porosity, medium porosity, and low porosity hair respond differently to plant lipids, and how to choose your ideal blend.',
    category: 'Hair Science',
    readTime: '5 min read',
    publishDate: 'August 10, 2025',
    author: {
      name: 'Tariq Vance',
      role: 'Trichology Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85',
    tags: ['Hair Porosity', 'Lipid Science', 'Custom Routines', 'Hair Health'],
    content: [
      {
        sectionHeading: 'What is Hair Porosity?',
        paragraphs: [
          'Hair porosity refers to your hair shaft’s ability to absorb and retain moisture. It is determined by the condition and arrangement of your cuticle scales—the overlapping protective shingle layers along each strand.',
          'Understanding your porosity changes everything about how your hair accepts botanical oils.'
        ]
      },
      {
        sectionHeading: 'Matching Oils to Your Porosity Type',
        paragraphs: [
          'Low Porosity: Your cuticle scales lie flat and tight. Heavy oils sit on the surface. Opt for lightweight liquid wax esters like Golden Jojoba and Argan that slip effortlessly into microscopic spaces.',
          'High Porosity: Your cuticles are raised or weathered from heat/chemical processing. Water escapes rapidly. You need sealing lipids rich in ricinoleic and lauric acids like Jamaican Black Castor and Virgin Coconut Oil.'
        ]
      }
    ]
  },
  {
    id: 'art-3',
    slug: 'rosemary-oil-for-hair-density-clinical-insights',
    title: 'Rosemary Oil for Hair Density: The Science Behind the Phenomenon',
    excerpt: 'A scientific dive into 1,8-cineole and rosmarinic acid, comparing botanical extracts to traditional cosmetic solutions.',
    category: 'Botanical Science',
    readTime: '7 min read',
    publishDate: 'July 28, 2025',
    author: {
      name: 'Dr. Camille Laurent',
      role: 'Head Botanical Formulator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1200&q=85',
    tags: ['Rosemary Oil', 'Hair Growth', 'Clinical Research', 'Ingredients'],
    content: [
      {
        sectionHeading: 'The Bioactive Chemistry of French Rosemary',
        paragraphs: [
          'Unlike standard commercial fragrances, authentic cold-distilled French rosemary oil contains concentrated levels of rosmarinic acid and carnosic acid. These potent antioxidants neutralize free radical oxidation around the follicular bulb.',
          'In comparative trials, rosemary essential oil demonstrated remarkable efficacy in boosting micro-circulation and supporting anagen hair cycles over a 6-month period, without the irritation commonly associated with synthetic topicals.'
        ]
      }
    ]
  },
  {
    id: 'art-4',
    slug: 'unisex-hair-care-why-scalp-biology-is-universal',
    title: 'Why Scalp Biology is Universal: The Philosophy of Unisex Care',
    excerpt: 'Examining why artificial gender divisions in hair care have distracted from fundamental cellular biology and clean formulation.',
    category: 'Philosophy',
    readTime: '4 min read',
    publishDate: 'July 14, 2025',
    author: {
      name: 'Soren Lindqvist',
      role: 'Brand Creative Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    tags: ['Unisex Care', 'Brand Philosophy', 'Scalp Biology', 'Clean Beauty'],
    content: [
      {
        sectionHeading: 'The Myth of "Men’s" and "Women’s" Hair Follicles',
        paragraphs: [
          'From a trichological perspective, the cellular anatomy of a human hair follicle is identical regardless of gender. Every scalp requires balanced sebum production, uninhibited micro-capillary flow, and protection from lipid peroxidation.',
          'At AURA BOTANICA, we rejected arbitrary cosmetic marketing categories in favor of pure, universal botanical efficacy.'
        ]
      }
    ]
  }
];
