import { BotanicalIngredient } from '@/types';

export const INGREDIENTS: BotanicalIngredient[] = [
  {
    id: 'rosemary',
    name: 'French Wild Rosemary',
    botanicalName: 'Rosmarinus Officinalis',
    origin: 'Provence, France',
    extraction: 'Steam Distillation of Flowering Tops',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=85',
    colorTone: '#445E44',
    description: 'One of the world’s most celebrated botanicals for hair vitality. High in 1,8-cineole and rosmarinic acid, rosemary oil stimulates micro-capillary flow along the scalp, encouraging follicular nourishment and reducing excessive daily shedding.',
    benefits: [
      'Encourages active anagen growth phase by waking dormant follicles',
      'Inhibits hormonal scalp triggers linked to thinning',
      'Provides natural antioxidant protection to delicate scalp tissue',
      'Naturally purifies and refreshes with an invigorating herbal aroma'
    ],
    richIn: ['Rosmarinic Acid', 'Carnosic Acid', '1,8-Cineole', 'Ursolic Acid'],
    usedInProducts: ['organic-botanical-hair-growth-oil', 'clarifying-rosemary-tea-tree-scalp-detox', 'the-complete-botanical-hair-ritual-bundle']
  },
  {
    id: 'argan',
    name: 'Virgin Moroccan Argan Oil',
    botanicalName: 'Argania Spinosa',
    origin: 'Souss Valley, Morocco',
    extraction: 'First Cold-Pressed from Hand-Cracked Kernels',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85',
    colorTone: '#B08D57',
    description: 'Known for centuries as "Liquid Gold," our unrefined organic argan oil is harvested by Berber women cooperatives. Packed with natural squalene, vitamin E, and oleic/linoleic fatty acids, it penetrates the hair cortex to restore elasticity without heavy coating.',
    benefits: [
      'Restores lost lipid moisture to brittle, heat-treated cuticles',
      'Deflects environmental humidity and shields against UV color fade',
      'Imparts weightless mirror-like shine and velvety touch',
      'Strengthens strand tensile core to reduce split ends'
    ],
    richIn: ['Tocopherols (Vitamin E)', 'Oleic Acid (Omega-9)', 'Linoleic Acid (Omega-6)', 'Plant Phytosterols'],
    usedInProducts: ['organic-botanical-hair-growth-oil', 'restorative-argan-jojoba-gloss-elixir', 'moroccan-argan-rose-shine-mist', 'the-complete-botanical-hair-ritual-bundle']
  },
  {
    id: 'castor',
    name: 'Jamaican Black Castor Oil',
    botanicalName: 'Ricinus Communis',
    origin: 'St. Thomas, Jamaica',
    extraction: 'Traditional Roasted Seed Cold-Press',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=85',
    colorTone: '#3A3027',
    description: 'Revered in traditional Caribbean hair care, our Jamaican Black Castor Oil is extracted from slow-roasted castor beans. It features an unprecedented 90% ricinoleic acid concentration, creating an unmatched protective shield over moisture-starved roots and edges.',
    benefits: [
      'Rich ricinoleic acid profile binds deep moisture to hair follicles',
      'Creates a protective lipid film that fortifies edges and thin hairlines',
      'Deeply conditions coarse, dry, or over-processed hair textures',
      'Helps prevent breakage caused by tight styling and tension'
    ],
    richIn: ['Ricinoleic Acid (90%)', 'Stearic Acid', 'Vitamin E', 'Omega-9 Lipids'],
    usedInProducts: ['organic-botanical-hair-growth-oil', 'castor-cedarwood-beard-root-oil', 'the-complete-botanical-hair-ritual-bundle']
  },
  {
    id: 'jojoba',
    name: 'Desert Golden Jojoba Oil',
    botanicalName: 'Simmondsia Chinensis',
    origin: 'Sonoran Desert, Arizona',
    extraction: 'Single-Pass Cold Press of Desert Seeds',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85',
    colorTone: '#D4A359',
    description: 'Technically a liquid wax ester rather than a triglyceride oil, golden jojoba shares an identical molecular geometry to the natural sebum produced by human skin. It absorbs instantaneously without clogging pores or leaving greasy residue.',
    benefits: [
      'Biomimetic carrier that dissolves oxidized sebum plaques at follicle openings',
      'Balances both excessively dry and excessively oily scalp types',
      'Non-comedogenic, lightweight, and hypoallergenic for all skin types',
      'Provides smooth comb-through glide without silicone heaviness'
    ],
    richIn: ['Wax Esters', 'Gadoleic Acid', 'Erucic Acid', 'Vitamin B-Complex'],
    usedInProducts: ['organic-botanical-hair-growth-oil', 'restorative-argan-jojoba-gloss-elixir', 'clarifying-rosemary-tea-tree-scalp-detox', 'pure-golden-jojoba-daily-nourishing-oil']
  },
  {
    id: 'amla',
    name: 'Organic Wild Amla Berry',
    botanicalName: 'Phyllanthus Emblica',
    origin: 'Western Ghats, India',
    extraction: 'Whole-Fruit Lipid Infusion',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=85',
    colorTone: '#87977A',
    description: 'Known as the "Nectar of Life" in ancient Ayurvedic traditions, Amla contains one of the highest concentrations of bio-available Vitamin C and polyphenol tannins found in any botanical on Earth.',
    benefits: [
      'Enhances strand elasticity to prevent mechanical snapping when brushing',
      'Maintains natural pigment vitality and reduces oxidative stress',
      'Tightens cuticle scales for smoother, more defined wave and curl patterns',
      'Nourishes the hair bulb with bioflavonoids'
    ],
    richIn: ['Vitamin C (Ascorbic Acid)', 'Ellagic Acid', 'Tannins', 'Flavonoids'],
    usedInProducts: ['organic-botanical-hair-growth-oil', 'virgin-coconut-amla-deep-moisture-bath']
  },
  {
    id: 'tea-tree',
    name: 'Australian Tea Tree',
    botanicalName: 'Melaleuca Alternifolia',
    origin: 'New South Wales, Australia',
    extraction: 'Pure Steam Distillation of Fresh Leaves',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=85',
    colorTone: '#2B6852',
    description: 'Renowned for its clarifying properties, our wild-harvested Australian tea tree oil helps gently eliminate dead skin flakes, balance oiliness, and maintain a fresh, healthy scalp environment.',
    benefits: [
      'Decongests scalp pores of styling product buildup',
      'Relieves stubborn dry scalp flaking and itchiness',
      'Creates a clean, refreshed foundation for natural hair growth'
    ],
    richIn: ['Terpinen-4-ol', 'Gamma-Terpinene', 'Alpha-Pinene'],
    usedInProducts: ['clarifying-rosemary-tea-tree-scalp-detox', 'the-complete-botanical-hair-ritual-bundle']
  }
];
