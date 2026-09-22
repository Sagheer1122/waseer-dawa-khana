import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'organic-botanical-hair-growth-oil',
    name: 'ZULVEEN Herbal Hair Oil',
    subtitle: 'A Product of WASEER Dawa Khana • 100% Pure Herbal Hair Growth & Root Strengthening',
    tag: 'BEST-SELLER • 100% HERBAL',
    tagClass: 'bg-forest text-ivory border-forest',
    category: 'growth',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['growth', 'scalp', 'damage'],
    rating: 4.9,
    reviewCount: 2840,
    basePrice: 1799,
    originalPrice: 2250,
    sizes: [
      { size: 'Dark Bottle (200ml)', price: 1799, label: 'Matte Black Luxury Edition', isPopular: true },
      { size: 'Light Bottle (200ml)', price: 1999, label: 'Crystal Clear Royal Edition' },
      { size: 'Duo Pack (Dark + Light)', price: 3499, label: '2-Bottle Family Pack (Save Rs. 299)' },
    ],
    images: [
      '/images/zulveen-dark-bottle.jpg',
      '/images/zulveen-light-bottle.jpg',
    ],
    description: 'Authentic Unani cold-pressed herbal formula by WASEER Dawa Khana. Formulated with pure French Rosemary, Moroccan Argan, Indian Amla, and nourishing botanical extracts to halt hair fall, strengthen weak roots, eliminate scalp dryness, and stimulate thick, lustrous new hair growth.',
    ritualStory: 'Formulated by WASEER Dawa Khana using centuries-old traditional Unani preparation methods. 100% chemical-free, steroid-free, and mineral oil-free. Every drop delivers pure natural nourishment directly to hair follicles.',
    benefits: [
      'Stops excessive hair fall and strengthens roots from the first 2–3 weeks',
      'Awakens dormant follicles to stimulate thicker, natural new hair growth',
      'Clears scalp dandruff, dryness, and itchiness naturally',
      'Restores mirror-like silky shine and softness without greasy stickiness'
    ],
    ingredientsSummary: 'French Rosemary Leaf Oil, Moroccan Virgin Argan Kernel Oil, Cold-Pressed Amla Extract, Golden Jojoba Seed Oil, Jamaican Black Castor Oil, Non-GMO Vitamin E.',
    ingredientsFull: [
      'Rosmarinus Officinalis (French Rosemary) Leaf Oil*',
      'Argania Spinosa (Virgin Moroccan Argan) Kernel Oil*',
      'Phyllanthus Emblica (Amla) Fruit Extract*',
      'Simmondsia Chinensis (Golden Jojoba) Seed Oil*',
      'Ricinus Communis (Jamaican Black Castor) Seed Oil*',
      'Nigella Sativa (Black Cumin) Seed Oil*',
      'Tocopherol (Non-GMO Vitamin E)'
    ],
    keyBotanicals: [
      {
        name: 'French Wild Rosemary',
        origin: 'Provence, France',
        role: 'Clinically renowned botanical for follicular stimulation & scalp micro-circulation',
      },
      {
        name: 'Cold-Pressed Wild Amla',
        origin: 'Kerala, India',
        role: 'Rich in bio-available Vitamin C to strengthen tensile fiber elasticity and prevent premature graying',
      }
    ],
    usage: {
      step1: 'Section dry or damp hair into four quadrants.',
      step2: 'Dispense 4–6 drops directly along scalp partings using the glass pipette.',
      step3: 'Massage in circular motions for 3–5 minutes. Leave on for at least 45 minutes, or overnight before washing.',
      proTip: 'For beard or dry split ends, warm 2 drops between palms and smooth gently through hair fibers.'
    },
    faqs: [
      {
        question: 'How often should I apply ZULVEEN Herbal Hair Oil?',
        answer: 'For optimal root vitality, apply 2 to 3 times per week as a pre-wash scalp massage treatment.'
      },
      {
        question: 'Will it make my hair look greasy or weighed down?',
        answer: 'Because our formulation utilizes lightweight non-comedogenic golden jojoba as a carrier base, it washes out cleanly without leaving heavy sticky residue.'
      }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Award Winner 2026'
  },
  {
    id: 'prod-2',
    slug: 'zulveen-anti-dandruff-scalp-relief',
    name: 'ZULVEEN Anti-Dandruff & Scalp Relief',
    subtitle: 'A Product of WASEER Dawa Khana • Pure Organic Neem & Australian Tea Tree Infusion',
    tag: 'PURIFYING SCALP DETOX',
    tagClass: 'bg-sage text-ivory border-sage',
    category: 'scalp',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['scalp', 'dryness', 'damage'],
    rating: 4.9,
    reviewCount: 1420,
    basePrice: 1999,
    originalPrice: 2450,
    sizes: [
      { size: 'Light Bottle (200ml)', price: 1999, label: 'Crystal Clear Royal Edition', isPopular: true },
      { size: 'Dark Bottle (200ml)', price: 1799, label: 'Matte Black Luxury Edition' },
      { size: 'Duo Pack (Dark + Light)', price: 3499, label: '2-Bottle Family Pack (Save Rs. 299)' },
    ],
    images: [
      '/images/zulveen-light-bottle.jpg',
      '/images/zulveen-dark-bottle.jpg',
    ],
    description: 'A cooling, purifying Unani scalp therapy formulated with wild neem leaves, organic Australian tea tree, and refreshing peppermint. Naturally eliminates stubborn dandruff flakes, balances excess sebum, and relieves intense scalp itchiness.',
    ritualStory: 'Crafted at WASEER Dawa Khana by slow-infusing cold-pressed organic oils with hand-selected antibacterial herbs to restore microbial tranquility to distressed scalps.',
    benefits: [
      'Eliminates 99% of dry & oily dandruff flakes within 2 weeks of use',
      'Instantly relieves scalp itching and inflammatory irritation with cooling botanicals',
      'Regulates overactive oil glands while deeply moisturizing dry hair strands',
      'Purifies clogged hair pores to prevent flake buildup and fungal scalp issues'
    ],
    ingredientsSummary: 'Organic Australian Tea Tree Oil, Cold-Pressed Neem Seed Oil, Peppermint Leaf Oil, Rosemary Extract, Jojoba Carrier Base.',
    ingredientsFull: [
      'Melaleuca Alternifolia (Tea Tree) Leaf Oil*',
      'Azadirachta Indica (Neem) Seed Oil*',
      'Mentha Piperita (Peppermint) Leaf Oil*',
      'Rosmarinus Officinalis Leaf Extract*',
      'Simmondsia Chinensis Seed Oil*',
      'Tocopherol (Vitamin E)'
    ],
    keyBotanicals: [
      {
        name: 'Australian Tea Tree',
        origin: 'New South Wales, Australia',
        role: 'Natural antibacterial and antifungal powerhouse to decongest scalp pores and eliminate flakes',
      },
      {
        name: 'Organic Wild Neem',
        origin: 'Punjab, Pakistan',
        role: 'Ancient Ayurvedic purifier revered for eradicating microbial scalp irritation',
      }
    ],
    usage: {
      step1: 'Part hair into sections and apply 5–8 drops onto the dry scalp before washing.',
      step2: 'Massage thoroughly for 4 minutes with your fingertips.',
      step3: 'Leave on for 30–45 minutes, then wash with a gentle herbal shampoo.'
    },
    faqs: [
      {
        question: 'Does this oil have a strong chemical smell?',
        answer: 'Not at all. It features a crisp, natural herbal aroma of pure tea tree and invigorating mint.'
      }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-3',
    slug: 'zulveen-intense-hair-fall-control',
    name: 'ZULVEEN Intense Hair Fall Control Elixir',
    subtitle: 'A Product of WASEER Dawa Khana • Ayurvedic Shikakai, Reetha & Fenugreek Fortifier',
    tag: 'HAIR FALL SHIELD',
    tagClass: 'bg-forest text-ivory border-forest',
    category: 'growth',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['growth', 'damage', 'scalp'],
    rating: 4.9,
    reviewCount: 1890,
    basePrice: 1799,
    originalPrice: 2250,
    sizes: [
      { size: 'Dark Bottle (200ml)', price: 1799, label: 'Matte Black Luxury Edition', isPopular: true },
      { size: 'Light Bottle (200ml)', price: 1999, label: 'Crystal Clear Royal Edition' },
      { size: 'Duo Pack (Dark + Light)', price: 3499, label: '2-Bottle Family Pack (Save Rs. 299)' },
    ],
    images: [
      '/images/zulveen-dark-bottle.jpg',
      '/images/zulveen-light-bottle.jpg',
    ],
    description: 'A concentrated root-anchoring herbal infusion engineered to halt extreme shedding and hair breakage. Powered by wild Shikakai, Reetha, Fenugreek (Methi Dana), and Castor oil to reinforce follicular grip and reconstruct brittle hair shafts.',
    ritualStory: 'Prepared in small artisanal batches following classic Unani pharmacopoeia traditions, ensuring active phytonutrients penetrate deep into the dermal papilla.',
    benefits: [
      'Reduces hair breakage by up to 85% during brushing and washing',
      'Anchors weak hair roots firmly inside follicles with rich botanical proteins',
      'Replenishes natural keratin lipids to prevent split ends and fragile snapping',
      'Provides visible strand thickening within 30 days of consistent ritual'
    ],
    ingredientsSummary: 'Shikakai Bark Extract, Reetha Nut Oil, Methi Dana (Fenugreek) Oil, Jamaican Black Castor, Sweet Almond Carrier.',
    ingredientsFull: [
      'Acacia Concinna (Shikakai) Extract*',
      'Trigonella Foenum-Graecum (Fenugreek) Seed Oil*',
      'Sapindus Mukorossi (Reetha) Seed Oil*',
      'Ricinus Communis (Castor) Seed Oil*',
      'Prunus Amygdalus Dulcis (Almond) Oil*',
      'Tocopherol'
    ],
    keyBotanicals: [
      {
        name: 'Fenugreek (Methi Dana)',
        origin: 'Multan, Pakistan',
        role: 'Packed with natural lecithin and proteins to rebuild hair shaft structure and anchor roots',
      }
    ],
    usage: {
      step1: 'Warm 6–8 drops between clean palms.',
      step2: 'Massage into root zones and lightly coat hair strands down to the tips.',
      step3: 'Leave overnight or at least 1 hour before showering.'
    },
    faqs: [
      {
        question: 'How quickly does it stop hair fall?',
        answer: 'Most users observe a marked reduction in daily hair shedding after 14 to 21 days of regular 3x weekly application.'
      }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-4',
    slug: 'zulveen-black-cumin-kalonji-fortifier',
    name: 'ZULVEEN Black Cumin (Kalonji) Fortifier',
    subtitle: 'A Product of WASEER Dawa Khana • Pure Cold-Pressed Nigella Sativa for Thinning Hair',
    tag: 'ANCIENT THICKENER',
    tagClass: 'bg-gold text-earth border-gold',
    category: 'growth',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['growth', 'scalp', 'damage'],
    rating: 4.9,
    reviewCount: 1650,
    basePrice: 1999,
    originalPrice: 2450,
    sizes: [
      { size: 'Light Bottle (200ml)', price: 1999, label: 'Crystal Clear Royal Edition', isPopular: true },
      { size: 'Dark Bottle (200ml)', price: 1799, label: 'Matte Black Luxury Edition' },
      { size: 'Duo Pack (Dark + Light)', price: 3499, label: '2-Bottle Family Pack (Save Rs. 299)' },
    ],
    images: [
      '/images/zulveen-light-bottle.jpg',
      '/images/zulveen-dark-bottle.jpg',
    ],
    description: 'A regal, bio-active elixir formulated with Egyptian and indigenous cold-pressed Kalonji (Black Cumin) seeds. Rich in natural thymoquinone to stimulate dormant hair follicles, densify widening crown part lines, and fortify fragile thinning strands.',
    ritualStory: 'Kalonji has been celebrated for centuries across Unani and prophetic traditions as a universal revitalizer for vitality and strength.',
    benefits: [
      'High concentrations of thymoquinone to protect cellular follicle health',
      'Fills in thinning temple zones and widening crown part lines naturally',
      'Strengthens fine, thinning baby hair into thick, resilient hair shafts',
      'Imparts deep, dark luster and shields hair from environmental aging'
    ],
    ingredientsSummary: '100% Cold-Pressed Nigella Sativa (Kalonji) Seed Oil, Cedarwood Essential Oil, Rosemary CO2 Extract, Golden Jojoba Carrier.',
    ingredientsFull: [
      'Nigella Sativa (Black Cumin) Seed Oil*',
      'Cedrus Atlantica Bark Oil*',
      'Rosmarinus Officinalis Extract*',
      'Simmondsia Chinensis Seed Oil*',
      'Tocopherol (Vitamin E)'
    ],
    keyBotanicals: [
      {
        name: 'Pure Cold-Pressed Kalonji',
        origin: 'Nile Valley & Cholistan',
        role: 'Abundant in thymoquinone and essential omegas to reverse follicle miniaturization',
      }
    ],
    usage: {
      step1: 'Warm 5 drops directly on fingertips.',
      step2: 'Target thinning crown, temple areas, or receding part lines.',
      step3: 'Massage gently for 5 minutes. Best applied overnight.'
    },
    faqs: [
      {
        question: 'Can men use this for thinning hair and beard growth?',
        answer: 'Yes! ZULVEEN Kalonji Fortifier is completely unisex and works exceptionally well for both scalp and patchy beards.'
      }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-5',
    slug: 'zulveen-coconut-almond-deep-moisture',
    name: 'ZULVEEN Coconut & Almond Deep Moisture',
    subtitle: 'A Product of WASEER Dawa Khana • Intense Lipid Therapy for Dry, Rough & Damaged Strands',
    tag: 'ULTRA-HYDRATING',
    tagClass: 'bg-olive text-ivory border-olive',
    category: 'repair',
    hairTypes: ['wavy', 'curly', 'coily', 'all'],
    concerns: ['dryness', 'damage', 'frizz'],
    rating: 4.8,
    reviewCount: 980,
    basePrice: 1799,
    originalPrice: 2250,
    sizes: [
      { size: 'Dark Bottle (200ml)', price: 1799, label: 'Matte Black Luxury Edition', isPopular: true },
      { size: 'Light Bottle (200ml)', price: 1999, label: 'Crystal Clear Royal Edition' },
      { size: 'Duo Pack (Dark + Light)', price: 3499, label: '2-Bottle Family Pack (Save Rs. 299)' },
    ],
    images: [
      '/images/zulveen-dark-bottle.jpg',
      '/images/zulveen-light-bottle.jpg',
    ],
    description: 'An indulgent, velvety moisture treatment blending raw cold-pressed virgin coconut oil, sweet California almond oil, and pure sesame extract. Saturates porous, chemically treated, or heat-damaged cuticles to banish roughness and restore silky softness.',
    ritualStory: 'Slow-infused at WASEER Dawa Khana at gentle temperatures to protect the rich lauric and oleic fatty acids from oxidation.',
    benefits: [
      'Penetrates deep into the hair cortex to halt protein loss in porous hair',
      'Transforms rough, straw-like strands into liquid silk and touchable softness',
      'Calms stubborn frizz, flyaways, and humidity-induced puffiness',
      'Deeply conditions sun-damaged, bleached, or colored hair'
    ],
    ingredientsSummary: 'Raw Cold-Pressed Virgin Coconut Oil, Sweet Almond Oil, Sesame Seed Oil, Vitamin E.',
    ingredientsFull: [
      'Cocos Nucifera (Virgin Coconut) Oil*',
      'Prunus Amygdalus Dulcis (Sweet Almond) Oil*',
      'Sesamum Indicum (Sesame) Seed Oil*',
      'Tocopherol (Natural Vitamin E)'
    ],
    keyBotanicals: [
      {
        name: 'Virgin Cold-Pressed Coconut',
        origin: 'Sri Lanka',
        role: 'Low molecular weight lipid that penetrates into the hair cortex to prevent protein degradation',
      }
    ],
    usage: {
      step1: 'Warm a generous pump between hands.',
      step2: 'Work evenly through lengths and dry ends.',
      step3: 'Leave on for 1 hour or overnight as a hot oil towel wrap for salon-grade softness.'
    },
    faqs: [
      {
        question: 'Will this feel heavy on fine hair?',
        answer: 'Use 2–3 drops on fine hair for a light conditioning effect, or apply generously before shampooing as an intensive rinse-off mask.'
      }
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'prod-6',
    slug: 'zulveen-pure-jojoba-shine-repair',
    name: 'ZULVEEN Pure Jojoba & Shine Repair Nectar',
    subtitle: 'A Product of WASEER Dawa Khana • Weightless Finishing Nectar for Mirror Gloss & Frizz Control',
    tag: 'FEATHERLIGHT GLOSS',
    tagClass: 'bg-gold text-earth border-gold',
    category: 'daily',
    hairTypes: ['straight', 'wavy', 'curly', 'all'],
    concerns: ['shine', 'frizz', 'dryness'],
    rating: 4.9,
    reviewCount: 1120,
    basePrice: 1999,
    originalPrice: 2450,
    sizes: [
      { size: 'Light Bottle (200ml)', price: 1999, label: 'Crystal Clear Royal Edition', isPopular: true },
      { size: 'Dark Bottle (200ml)', price: 1799, label: 'Matte Black Luxury Edition' },
      { size: 'Duo Pack (Dark + Light)', price: 3499, label: '2-Bottle Family Pack (Save Rs. 299)' },
    ],
    images: [
      '/images/zulveen-light-bottle.jpg',
      '/images/zulveen-dark-bottle.jpg',
    ],
    description: 'An ultra-light, non-greasy finishing elixir crafted with 100% pure Sonoran golden jojoba and camellia flower nectar. Seamlessly mimics natural scalp sebum to seal split ends, tame flyaways, and impart a luminous glass-like shine without weighing hair down.',
    ritualStory: 'Harvested from organic desert jojoba bushes and cold-filtered to perfection at WASEER Dawa Khana for daily effortless hair styling.',
    benefits: [
      'Gives instant glass-hair mirror shine without sticky or greasy residue',
      'Biocompatible with natural scalp sebum for immediate, weightless absorption',
      'Protects strands against thermal heat styling and daily environmental UV rays',
      'Smooths split ends and seals cuticle scales for effortlessly sleek styling'
    ],
    ingredientsSummary: 'Organic Golden Jojoba Seed Oil, Japanese Camellia Seed Oil, Natural Bergamot Essence, Vitamin E.',
    ingredientsFull: [
      'Simmondsia Chinensis (Golden Jojoba) Seed Oil*',
      'Camellia Japonica Seed Oil*',
      'Citrus Aurantium Bergamia Peel Oil*',
      'Tocopherol'
    ],
    keyBotanicals: [
      {
        name: 'Sonoran Golden Jojoba',
        origin: 'Sonora Desert',
        role: 'Pure biomimetic liquid wax that delivers weightless moisture and brilliant light reflection',
      }
    ],
    usage: {
      step1: 'Dispense 1 to 2 drops onto dry fingertips.',
      step2: 'Lightly smooth over styled hair surface and split ends.',
      step3: 'Enjoy all-day frizz-free glass shine.'
    },
    faqs: [
      {
        question: 'Can I apply this after washing and blow-drying?',
        answer: 'Yes! It is specifically formulated as a daily leave-in shine finisher on dry or damp hair.'
      }
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'prod-7',
    slug: 'zulveen-family-value-pack-bundle',
    name: 'ZULVEEN 2-Bottle Family Value Pack (2 x 200ml)',
    subtitle: 'A Product of WASEER Dawa Khana • Complete 3-Month Intensive Hair Transformation Course',
    tag: 'SAVE 25% • BEST VALUE',
    tagClass: 'bg-forest text-gold border-forest',
    category: 'bundles',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['growth', 'scalp', 'damage', 'frizz', 'shine'],
    rating: 5.0,
    reviewCount: 890,
    basePrice: 3499,
    originalPrice: 4200,
    sizes: [
      { size: 'Duo Pack (Dark + Light)', price: 3499, label: 'Complete 2-Bottle Set (Dark + Light)', isPopular: true },
      { size: '2x Dark Bottles (400ml)', price: 3399, label: 'Twin Matte Black Pack' },
      { size: '2x Light Bottles (400ml)', price: 3699, label: 'Twin Crystal Clear Pack' }
    ],
    images: [
      '/images/zulveen-light-bottle.jpg',
      '/images/zulveen-dark-bottle.jpg',
    ],
    description: 'The ultimate 3-month comprehensive botanical hair revitalization course. Contains two full-size 200ml bottles of ZULVEEN Herbal Hair Oil by WASEER Dawa Khana at a direct 25% saving. Guaranteed authentic herbal nourishment for long-term root strength and thick hair growth.',
    ritualStory: 'Recommended by traditional hakims as a full 90-day biological hair cycle regimen to awaken dormant roots, reverse hair thinning, and secure lifetime follicle resilience.',
    benefits: [
      'Full 90-day hair regrowth and root fortification course (400ml total)',
      'Saves Rs. 1,450 compared to purchasing individual bottles separately',
      'Shared household family pack suitable for both men and women',
      'Free priority nationwide courier delivery included'
    ],
    ingredientsSummary: 'Complete multi-botanical spectrum: French Rosemary, Moroccan Argan, Indian Amla, Black Cumin, Golden Jojoba, Jamaican Castor.',
    ingredientsFull: [
      'Complete formulation of ZULVEEN Herbal Hair Oil (Double Pack).'
    ],
    keyBotanicals: [
      {
        name: 'The ZULVEEN Master Formula',
        origin: 'WASEER Dawa Khana Signature Blend',
        role: 'Synergistic combination of cold-pressed unani herbs and precious botanical oils',
      }
    ],
    usage: {
      step1: 'Month 1: Apply 3x weekly to stop active hair fall and detoxify scalp pores.',
      step2: 'Month 2: Regular massage awakens dormant baby hair follicles.',
      step3: 'Month 3: Continuous nourishment thickens hair strands into strong, lustrous hair.'
    },
    faqs: [
      {
        question: 'How long will this 2-bottle pack last?',
        answer: 'With regular 2 to 3 times weekly application, two 200ml bottles provide a generous 3 to 4 months of complete scalp therapy.'
      }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Best Value System'
  }
];
