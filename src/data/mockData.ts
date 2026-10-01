import { Listing, MarketPrice, AgriNews, Expert, CommunityPost, Opportunity, DiseaseDiagnosis } from '../types';

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Certified Rice Seeds (BRR Rice - High Yield)',
    category: 'Seeds',
    subcategory: 'Cereal Seeds',
    priceUgx: 15000,
    unit: 'kg',
    location: 'Mbale District',
    district: 'Mbale',
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
    description: 'High germination rate certified rice seeds optimized for Ugandan climate and soil conditions. High drought resistance and 35% higher yields.',
    stockQty: '1,200 kg available',
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    type: 'product',
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    title: 'Healthy Grafted Lime Seedlings',
    category: 'Seedlings',
    subcategory: 'Fruit Seedlings',
    priceUgx: 3000,
    unit: 'pc',
    location: 'Luwero District',
    district: 'Luwero',
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
    description: 'Disease-free, high-fruiting grafted lime seedlings ready for immediate orchard planting. Matures within 18 months.',
    stockQty: '500 pcs available',
    rating: 4.8,
    reviewsCount: 24,
    featured: true,
    type: 'product',
    createdAt: '5 hours ago'
  },
  {
    id: '3',
    title: '50HP Farm Tractor Hire with Operator',
    category: 'Machinery',
    subcategory: 'Tractor Hire',
    priceUgx: 700000,
    unit: 'day',
    location: 'Mbarara & Western Region',
    district: 'Mbarara',
    farmerName: 'AgriMach Services Uganda',
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
    stockQty: '3 Units Available',
    rating: 5.0,
    reviewsCount: 42,
    featured: true,
    type: 'service',
    createdAt: '1 day ago'
  },
  {
    id: '4',
    title: 'Hybrid Maize Seeds (Longe 10H)',
    category: 'Seeds',
    subcategory: 'Maize',
    priceUgx: 12000,
    unit: 'kg',
    location: 'Kasese',
    district: 'Kasese',
    farmerName: 'Kasese Farmers Co-op',
    farmerRole: 'Seed Cooperative',
    farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isVerified: true,
    phone: '+256 775 888999',
    whatsapp: '256775888999',
    images: [
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600'
    ],
    description: 'Drought tolerant Longe 10H hybrid maize seed bag. Suitable for both first and second rains in Uganda.',
    stockQty: '800 bags',
    rating: 4.7,
    reviewsCount: 19,
    type: 'product',
    createdAt: '2 days ago'
  },
  {
    id: '5',
    title: 'Professional Crop Spraying & Fumigation Service',
    category: 'Services',
    subcategory: 'Spraying Service',
    priceUgx: 45000,
    unit: 'acre',
    location: 'Mityana / Wakiso',
    district: 'Wakiso',
    farmerName: 'Kampala AgroCare Spray Team',
    farmerRole: 'Licensed Pest Specialist',
    farmerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    isVerified: true,
    phone: '+256 702 333444',
    whatsapp: '256702333444',
    images: [
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600'
    ],
    description: 'Motorized knapsack and drone crop spraying services for coffee, maize, tomatoes, and fruit orchards.',
    stockQty: 'Daily booking open',
    rating: 4.9,
    reviewsCount: 15,
    type: 'service',
    createdAt: '3 days ago'
  },
  {
    id: '6',
    title: 'Organic NPK & Bio-Fertilizer 50kg Bag',
    category: 'Inputs',
    subcategory: 'Fertilizers',
    priceUgx: 135000,
    unit: 'bag',
    location: 'Jinja Industrial Area',
    district: 'Jinja',
    farmerName: 'Nile BioAgro Uganda',
    farmerRole: 'Fertilizer Manufacturer',
    farmerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150',
    isVerified: true,
    phone: '+256 788 112233',
    whatsapp: '256788112233',
    images: [
      'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600'
    ],
    description: 'Enriched organic bio-fertilizer promoting root development, soil microbial health, and high yields.',
    stockQty: '250 bags',
    rating: 4.8,
    reviewsCount: 31,
    type: 'product',
    createdAt: '3 days ago'
  }
];

export const MOCK_MARKET_PRICES: MarketPrice[] = [
  { id: '1', commodity: 'Dry White Maize', category: 'Cereal', priceUgx: 1250, unit: 'kg', market: 'Kalerwe Market', location: 'Kampala', date: 'Today', trend: 'up', changePercentage: 4.2 },
  { id: '2', commodity: 'Yellow Beans (Nambale)', category: 'Legumes', priceUgx: 3800, unit: 'kg', market: 'Owino Market', location: 'Kampala', date: 'Today', trend: 'stable', changePercentage: 0 },
  { id: '3', commodity: 'Super Rice (Kilombero)', category: 'Grains', priceUgx: 4200, unit: 'kg', market: 'Mbale Central', location: 'Mbale', date: 'Today', trend: 'down', changePercentage: -1.8 },
  { id: '4', commodity: 'Matooke (Large Cluster)', category: 'Banana', priceUgx: 25000, unit: 'bunch', market: 'Mbarara City Market', location: 'Mbarara', date: 'Today', trend: 'up', changePercentage: 8.5 },
  { id: '5', commodity: 'Cassava Fresh', category: 'Tubers', priceUgx: 900, unit: 'kg', market: 'Arua Central', location: 'Arua', date: 'Today', trend: 'stable', changePercentage: 0 },
  { id: '6', commodity: 'Robusta Coffee Beans (FAQ)', category: 'Cash Crops', priceUgx: 8200, unit: 'kg', market: 'Masaka Hub', location: 'Masaka', date: 'Today', trend: 'up', changePercentage: 3.1 }
];

export const MOCK_AGRI_NEWS: AgriNews[] = [
  {
    id: '1',
    title: 'Uganda Ministry of Agriculture Announces New Seed Quality Verification Guidelines',
    category: 'Uganda Ag',
    summary: 'The Ministry has issued strict QR verification protocols for seed dealers in Central and Eastern region to curb fake seeds before the next planting season.',
    source: 'MAAIF Uganda',
    date: 'Oct 1, 2024',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600',
    readTime: '3 min read',
    originalUrl: 'https://agriculture.go.ug'
  },
  {
    id: '2',
    title: 'Coffee Export Revenues Surge by 28% Driven by Premium Quality Robusta',
    category: 'Markets',
    summary: 'Uganda Coffee Development Authority (UCDA) reports record high monthly export values with increased demand in European and Asian markets.',
    source: 'UCDA News',
    date: 'Sep 29, 2024',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600',
    readTime: '4 min read',
    originalUrl: 'https://ugandacoffee.go.ug'
  },
  {
    id: '3',
    title: 'Solar Irrigation Subsidies Extended to Smallholder Farmers in Northern Uganda',
    category: 'Tech',
    summary: 'Climate-resilient agricultural water management project expands solar pump distribution across Gulu, Lira, and Soroti districts.',
    source: 'AgriTech Uganda Daily',
    date: 'Sep 27, 2024',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600',
    readTime: '5 min read'
  }
];

export const MOCK_EXPERTS: Expert[] = [
  {
    id: '1',
    name: 'Dr. Emmanuel Mugisha',
    title: 'Senior Agronomist & Crop Protection Specialist',
    specialization: 'Coffee, Maize & Horticulture Pathology',
    location: 'Makerere University / Kampala',
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 86,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    phone: '+256 772 999111',
    availableDays: 'Mon - Fri (8 AM - 5 PM)'
  },
  {
    id: '2',
    name: 'Dr. Patricia Kembabazi',
    title: 'Veterinary Surgeon & Livestock Consultant',
    specialization: 'Dairy Cattle & Poultry Health',
    location: 'Mbarara Regional Veterinary Hub',
    experienceYears: 11,
    rating: 5.0,
    reviewsCount: 64,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    phone: '+256 701 444333',
    availableDays: 'Mon - Sat (7 AM - 6 PM)'
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
    content: 'Our greenhouse tomato harvest in Wakiso is exceeding expectations this season. Used organic neem oil spray early to prevent whiteflies and early blight. What crop protection methods are working best for fellow farmers in Central region?',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600',
    likes: 42,
    commentsCount: 18,
    tags: ['Tomatoes', 'Horticulture', 'PestControl']
  },
  {
    id: '2',
    author: 'Grace Akello',
    authorRole: 'Poultry Entrepreneur',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    isVerified: false,
    timeAgo: '6 hours ago',
    content: 'Looking for reliable suppliers of high-protein sunflower cake and maize bran in Mukono or Kampala for poultry feed formulation.',
    likes: 19,
    commentsCount: 7,
    tags: ['Poultry', 'FeedInputs', 'BuyerRequest']
  }
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Uganda Agribusiness Innovation Grant 2024 ($5,000 - $25,000)',
    organization: 'Agricultural Development Fund Uganda',
    type: 'Grant',
    deadline: 'Nov 15, 2024',
    location: 'Nationwide Uganda',
    description: 'Financial grants for youth and women-led agricultural enterprises introducing post-harvest processing and digital technologies.',
    link: 'https://agrifund.ug/grants'
  },
  {
    id: '2',
    title: 'Free Workshop on Modern Drip Irrigation Installation',
    organization: 'NARO Uganda / JICA',
    type: 'Training',
    deadline: 'Oct 20, 2024',
    location: 'Namulonge Agricultural Research Station',
    description: 'Hands-on training workshop for farm managers and vegetable growers on efficient water conservation and solar pumping.',
    link: 'https://naro.go.ug/events'
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
      'Yellow halo surrounding leaf leaf spots',
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
    sampleImage: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600'
  }
];
