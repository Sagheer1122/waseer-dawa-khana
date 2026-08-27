import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'organic-botanical-hair-growth-oil',
    name: 'Organic Botanical Scalp & Hair Growth Elixir',
    subtitle: 'Cold-pressed French rosemary & Jamaican black castor root stimulation',
    tag: 'SIGNATURE BESTSELLER',
    tagClass: 'bg-forest text-ivory border-forest',
    category: 'growth',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['growth', 'scalp', 'damage'],
    rating: 4.9,
    reviewCount: 1428,
    basePrice: 2499,
    originalPrice: 2999,
    sizes: [
      { size: '50ml', price: 2499, label: 'Travel / Starter' },
      { size: '100ml', price: 3999, label: 'Standard Ritual (Most Popular)', isPopular: true },
      { size: '150ml', price: 5499, label: 'Ritualist Deluxe' },
    ],
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'An invigorating multi-correctional scalp treatment crafted with wild-harvested French rosemary, cold-pressed Jamaican black castor oil, and desert golden jojoba. Formulated to stimulate follicular micro-circulation, soothe inflammation, and fortify roots for noticeably denser, resilient hair.',
    ritualStory: 'Handcrafted in small artisan batches using traditional single-press cold extraction. No hexane, no synthetic preservatives, and zero dilution. Every single drop retains the full bio-active lipid matrix of living plants.',
    benefits: [
      'Stimulates micro-circulation at dormant hair roots to encourage active growth phases',
      'Visibly reduces shedding, brush breakage, and split cuticle unraveling',
      'Deeply calms itchy, flaky, or tight scalp environments without greasy residue',
      'Unisex ritual oil that leaves strands soft, voluminous, and naturally lustrous'
    ],
    ingredientsSummary: 'French Rosemary Oil, Jamaican Black Castor Oil, Golden Jojoba Seed Oil, Cold-Pressed Virgin Moroccan Argan Oil, Organic Amla Extract, Non-GMO Sunflower Vitamin E.',
    ingredientsFull: [
      'Rosmarinus Officinalis (French Rosemary) Leaf Oil*',
      'Ricinus Communis (Jamaican Black Castor) Seed Oil*',
      'Simmondsia Chinensis (Golden Jojoba) Seed Oil*',
      'Argania Spinosa (Virgin Moroccan Argan) Kernel Oil*',
      'Phyllanthus Emblica (Amla) Fruit Extract*',
      'Nigella Sativa (Black Cumin) Seed Oil*',
      'Tocopherol (Non-GMO Vitamin E)',
      'Cedrus Atlantica (Atlas Cedarwood) Bark Oil*'
    ],
    keyBotanicals: [
      {
        name: 'French Wild Rosemary',
        origin: 'Provence, France',
        role: 'Clinically renowned botanical for follicular stimulation & scalp invigorating micro-circulation',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Jamaican Black Castor',
        origin: 'St. Thomas, Jamaica',
        role: 'Dense ricinoleic acid profile that locks moisture at the root and strengthens tensile elasticity',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80'
      }
    ],
    usage: {
      step1: 'Section dry or damp hair into four quadrants.',
      step2: 'Dispense 4–6 drops directly along scalp partings using the glass pipette.',
      step3: 'Massage in circular motions for 3–5 minutes. Leave on for 30 minutes, or overnight before your wash.',
      proTip: 'For beard or dry ends, warm 2 drops between palms and smooth gently through hair fibers.'
    },
    faqs: [
      {
        question: 'How often should I apply this hair growth oil?',
        answer: 'For optimal root vitality, we recommend using it 2 to 3 times per week as a pre-wash scalp massage treatment.'
      },
      {
        question: 'Will it make fine hair look greasy or weighed down?',
        answer: 'Because our formula uses non-comedogenic golden jojoba as a carrier base, it washes out cleanly with normal shampoo without leaving heavy residue.'
      }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Award Winner 2025'
  },
  {
    id: 'prod-2',
    slug: 'restorative-argan-jojoba-gloss-elixir',
    name: 'Restorative Argan & Jojoba Cuticle Gloss Elixir',
    subtitle: 'Weightless lipid recovery & anti-frizz mirror shine',
    tag: 'EDITOR CHOICE',
    tagClass: 'bg-gold text-earth border-gold',
    category: 'repair',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['dryness', 'damage', 'frizz', 'shine'],
    rating: 4.8,
    reviewCount: 914,
    basePrice: 2899,
    originalPrice: 3499,
    sizes: [
      { size: '50ml', price: 2899, label: 'Travel Flacon' },
      { size: '100ml', price: 4499, label: 'Standard Ritual', isPopular: true },
      { size: '150ml', price: 5999, label: 'Ritualist Value' },
    ],
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'First cold-pressed virgin Moroccan argan oil blended with Japanese camellia seed and golden meadowfoam. Instantly restores lost moisture to brittle cuticles, tames humidity-induced frizz, and leaves hair glowing with natural, weightless light.',
    ritualStory: 'Harvested by women’s fair-trade cooperatives in the Atlas Mountains of Morocco, gently cold-pressed without heat to preserve natural polyphenols and fatty acids.',
    benefits: [
      'Instantly tames frizzy flyaways and seals splintered cuticles',
      'Protects strands from daily environmental UV and thermal styling stressors',
      'Leaves hair with a silky, non-sticky finish that reflects luminous natural light'
    ],
    ingredientsSummary: 'Organic Virgin Argan Kernel Oil, Golden Jojoba Seed Oil, Camellia Oleifera Seed Oil, Meadowfoam Seed Oil, Italian Bergamot Peel Oil.',
    ingredientsFull: [
      'Argania Spinosa (Virgin Argan) Kernel Oil*',
      'Simmondsia Chinensis (Golden Jojoba) Seed Oil*',
      'Camellia Oleifera (Tea Seed) Oil*',
      'Limnanthes Alba (Meadowfoam) Seed Oil',
      'Citrus Aurantium Bergamia (Bergamot) Peel Oil*',
      'Tocopherol (Vitamin E)'
    ],
    keyBotanicals: [
      {
        name: 'Virgin Moroccan Argan',
        origin: 'Agadir, Morocco',
        role: 'Rich in vitamin E and essential fatty acids to deeply lubricate hair shafts and resist breakage',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80'
      }
    ],
    usage: {
      step1: 'Warm 2 to 3 drops thoroughly between palms.',
      step2: 'Glide hands down the mid-lengths to ends of towel-dried or dry styled hair.',
      step3: 'Style as usual for mirror-smooth shine.'
    },
    faqs: [
      {
        question: 'Can I use this oil before blow drying?',
        answer: 'Yes! Applying 2-3 drops to damp hair creates a protective plant lipid barrier that guards against thermal moisture loss.'
      }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-3',
    slug: 'clarifying-rosemary-tea-tree-scalp-detox',
    name: 'Clarifying Rosemary & Tea Tree Scalp Detox Drops',
    subtitle: 'Deep purifying scalp therapy for balance & flake relief',
    tag: 'PURIFYING',
    tagClass: 'bg-sage text-ivory border-sage',
    category: 'scalp',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['scalp', 'dryness', 'growth'],
    rating: 4.9,
    reviewCount: 680,
    basePrice: 2699,
    sizes: [
      { size: '50ml', price: 2699, label: 'Starter' },
      { size: '100ml', price: 4199, label: 'Standard Ritual', isPopular: true },
      { size: '150ml', price: 5699, label: 'Ritualist Value' },
    ],
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A cooling, prebiotic botanical oil formulated with organic Australian tea tree, peppermint, and clarifying rosemary. Dissolves excess sebum, melts product buildup, and restores microbial tranquility to irritated scalps.',
    ritualStory: 'Formulated specifically to reset the scalp biome after workouts, dry weather, or heavy styling product use.',
    benefits: [
      'Purifies follicular pores of dead skin cells and dry product residue',
      'Delivers an immediate cooling, tingly botanical sensation that relieves scalp itch',
      'Balances oily root zones while keeping length moisturized'
    ],
    ingredientsSummary: 'Organic Australian Tea Tree Oil, Peppermint Leaf Oil, Rosemary Extract, Neem Seed Oil, Golden Jojoba Carrier.',
    ingredientsFull: [
      'Simmondsia Chinensis (Jojoba) Seed Oil*',
      'Melaleuca Alternifolia (Tea Tree) Leaf Oil*',
      'Rosmarinus Officinalis (Rosemary) Leaf Oil*',
      'Mentha Piperita (Peppermint) Oil*',
      'Azadirachta Indica (Neem) Seed Oil*',
      'Tocopherol (Vitamin E)'
    ],
    keyBotanicals: [
      {
        name: 'Australian Tea Tree',
        origin: 'New South Wales, Australia',
        role: 'Potent natural antimicrobial botanical to decongest follicles and purify flaky buildup',
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80'
      }
    ],
    usage: {
      step1: 'Part hair into lines and apply 5–8 drops onto the dry scalp before washing.',
      step2: 'Massage vigorously for 4 minutes with your fingertips.',
      step3: 'Leave on for 15–20 minutes, then shampoo thoroughly.'
    },
    faqs: [
      {
        question: 'Will this tingle when applied?',
        answer: 'Yes! Organic peppermint creates a refreshing botanical cooling sensation that signals active micro-circulation.'
      }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-4',
    slug: 'virgin-coconut-amla-deep-moisture-bath',
    name: 'Virgin Coconut & Amla Ayurvedic Moisture Oil',
    subtitle: 'Overnight lipid saturator for thick, coarse & coily strands',
    tag: 'ULTRA-HYDRATING',
    tagClass: 'bg-olive text-ivory border-olive',
    category: 'repair',
    hairTypes: ['wavy', 'curly', 'coily'],
    concerns: ['dryness', 'damage', 'frizz'],
    rating: 4.8,
    reviewCount: 520,
    basePrice: 2399,
    sizes: [
      { size: '50ml', price: 2399, label: 'Standard Flacon' },
      { size: '100ml', price: 3799, label: 'Ritual Size', isPopular: true },
      { size: '150ml', price: 4999, label: 'Salon Size' },
    ],
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'An ancient Ayurvedic-inspired infusion of raw Sri Lankan virgin coconut oil and wild Indian gooseberry (Amla). Penetrates deep into the hair cortex to prevent protein loss and revive dry, porous curls with bounce.',
    ritualStory: 'Slow-infused for 48 hours to draw the full vitamin C and bioflavonoid profile from raw Amla berries.',
    benefits: [
      'Significantly reduces protein loss in vulnerable, porous hair strands',
      'Defines natural curl clump patterns without crunch or stiffness',
      'Intensely softens rough textures and strengthens against comb friction'
    ],
    ingredientsSummary: 'Raw Cold-Pressed Virgin Coconut Oil, Wild Amla Berry Extract, Sweet Almond Oil, Sesame Seed Oil.',
    ingredientsFull: [
      'Cocos Nucifera (Virgin Coconut) Oil*',
      'Prunus Amygdalus Dulcis (Sweet Almond) Oil*',
      'Phyllanthus Emblica (Amla) Fruit Extract*',
      'Sesamum Indicum (Sesame) Seed Oil*',
      'Tocopherol'
    ],
    keyBotanicals: [
      {
        name: 'Wild Amla (Indian Gooseberry)',
        origin: 'Kerala, India',
        role: 'Concentrated source of natural vitamin C to strengthen strand tensile core',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80'
      }
    ],
    usage: {
      step1: 'Warm a generous amount between hands.',
      step2: 'Apply from mid-lengths to ends, then work upward into the scalp.',
      step3: 'Leave on for 45 minutes or overnight. Wash with shampoo.'
    },
    faqs: [
      {
        question: 'Is this suitable for low porosity hair?',
        answer: 'Yes! Warming the oil slightly before application helps the lipid molecules easily penetrate low porosity cuticles.'
      }
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'prod-5',
    slug: 'pure-golden-jojoba-daily-nourishing-oil',
    name: 'Pure Sonoran Golden Jojoba Balancing Nectar',
    subtitle: '100% pure cold-pressed multi-use hair, beard & scalp nectar',
    tag: 'MINIMALIST PURE',
    tagClass: 'bg-earth text-ivory border-earth',
    category: 'daily',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['shine', 'scalp', 'dryness'],
    rating: 4.9,
    reviewCount: 780,
    basePrice: 2199,
    sizes: [
      { size: '50ml', price: 2199, label: 'Starter' },
      { size: '100ml', price: 3499, label: 'Standard Ritual', isPopular: true },
      { size: '150ml', price: 4699, label: 'Value Flacon' },
    ],
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'First cold-pressed golden jojoba liquid wax from wild Sonoran desert shrubs. Biocompatible with natural human sebum, it absorbs instantly to balance oily roots while conditioning dry ends.',
    ritualStory: 'Directly sourced from organic family growers in the Arizona desert, cold-pressed within 24 hours of harvest.',
    benefits: [
      'Biomimetic carrier that closely mimics natural scalp sebum',
      'Absorbs in seconds without leaving a greasy sheen or heavy film',
      'Versatile 3-in-1 oil for hair styling, scalp massage, and beard conditioning'
    ],
    ingredientsSummary: '100% Pure Organic Cold-Pressed Golden Jojoba Seed Oil (Simmondsia Chinensis). Single Ingredient.',
    ingredientsFull: ['100% Simmondsia Chinensis (Golden Jojoba) Seed Oil*'],
    keyBotanicals: [
      {
        name: 'Golden Jojoba Seed',
        origin: 'Sonoran Desert, Arizona',
        role: 'Pure biomimetic liquid wax that delivers clean, weightless moisture balance',
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80'
      }
    ],
    usage: {
      step1: 'Dispense 2–4 drops into clean hands.',
      step2: 'Work through damp or dry hair from ears downward.',
      step3: 'Can also be massaged into facial beard hair and cuticles.'
    },
    faqs: [
      {
        question: 'Is this completely fragrance-free?',
        answer: 'Yes! It has only a natural, very faint nutty aroma of pure raw cold-pressed golden jojoba seeds.'
      }
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'prod-6',
    slug: 'black-cumin-kalonji-root-fortifier',
    name: 'Cold-Pressed Black Cumin (Kalonji) Root Fortifier',
    subtitle: 'Nigella sativa & fenugreek seed oil for weak, thinning hair',
    tag: 'ANCIENT FORTIFIER',
    tagClass: 'bg-forest text-ivory border-forest',
    category: 'growth',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['growth', 'scalp', 'damage'],
    rating: 4.9,
    reviewCount: 460,
    basePrice: 2599,
    sizes: [
      { size: '50ml', price: 2599, label: 'Starter' },
      { size: '100ml', price: 3999, label: 'Standard Ritual', isPopular: true },
      { size: '150ml', price: 5299, label: 'Deluxe' },
    ],
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A potent, rich therapeutic elixir powered by Egyptian black seed (Nigella Sativa) and cold-extracted fenugreek. Packed with natural thymoquinone to fortify thinning partings and strengthen fragile hair strands against stress-related shedding.',
    ritualStory: 'Kalonji oil has been revered for millennia in Mediterranean and Middle Eastern herbal traditions for its profound strengthening bioactives.',
    benefits: [
      'High concentrations of natural thymoquinone to protect follicular health',
      'Strengthens fine, thinning hair roots against excessive daily shedding',
      'Nourishes the scalp barrier with rich essential fatty acids'
    ],
    ingredientsSummary: 'Egyptian Black Seed (Kalonji) Oil, Fenugreek Seed Extract, Golden Jojoba, Rosemary Co2, Atlas Cedarwood.',
    ingredientsFull: [
      'Nigella Sativa (Black Cumin) Seed Oil*',
      'Trigonella Foenum-Graecum (Fenugreek) Seed Extract*',
      'Simmondsia Chinensis (Jojoba) Seed Oil*',
      'Rosmarinus Officinalis Extract*',
      'Tocopherol'
    ],
    keyBotanicals: [
      {
        name: 'Egyptian Black Cumin',
        origin: 'Nile Valley, Egypt',
        role: 'Ancient herbal super-seed rich in thymoquinone and omega fatty acids for root strength',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80'
      }
    ],
    usage: {
      step1: 'Warm 4–6 drops in fingertips.',
      step2: 'Target thinning zones or receding part lines directly.',
      step3: 'Massage for 5 minutes. Leave on for at least 1 hour before washing.'
    },
    faqs: [
      {
        question: 'What does black cumin oil smell like?',
        answer: 'It possesses a rich, earthy, herbal aroma that dissipates naturally when rinsed.'
      }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-7',
    slug: 'prickly-pear-marula-weightless-shine-nectar',
    name: 'Prickly Pear & African Marula Weightless Shine Nectar',
    subtitle: 'Ultra-lightweight antioxidant finishing oil for mirror gloss',
    tag: 'FEATHERLIGHT GLOSS',
    tagClass: 'bg-gold text-earth border-gold',
    category: 'daily',
    hairTypes: ['straight', 'wavy', 'curly', 'all'],
    concerns: ['shine', 'frizz', 'dryness'],
    rating: 4.9,
    reviewCount: 380,
    basePrice: 2999,
    sizes: [
      { size: '50ml', price: 2999, label: 'Starter' },
      { size: '100ml', price: 4699, label: 'Standard Ritual', isPopular: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Cold-pressed Moroccan prickly pear seed oil combined with Namibian wild marula. Contains the highest concentration of botanical vitamin E and sterols of any cosmetic oil, imparting glass-like shine with absolute zero weight.',
    ritualStory: 'It takes one ton of prickly pear fruit to produce one single liter of this precious golden oil, cold-pressed with surgical precision.',
    benefits: [
      'Delivers an ultra-lightweight glass finish that never collapses fine hair',
      'Rich in natural sterols that lock in hydration without residue',
      'Tames static electricity and flyaways on dry, blow-dried styles'
    ],
    ingredientsSummary: 'Organic Prickly Pear Seed Oil, Wild Marula Oil, Camellia Seed Oil, Natural Neroli Blossom Extract.',
    ingredientsFull: [
      'Opuntia Ficus-Indica (Prickly Pear) Seed Oil*',
      'Sclerocarya Birrea (Marula) Seed Oil*',
      'Camellia Japonica Seed Oil*',
      'Citrus Aurantium (Neroli) Flower Extract',
      'Tocopherol'
    ],
    keyBotanicals: [
      {
        name: 'Prickly Pear Seed',
        origin: 'Guelmim, Morocco',
        role: 'Precious antioxidant oil with the highest natural vitamin E concentration for light reflection',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80'
      }
    ],
    usage: {
      step1: 'Dispense 1 to 2 drops onto fingertips.',
      step2: 'Lightly graze over styled hair surface and split ends.',
      step3: 'Enjoy instant mirror shine with zero greasiness.'
    },
    faqs: [
      {
        question: 'Is this suitable for very fine hair?',
        answer: 'Yes! This is our most featherweight formulation, designed specifically for fine and medium strands.'
      }
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'prod-8',
    slug: 'wild-french-lavender-night-scalp-elixir',
    name: 'French Wild Lavender & Primrose Overnight Scalp Elixir',
    subtitle: 'Calming bedtime botanical treatment for overnight follicle rejuvenation',
    tag: 'NIGHT RECOVERY',
    tagClass: 'bg-sage text-ivory border-sage',
    category: 'scalp',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['scalp', 'dryness', 'damage'],
    rating: 4.8,
    reviewCount: 310,
    basePrice: 2799,
    sizes: [
      { size: '50ml', price: 2799, label: 'Starter' },
      { size: '100ml', price: 4399, label: 'Standard Ritual', isPopular: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'An aromatherapeutic bedtime scalp oil formulated with high-altitude Provence lavender, organic evening primrose, and soothing chamomile. Deeply repairs tension from tight hairstyles while encouraging sound, restful sleep.',
    ritualStory: 'Distilled from wild lavender flowers grown at 1,200 meters in the French Alps for maximum calming ester content.',
    benefits: [
      'Relieves scalp tightness and tension from braids, buns, and ponytails',
      'Deeply conditions the scalp lipid barrier while you sleep',
      'Pure therapeutic lavender and chamomile scent promotes evening relaxation'
    ],
    ingredientsSummary: 'French Lavender Essential Oil, Evening Primrose Oil, German Chamomile, Golden Jojoba, Sweet Almond Carrier.',
    ingredientsFull: [
      'Lavandula Angustifolia (Lavender) Flower Oil*',
      'Oenothera Biennis (Evening Primrose) Oil*',
      'Matricaria Chamomilla (Chamomile) Flower Oil*',
      'Simmondsia Chinensis (Jojoba) Seed Oil*',
      'Prunus Amygdalus Dulcis (Sweet Almond) Oil*',
      'Tocopherol'
    ],
    keyBotanicals: [
      {
        name: 'High-Altitude French Lavender',
        origin: 'Provence, France',
        role: 'Calming botanical with natural linalool to soothe scalp irritation and promote restful sleep',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=400&q=80'
      }
    ],
    usage: {
      step1: 'Apply 4–6 drops before bedtime.',
      step2: 'Massage into scalp and breathe in the natural calming herbal scent.',
      step3: 'Sleep with hair loose or in a silk bonnet. Wash in the morning if desired.'
    },
    faqs: [
      {
        question: 'Will it stain pillowcases?',
        answer: 'Our fast-absorbing carrier base absorbs deeply into the scalp within 10 minutes. A silk bonnet is recommended for maximum moisture retention.'
      }
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'prod-9',
    slug: 'the-complete-hair-transformation-trio-bundle',
    name: 'The Complete Hair Transformation Trio Bundle',
    subtitle: 'Growth Elixir + Scalp Detox Drops + Cuticle Gloss Set',
    tag: 'SAVE 25% BUNDLE',
    tagClass: 'bg-forest text-gold border-forest',
    category: 'bundles',
    hairTypes: ['straight', 'wavy', 'curly', 'coily', 'all'],
    concerns: ['growth', 'scalp', 'damage', 'frizz', 'shine'],
    rating: 5.0,
    reviewCount: 395,
    basePrice: 5999,
    originalPrice: 8097,
    sizes: [
      { size: '3 x 50ml Starter Set', price: 5999, label: 'Starter Trio' },
      { size: '3 x 100ml Full Ritual Set', price: 9499, label: 'Full Ritual Trio (Best Value)', isPopular: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'The ultimate 3-phase botanical hair care master system. Combines our #1 Scalp Growth Elixir (Phase 1: Stimulate), Tea Tree Detox Drops (Phase 2: Clarify), and Argan Cuticle Gloss (Phase 3: Protect & Shine) at a 25% bundled saving.',
    ritualStory: 'Curated by trichologists to provide a complete, synergistic weekly botanical regimen covering scalp prep, follicular stimulation, and cuticle sealing.',
    benefits: [
      'Comprehensive 360-degree hair transformation system covering scalp, roots, and strand tips',
      'Includes Growth Elixir (50ml/100ml), Detox Drops (50ml/100ml), and Argan Gloss (50ml/100ml)',
      'Saves 25% compared to purchasing individual bottles separately',
      'Packaged in an artisanal luxury unboxing gift box with glass droppers'
    ],
    ingredientsSummary: 'Full botanical spectrum: French Rosemary, Jamaican Black Castor, Australian Tea Tree, Moroccan Argan, Sonoran Golden Jojoba, Japanese Camellia.',
    ingredientsFull: [
      'Includes complete ingredients of: Growth Elixir, Scalp Detox, and Cuticle Gloss formulas.'
    ],
    keyBotanicals: [
      {
        name: 'The Botanical Master Trio',
        origin: 'Global Single-Origin Harvests',
        role: 'Synergistic combination of French Rosemary, Australian Tea Tree, and Moroccan Argan',
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80'
      }
    ],
    usage: {
      step1: 'Weekly Detox: Apply Tea Tree Detox to dry scalp 20 mins before your clarifying wash.',
      step2: 'Active Growth: Massage Rosemary Growth Elixir into scalp 2-3x per week.',
      step3: 'Daily Gloss: Smooth 2 drops of Argan Cuticle Gloss onto ends daily for mirror shine.'
    },
    faqs: [
      {
        question: 'How long will this trio set last?',
        answer: 'The 3x50ml set lasts 2 to 3 months with regular use; the 3x100ml set lasts 5 to 6 months.'
      }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Best Value System'
  }
];
