export type ActiveTab = 'home' | 'marketplace' | 'cofarmer' | 'connect' | 'market_info' | 'tech_zone' | 'profile' | 'admin';

export type UserRole = 'farmer' | 'buyer' | 'business' | 'expert' | 'service_provider' | 'admin';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnitUgx: number;
  location: string;
  imageUrl: string;
  status: 'In Stock' | 'Low Stock' | 'Sold Out';
  lastUpdated: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  jobTitle: string;
  district: string;
  location: string;
  role: UserRole;
  isVerified: boolean;
  avatar: string;
  bio: string;
  rating?: number;
  totalSales?: number;
  hasSeenCoFarmerOnboarding?: boolean;
}

export interface Listing {
  id: string;
  title: string;
  category: 'Seeds' | 'Seedlings' | 'Machinery' | 'Chemicals' | 'Inputs' | 'Livestock' | 'Services' | 'Produce';
  subcategory?: string;
  priceUgx: number;
  unit: string;
  location: string;
  district: string;
  farmerName: string;
  farmerRole: string;
  farmerAvatar: string;
  isVerified: boolean;
  phone: string;
  whatsapp: string;
  images: string[];
  description: string;
  stockQty: string;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  type: 'product' | 'service' | 'machinery';
  createdAt: string;
}

export interface MarketPrice {
  id: string;
  commodity: string;
  category: string;
  priceUgx: number;
  unit: string;
  market: string;
  location: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  historicalPrices?: { date: string; price: number }[];
}

export interface AgriNews {
  id: string;
  title: string;
  category: 'Uganda Ag' | 'Crops' | 'Livestock' | 'Markets' | 'Agribusiness' | 'Weather' | 'Tech';
  summary: string;
  source: string;
  date: string;
  image: string;
  readTime: string;
  originalUrl?: string;
}

export interface DiseaseDiagnosis {
  id: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'Severe';
  symptoms: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  prevention: string[];
  sampleImage: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  isVerified: boolean;
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  tags: string[];
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  specialization: string;
  location: string;
  district: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  avatar: string;
  phone: string;
  whatsapp: string;
  availableDays: string;
  role: 'expert' | 'buyer' | 'farmer';
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'Grant' | 'Training' | 'Tender' | 'Job' | 'Subsidies';
  deadline: string;
  location: string;
  description: string;
  link: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isSelf?: boolean;
}
