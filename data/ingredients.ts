import { BotanicalIngredient } from '@/types';

export const INGREDIENTS: BotanicalIngredient[] = [
  {
    id: 'rosemary',
    name: 'Wild Mountain Rosemary',
    botanicalName: 'Rosmarinus Officinalis (Gul-e-Mehendi)',
    origin: 'Swat & Kaghan Valley, Pakistan',
    extraction: 'Pure Steam Distillation of Fresh Flowering Tops',
    image: '/images/zulveen-dark-bottle.jpg',
    colorTone: '#445E44',
    description: 'Sourced from the pristine high-altitude valleys of Swat and Kaghan. Rich in natural rosmarinic acid and 1,8-cineole, it vigorously stimulates scalp micro-capillary blood circulation to awaken dormant hair follicles and stop excessive shedding.',
    benefits: [
      'Stimulates micro-capillary scalp circulation to encourage active anagen hair growth',
      'Inhibits DHT follicular sensitivity linked to thinning crown lines',
      'Provides high antioxidant protection to nourish roots and delicate scalp tissue',
      'Naturally cleanses hair roots with a refreshing, crisp mountain herbal aroma'
    ],
    richIn: ['Rosmarinic Acid', 'Carnosic Acid', '1,8-Cineole', 'Ursolic Acid'],
    usedInProducts: ['organic-botanical-hair-growth-oil', 'zulveen-anti-dandruff-scalp-relief', 'zulveen-family-value-pack-bundle']
  },
  {
    id: 'kalonji',
    name: 'Pure Cold-Pressed Kalonji',
    botanicalName: 'Nigella Sativa (Black Cumin)',
    origin: 'Cholistan & Multan, Pakistan',
    extraction: 'First Cold-Pressed from Sun-Ripened Seeds',
    image: '/images/zulveen-light-bottle.jpg',
    colorTone: '#2A2A2A',
    description: 'Revered for millennia across Unani and Prophetic herbal traditions, our Kalonji oil is cold-pressed from organic black seeds grown in the fertile soils of Multan and Cholistan. Packed with natural thymoquinone to densify widening part lines and reinforce weak roots.',
    benefits: [
      'Dense in natural thymoquinone to fortify thinning crown and temple zones',
      'Strengthens fragile baby hairs into resilient, thick hair shafts',
      'Nourishes the scalp barrier with rich essential omega-3, 6, and 9 fatty acids',
      'Imparts rich, natural dark luster and shields follicles from premature aging'
    ],
    richIn: ['Thymoquinone (TQ)', 'Nigellone', 'Linoleic Acid (Omega-6)', 'Oleic Acid (Omega-9)'],
    usedInProducts: ['organic-botanical-hair-growth-oil', 'zulveen-black-cumin-kalonji-fortifier', 'zulveen-family-value-pack-bundle']
  },
  {
    id: 'amla',
    name: 'Organic Wild Amla',
    botanicalName: 'Phyllanthus Emblica (Indian Gooseberry)',
    origin: 'Haripur & Hazara Hills, Pakistan',
    extraction: 'Whole-Fruit Traditional Lipid Extraction',
    image: '/images/zulveen-dark-bottle.jpg',
    colorTone: '#87977A',
    description: 'Hand-picked from wild groves in Haripur and the Hazara foothills. Amla is the undisputed herbal king of hair care, containing the highest natural concentration of bio-available Vitamin C and tannin bioflavonoids to strengthen tensile hair elasticity and prevent premature graying.',
    benefits: [
      'High natural Vitamin C fortifies the strand tensile core against breakage',
      'Deeply conditions porous hair shafts and smooths rough, frizzy cuticles',
      'Protects natural hair melanin to maintain rich, vibrant dark pigmentation',
      'Nourishes the hair bulb with bioflavonoids for rapid healthy length retention'
    ],
    richIn: ['Natural Vitamin C (Ascorbic Acid)', 'Ellagic Acid', 'Gallotannins', 'Bioflavonoids'],
    usedInProducts: ['organic-botanical-hair-growth-oil', 'zulveen-intense-hair-fall-control', 'zulveen-coconut-almond-deep-moisture']
  },
  {
    id: 'almond',
    name: 'Pure Sweet Almond Oil',
    botanicalName: 'Prunus Amygdalus Dulcis (Roghan-e-Badam)',
    origin: 'Quetta, Balochistan, Pakistan',
    extraction: 'Single Cold-Press of Sun-Dried Sweet Almonds',
    image: '/images/zulveen-light-bottle.jpg',
    colorTone: '#D4A359',
    description: 'Extracted from the finest indigenous sweet almonds of Balochistan. Known in Unani medicine as Roghan-e-Badam Shirin, this lightweight golden nectar penetrates deep into dry, damaged hair fibers to restore natural softness without grease.',
    benefits: [
      'Deeply conditions brittle, bleached, or heat-damaged hair shafts',
      'Rich in biotin and natural Vitamin E to nourish the scalp barrier',
      'Leaves hair with a silky, non-sticky touch and glass-like mirror shine',
      'Prevents split ends and reduces friction when combing or styling'
    ],
    richIn: ['Biotin (Vitamin B7)', 'Vitamin E (Tocopherol)', 'Oleic Acid', 'Magnesium'],
    usedInProducts: ['organic-botanical-hair-growth-oil', 'zulveen-coconut-almond-deep-moisture', 'zulveen-pure-jojoba-shine-repair']
  },
  {
    id: 'neem',
    name: 'Wild Organic Neem',
    botanicalName: 'Azadirachta Indica',
    origin: 'Bahawalpur & Southern Punjab, Pakistan',
    extraction: 'Slow Herb-Infused Cold-Pressed Oil',
    image: '/images/zulveen-dark-bottle.jpg',
    colorTone: '#2B6852',
    description: 'Harvested from century-old wild neem trees in Bahawalpur. Celebrated as the ultimate botanical scalp purifier, neem naturally eradicates stubborn dandruff flakes, soothes intense scalp itchiness, and restores healthy scalp balance.',
    benefits: [
      'Eliminates dandruff-causing microbial buildup safely and naturally',
      'Instantly relieves acute scalp itching, redness, and irritation',
      'Decongests blocked hair follicles of dried sebum plaques and dead skin',
      'Creates a clean, refreshed, breathable scalp foundation for growth'
    ],
    richIn: ['Nimbin', 'Azadirachtin', 'Quercetin', 'Essential Fatty Acids'],
    usedInProducts: ['zulveen-anti-dandruff-scalp-relief', 'zulveen-family-value-pack-bundle']
  },
  {
    id: 'castor-arandi',
    name: 'Pure Cold-Pressed Castor Oil',
    botanicalName: 'Ricinus Communis (Roghan-e-Arandi)',
    origin: 'Sindh Plains, Pakistan',
    extraction: 'Cold-Pressed from Unroasted Whole Seeds',
    image: '/images/zulveen-light-bottle.jpg',
    colorTone: '#B08D57',
    description: 'Extracted from whole indigenous castor seeds grown along the Indus basin in Sindh. Featuring an exceptional 90% ricinoleic acid profile, it forms an unbreakable moisture seal over dry roots and fragile hairlines.',
    benefits: [
      'Binds deep, lasting moisture directly into follicular root zones',
      'Thickens and fortifies fragile hairlines, temples, and edges',
      'Reduces hair tensile snapping and breakage by up to 80%',
      'Conditions coarse, thick, and difficult-to-manage hair textures'
    ],
    richIn: ['Ricinoleic Acid (90%)', 'Stearic Acid', 'Natural Vitamin E', 'Omega-9 Lipids'],
    usedInProducts: ['organic-botanical-hair-growth-oil', 'zulveen-intense-hair-fall-control', 'zulveen-family-value-pack-bundle']
  }
];
