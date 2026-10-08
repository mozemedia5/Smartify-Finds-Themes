export type ActiveTab =
  | 'home'
  | 'marketplace'
  | 'cofarmer'
  | 'connect'
  | 'market_info'
  | 'tech_zone'
  | 'profile'
  | 'seller_dashboard'
  | 'orders'
  | 'admin';

export type UserRole =
  | 'farmer'
  | 'buyer'
  | 'business'
  | 'expert'
  | 'service_provider'
  | 'admin';

export interface LocationInfo {
  region: string;
  district: string;
  town?: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
}

export interface InventoryItem {
  id: string;
  sellerId?: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  currency: string;
  location: string;
  district: string;
  imageUrl: string;
  status: 'In Stock' | 'Low Stock' | 'Sold Out';
  lastUpdated: string;
  sku?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  jobTitle: string;
  region?: string;
  district: string;
  location: string;
  role: UserRole;
  isVerified: boolean;
  avatar: string;
  bio: string;
  rating?: number;
  totalSales?: number;
  hasSeenCoFarmerOnboarding?: boolean;
  storeName?: string;
  verificationStatus?: 'unverified' | 'pending' | 'verified' | 'rejected';
}

export interface ListingSpec {
  label: string;
  value: string;
}

export interface Listing {
  id: string;
  sellerId?: string;
  title: string;
  category: 'Seeds' | 'Seedlings' | 'Machinery' | 'Chemicals' | 'Inputs' | 'Livestock' | 'Services' | 'Produce';
  subcategory?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  unit: string;
  location: string;
  district: string;
  region?: string;
  farmerName: string;
  farmerRole: string;
  farmerAvatar: string;
  isVerified: boolean;
  phone: string;
  whatsapp: string;
  images: string[];
  videoUrl?: string;
  description: string;
  specifications?: ListingSpec[];
  usageInfo?: string;
  packagingInfo?: string;
  stockQty: string;
  stockCount?: number;
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  discountPercentage?: number;
  condition?: 'New' | 'Certified' | 'Used - Good' | 'Refurbished';
  deliveryAvailable?: boolean;
  type: 'product' | 'service' | 'machinery';
  createdAt: string;
}

export interface CartItem {
  id: string;
  listing: Listing;
  quantity: number;
  unitPrice: number;
  currency: string;
  selectedSellerId: string;
  addedAt: string;
}

export interface OrderItem {
  listingId: string;
  title: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  sellerId: string;
  sellerName: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  deliveryAddress: string;
  region: string;
  district: string;
  town?: string;
  deliveryInstructions?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentMethod: 'Mobile Money' | 'Card' | 'Bank Transfer' | 'Cash on Delivery';
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  notes?: string;
}

export interface ProductReview {
  id: string;
  listingId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  images?: string[];
}

export interface MarketPrice {
  id: string;
  commodity: string;
  category: string;
  price: number;
  currency: string;
  unit: string;
  market: string;
  location: string;
  district?: string;
  region?: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  historicalPrices?: { date: string; price: number }[];
}

export interface AgriNews {
  id: string;
  title: string;
  category: 'Regional Ag' | 'Crops' | 'Livestock' | 'Markets' | 'Agribusiness' | 'Weather' | 'Tech';
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
  recommendedNextSteps?: string[];
  sampleImage: string;
  uncertaintyWarning?: string;
}

export interface FarmContext {
  cropType: string;
  acreage: string;
  location: string;
  farmingMethod: 'Organic' | 'Conventional' | 'Mixed';
}

export interface AISession {
  id: string;
  createdAt: string;
  farmContext?: FarmContext;
  messages: {
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    timestamp: string;
    imageUrl?: string;
    diagnosis?: DiseaseDiagnosis;
  }[];
}

export interface CommunityPost {
  id: string;
  authorId?: string;
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
  comments?: {
    id: string;
    author: string;
    authorAvatar: string;
    text: string;
    timeAgo: string;
  }[];
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  specialization: string;
  location: string;
  district: string;
  region?: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  avatar: string;
  phone: string;
  whatsapp: string;
  availableDays: string;
  role: 'expert' | 'buyer' | 'farmer';
  consultationFee?: string;
  bio?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'Grant' | 'Training' | 'Tender' | 'Job' | 'Subsidies';
  deadline: string;
  location: string;
  district?: string;
  description: string;
  link: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isSelf?: boolean;
  attachment?: {
    type: 'image' | 'product' | 'order';
    url?: string;
    title?: string;
    price?: number;
    currency?: string;
    id?: string;
  };
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  isVerified: boolean;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'order' | 'message' | 'price' | 'cofarmer' | 'verification' | 'promotion';
  title: string;
  body: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: UserRole;
  documentType: 'National ID' | 'Business License' | 'Agronomist Certificate' | 'Land Title / Lease';
  documentUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  notes?: string;
}

export interface PromoCoupon {
  code: string;
  discountPercentage: number;
  minPurchaseAmount: number;
  validUntil: string;
  description: string;
}
