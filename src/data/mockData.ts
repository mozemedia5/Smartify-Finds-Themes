import { Listing, MarketPrice, AgriNews, Expert, CommunityPost, Opportunity, DiseaseDiagnosis } from '../types';

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    sellerId: 'usr_002',
    title: 'Certified Rice Seeds (High Yield Variety)',
    category: 'Seeds',
    subcategory: 'Cereal Seeds',
    price: 15000,
    currency: 'UGX',
    unit: 'kg',
    location: 'Central Agricultural Zone',
    district: 'Eastern Hub',
    region: 'Eastern',
    farmerName: 'John Baptist Okello',
    farmerRole: 'Certified Seed Grower',
    farmerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    isVerified: true,
    phone: '+256 772 123456',
    whatsapp: '256772123456',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600',
      'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600'
    ],
    description: 'High germination rate certified rice seeds optimized for regional agricultural conditions. High drought resistance and up to 35% higher yield potential.',
    specifications: [
      { label: 'Germination Rate', value: '96%' },
      { label: 'Purity Rate', value: '99.2%' },
      { label: 'Maturity Duration', value: '110-120 Days' }
    ],
    usageInfo: 'Sow at a depth of 2-3cm with row spacing of 20cm x 15cm. Recommended seeding rate: 25kg per acre.',
    packagingInfo: 'Sealed moisture-proof 25kg multi-wall paper bags with official certification tag.',
    stockQty: '1,200 kg available',
    stockCount: 1200,
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    condition: 'Certified',
    deliveryAvailable: true,
    type: 'product',
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    sellerId: 'usr_003',
    title: 'Healthy Grafted Lime Seedlings',
    category: 'Seedlings',
    subcategory: 'Fruit Seedlings',
    price: 3000,
    currency: 'UGX',
    unit: 'pc',
    location: 'Central Nursery Station',
    district: 'Central District',
    region: 'Central',
    farmerName: 'Sarah Namubiru',
    farmerRole: 'Nursery Operator',
    farmerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    isVerified: true,
    phone: '+256 701 987654',
    whatsapp: '256701987654',
    images: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600',
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb19657?w=600'
    ],
    description: 'Disease-free, high-fruiting grafted lime seedlings ready for immediate orchard planting. Matures and fruits within 18 months.',
    specifications: [
      { label: 'Variety', value: 'Tahiti Lime Grafted' },
      { label: 'Height', value: '45 - 60 cm' },
      { label: 'Rootstock', value: 'Volkamer Lemon' }
    ],
    usageInfo: 'Plant in well-drained soil holes of 60cm x 60cm x 60cm enriched with well-decomposed organic manure.',
    packagingInfo: 'Individual potted black nursery bags with soil mix.',
    stockQty: '500 pcs available',
    stockCount: 500,
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewsCount: 24,
    featured: true,
    condition: 'New',
    deliveryAvailable: true,
    type: 'product',
    createdAt: '5 hours ago'
  },
  {
    id: '3',
    sellerId: 'usr_004',
    title: '50HP Farm Tractor Hire with Experienced Operator',
    category: 'Machinery',
    subcategory: 'Tractor Hire',
    price: 700000,
    currency: 'UGX',
    unit: 'day',
    location: 'Western Equipment Hub',
    district: 'Western District',
    region: 'Western',
    farmerName: 'AgriMach Services',
    farmerRole: 'Agri Equipment Provider',
    farmerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    isVerified: true,
    phone: '+256 782 555123',
    whatsapp: '256782555123',
    images: [
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600',
      'https://images.unsplash.com/photo-1530267981608-bc70a270d063?w=600'
    ],
    description: 'Heavy duty 50HP 4WD tractor equipped with disc plough and harrow. Includes experienced operator and fuel delivery for farmland preparation.',
    specifications: [
      { label: 'Horsepower', value: '50 HP 4WD' },
      { label: 'Attachments', value: '3-Disc Plough & 16-Disc Harrow' },
      { label: 'Fuel Included', value: 'Yes (Up to 8 hours daily)' }
    ],
    stockQty: '3 Units Available',
    stockCount: 3,
    stockStatus: 'In Stock',
    rating: 5.0,
    reviewsCount: 42,
    featured: true,
    condition: 'Certified',
    deliveryAvailable: true,
    type: 'machinery',
    createdAt: '1 day ago'
  },
  {
    id: '4',
    sellerId: 'usr_005',
    title: 'Hybrid High-Yield Maize Seeds',
    category: 'Seeds',
    subcategory: 'Maize',
    price: 12000,
    currency: 'UGX',
    unit: 'kg',
    location: 'Valley Co-op Station',
    district: 'Valley District',
    region: 'Western',
    farmerName: 'Valley Farmers Co-op',
    farmerRole: 'Seed Cooperative',
    farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isVerified: true,
    phone: '+256 775 888999',
    whatsapp: '256775888999',
    images: [
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600'
    ],
    description: 'Drought-tolerant hybrid maize seed. Suitable for first and second rainy seasons with high cob filling density.',
    stockQty: '800 bags',
    stockCount: 800,
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewsCount: 19,
    condition: 'Certified',
    deliveryAvailable: true,
    type: 'product',
    createdAt: '2 days ago'
  },
  {
    id: '5',
    sellerId: 'usr_006',
    title: 'Professional Crop Spraying & Fumigation Service',
    category: 'Services',
    subcategory: 'Spraying Service',
    price: 45000,
    currency: 'UGX',
    unit: 'acre',
    location: 'Central Agricultural Hub',
    district: 'Central District',
    region: 'Central',
    farmerName: 'AgroCare Pest Services',
    farmerRole: 'Licensed Pest Specialist',
    farmerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    isVerified: true,
    phone: '+256 702 333444',
    whatsapp: '256702333444',
    images: [
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600'
    ],
    description: 'Motorized knapsack and precision drone crop spraying services for commercial grain, vegetable, and orchard farming.',
    stockQty: 'Daily booking open',
    stockCount: 10,
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewsCount: 15,
    condition: 'New',
    deliveryAvailable: true,
    type: 'service',
    createdAt: '3 days ago'
  },
  {
    id: '6',
    sellerId: 'usr_007',
    title: 'Organic NPK & Bio-Fertilizer 50kg Bag',
    category: 'Inputs',
    subcategory: 'Fertilizers',
    price: 135000,
    currency: 'UGX',
    unit: 'bag',
    location: 'Industrial Agro Hub',
    district: 'Industrial District',
    region: 'Eastern',
    farmerName: 'Nile BioAgro',
    farmerRole: 'Fertilizer Manufacturer',
    farmerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150',
    isVerified: true,
    phone: '+256 788 112233',
    whatsapp: '256788112233',
    images: [
      'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600'
    ],
    description: 'Enriched organic bio-fertilizer promoting root development, soil microbial health, and high crop yields.',
    stockQty: '250 bags',
    stockCount: 250,
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewsCount: 31,
    condition: 'New',
    deliveryAvailable: true,
    type: 'product',
    createdAt: '3 days ago'
  }
];

export const MOCK_MARKET_PRICES: MarketPrice[] = [
  {
    id: '1',
    commodity: 'Dry White Maize',
    category: 'Cereal',
    price: 1250,
    currency: 'UGX',
    unit: 'kg',
    market: 'Central Grain Market',
    location: 'Central Market Hub',
    date: 'Today',
    trend: 'up',
    changePercentage: 4.2,
    historicalPrices: [
      { date: 'May', price: 1050 },
      { date: 'Jun', price: 1100 },
      { date: 'Jul', price: 1150 },
      { date: 'Aug', price: 1200 },
      { date: 'Sep', price: 1220 },
      { date: 'Oct', price: 1250 }
    ]
  },
  {
    id: '2',
    commodity: 'Yellow Beans',
    category: 'Legumes',
    price: 3800,
    currency: 'UGX',
    unit: 'kg',
    market: 'City Produce Market',
    location: 'Metro Center',
    date: 'Today',
    trend: 'stable',
    changePercentage: 0,
    historicalPrices: [
      { date: 'May', price: 3500 },
      { date: 'Jun', price: 3600 },
      { date: 'Jul', price: 3750 },
      { date: 'Aug', price: 3800 },
      { date: 'Sep', price: 3800 },
      { date: 'Oct', price: 3800 }
    ]
  },
  {
    id: '3',
    commodity: 'Super Grade Rice',
    category: 'Grains',
    price: 4200,
    currency: 'UGX',
    unit: 'kg',
    market: 'Regional Trade Hub',
    location: 'Eastern Hub',
    date: 'Today',
    trend: 'down',
    changePercentage: -1.8,
    historicalPrices: [
      { date: 'May', price: 4500 },
      { date: 'Jun', price: 4400 },
      { date: 'Jul', price: 4350 },
      { date: 'Aug', price: 4300 },
      { date: 'Sep', price: 4250 },
      { date: 'Oct', price: 4200 }
    ]
  },
  {
    id: '4',
    commodity: 'Cooking Plantains (Large Cluster)',
    category: 'Produce',
    price: 25000,
    currency: 'UGX',
    unit: 'bunch',
    market: 'City Fruit & Produce Hub',
    location: 'Western City',
    date: 'Today',
    trend: 'up',
    changePercentage: 8.5,
    historicalPrices: [
      { date: 'May', price: 18000 },
      { date: 'Jun', price: 20000 },
      { date: 'Jul', price: 21000 },
      { date: 'Aug', price: 22000 },
      { date: 'Sep', price: 23500 },
      { date: 'Oct', price: 25000 }
    ]
  },
  {
    id: '5',
    commodity: 'Fresh Cassava Tubers',
    category: 'Tubers',
    price: 900,
    currency: 'UGX',
    unit: 'kg',
    market: 'Northern Border Market',
    location: 'Northern Hub',
    date: 'Today',
    trend: 'stable',
    changePercentage: 0,
    historicalPrices: [
      { date: 'May', price: 850 },
      { date: 'Jun', price: 880 },
      { date: 'Jul', price: 900 },
      { date: 'Aug', price: 900 },
      { date: 'Sep', price: 900 },
      { date: 'Oct', price: 900 }
    ]
  },
  {
    id: '6',
    commodity: 'Robusta Coffee Beans (FAQ)',
    category: 'Cash Crops',
    price: 8200,
    currency: 'UGX',
    unit: 'kg',
    market: 'Southern Coffee Exchange',
    location: 'Southern Hub',
    date: 'Today',
    trend: 'up',
    changePercentage: 3.1,
    historicalPrices: [
      { date: 'May', price: 7200 },
      { date: 'Jun', price: 7500 },
      { date: 'Jul', price: 7800 },
      { date: 'Aug', price: 7950 },
      { date: 'Sep', price: 8050 },
      { date: 'Oct', price: 8200 }
    ]
  }
];

export const MOCK_AGRI_NEWS: AgriNews[] = [
  {
    id: '1',
    title: 'Agricultural Ministry Releases New Quality Verification Framework for Seed Dealers',
    category: 'Regional Ag',
    summary: 'Agricultural authorities issued updated digital QR verification protocols for certified seed dealers across key grain regions to curb counterfeit inputs prior to planting season.',
    source: 'National Ag Bulletin',
    date: 'Oct 1, 2024',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600',
    readTime: '3 min read',
    originalUrl: 'https://example.org/agri-news-1'
  },
  {
    id: '2',
    title: 'Coffee Export Revenue Surges 28% Driven by Premium Quality Harvests',
    category: 'Markets',
    summary: 'Coffee exporters report record high monthly trade values with strong global demand for high-grade sun-dried coffee beans.',
    source: 'Global Coffee Review',
    date: 'Sep 29, 2024',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600',
    readTime: '4 min read',
    originalUrl: 'https://example.org/agri-news-2'
  },
  {
    id: '3',
    title: 'Solar Irrigation Subsidies Extended to Smallholder Farmers',
    category: 'Tech',
    summary: 'Climate-resilient agricultural water initiatives expand solar pump distribution and drip irrigation setups for commercial vegetable growers.',
    source: 'AgriTech Daily',
    date: 'Sep 27, 2024',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600',
    readTime: '5 min read',
    originalUrl: 'https://example.org/agri-news-3'
  }
];

export const MOCK_EXPERTS: Expert[] = [
  {
    id: '1',
    name: 'Dr. Emmanuel Mugisha',
    title: 'Senior Agronomist & Crop Protection Specialist',
    specialization: 'Grain, Coffee & Horticulture Pathology',
    location: 'Central Agricultural Hub',
    district: 'Central District',
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 86,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    phone: '+256 772 999111',
    whatsapp: '256772999111',
    availableDays: 'Mon - Fri (8 AM - 5 PM)',
    role: 'expert',
    consultationFee: '50,000 UGX / session',
    bio: 'Over 14 years specializing in Integrated Pest Management, soil nutrition, and disease diagnostic consultation for grain and fruit growers.'
  },
  {
    id: '2',
    name: 'Dr. Patricia Kembabazi',
    title: 'Veterinary Surgeon & Livestock Consultant',
    specialization: 'Dairy Cattle, Poultry & Swine Health',
    location: 'Western Livestock Station',
    district: 'Western District',
    experienceYears: 11,
    rating: 5.0,
    reviewsCount: 64,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    phone: '+256 701 444333',
    whatsapp: '256701444333',
    availableDays: 'Mon - Sat (7 AM - 6 PM)',
    role: 'expert',
    consultationFee: '60,000 UGX / visit',
    bio: 'Dedicated veterinary practitioner assisting smallholders and commercial livestock farms in disease prevention and optimal nutrition.'
  }
];

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: '1',
    author: 'David Kato',
    authorRole: 'Commercial Tomato Farmer',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    isVerified: true,
    timeAgo: '3 hours ago',
    content: 'Our greenhouse tomato harvest is exceeding expectations this season. Used organic neem oil spray early to prevent whiteflies and early blight. What crop protection methods are working best for fellow growers?',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600',
    likes: 42,
    commentsCount: 18,
    tags: ['Tomatoes', 'Horticulture', 'PestControl'],
    comments: [
      {
        id: 'c1',
        author: 'Dr. Emmanuel Mugisha',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        text: 'Great practice David! Ensure you alternate with copper-based sprays during rainy spells to avoid blight resistance.',
        timeAgo: '2 hours ago'
      }
    ]
  },
  {
    id: '2',
    author: 'Grace Akello',
    authorRole: 'Poultry Entrepreneur',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    isVerified: false,
    timeAgo: '6 hours ago',
    content: 'Looking for reliable suppliers of high-protein sunflower cake and maize bran in the Central region for poultry feed formulation.',
    likes: 19,
    commentsCount: 7,
    tags: ['Poultry', 'FeedInputs', 'BuyerRequest']
  }
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Agribusiness Innovation Development Grant ($5,000 - $25,000)',
    organization: 'Agricultural Development Fund',
    type: 'Grant',
    deadline: 'Nov 15, 2024',
    location: 'Nationwide Opportunity',
    description: 'Financial grants for youth and women-led agricultural enterprises introducing post-harvest processing, cold chain, or digital farm technologies.',
    link: 'https://example.org/grants'
  },
  {
    id: '2',
    title: 'Free Workshop on Modern Drip Irrigation Installation',
    organization: 'Agricultural Research Institute',
    type: 'Training',
    deadline: 'Oct 20, 2024',
    location: 'Central Agricultural Station',
    description: 'Hands-on training workshop for farm managers and vegetable growers on efficient water conservation and solar pumping.',
    link: 'https://example.org/events'
  }
];

export const SAMPLE_DISEASES: DiseaseDiagnosis[] = [
  {
    id: 'd1',
    cropName: 'Maize / Corn',
    diseaseName: 'Fall Armyworm Infestation (Spodoptera frugiperda)',
    confidence: 94,
    severity: 'Severe',
    symptoms: [
      'Ragged leaf holes and window-pane feeding spots',
      'Sawdust-like frass (excrement) visible inside plant whorl',
      'Defoliation of young emerging leaves'
    ],
    organicTreatment: [
      'Apply wood ash or fine sand mixed with chili pepper directly into the leaf whorl.',
      'Introduce natural predators like ladybird beetles and parasitic wasps.',
      'Handpick caterpillars on smaller garden plots early morning.'
    ],
    chemicalTreatment: [
      'Spray targeted insecticides like Emamectin Benzoate (5% SG) at 10g per 20L water sprayer.',
      'Alternate with Chlorantraniliprole 18.5% SC to prevent chemical resistance.',
      'Spray directly into leaf whorls early morning or late afternoon.'
    ],
    prevention: [
      'Plant early at season onset to avoid peak pest buildup.',
      'Intercrop maize with legume crops like beans or desmodium (Push-Pull strategy).',
      'Inspect crop fields weekly starting 10 days after crop emergence.'
    ],
    recommendedNextSteps: [
      'Isolate heavily infested rows to prevent spread.',
      'Consult a certified agronomist via AgriConnect for field-specific dosages.'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600'
  },
  {
    id: 'd2',
    cropName: 'Tomato / Solanaceae',
    diseaseName: 'Early Blight (Alternaria solani)',
    confidence: 89,
    severity: 'Moderate',
    symptoms: [
      'Concentric target-like brown spots on older lower leaves',
      'Yellow halo surrounding leaf spots',
      'Premature defoliation starting from ground upward'
    ],
    organicTreatment: [
      'Spray copper hydroxide or neem oil emulsion every 7 days.',
      'Remove and safely burn lower infected leaves immediately.'
    ],
    chemicalTreatment: [
      'Apply Mancozeb 80% WP (40g/20L) or Difenoconazole 250 EC preventative spray.'
    ],
    prevention: [
      'Ensure 3-year crop rotation with non-solanaceous crops.',
      'Avoid overhead sprinkler irrigation; apply drip watering at soil level.'
    ],
    recommendedNextSteps: [
      'Stake tomato plants to increase air flow.',
      'Mulch surrounding soil to prevent soil-splash transmission.'
    ],
    sampleImage: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600'
  }
];
