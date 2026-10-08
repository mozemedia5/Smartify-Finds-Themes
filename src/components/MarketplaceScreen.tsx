import React, { useState } from 'react';
import { Listing, UserProfile } from '../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  CheckCircle2,
  Heart,
  Eye,
  ShoppingBag,
  Plus,
  X,
  Star,
  MapPin,
  Tag,
  ShieldCheck,
  ChevronDown,
  LayoutGrid,
  List
} from 'lucide-react';

interface MarketplaceScreenProps {
  listings: Listing[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  isNewListingModalOpen: boolean;
  setIsNewListingModalOpen: (open: boolean) => void;
  onAddListing: (listing: Listing) => void;
  userProfile: UserProfile | null;
  techZoneOnly?: boolean;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (listing: Listing, quantity: number) => void;
  onOpenProductDetail: (listing: Listing) => void;
}

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  listings,
  searchQuery,
  setSearchQuery,
  selectedListing,
  setSelectedListing,
  isNewListingModalOpen,
  setIsNewListingModalOpen,
  onAddListing,
  userProfile,
  techZoneOnly = false,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onOpenProductDetail
}) => {
  // Filter & Sort state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [deliveryOnly, setDeliveryOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'newest' | 'price_low' | 'price_high' | 'rating'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Quick view state
  const [quickViewListing, setQuickViewListing] = useState<Listing | null>(null);

  // New Listing Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<Listing['category']>('Seeds');
  const [formPrice, setFormPrice] = useState('');
  const [formUnit, setFormUnit] = useState('kg');
  const [formDistrict, setFormDistrict] = useState(userProfile?.district || 'Central District');
  const [formStock, setFormStock] = useState('100 kg');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');

  const categories = techZoneOnly
    ? ['All', 'Machinery', 'Services']
    : ['All', 'Seeds', 'Seedlings', 'Machinery', 'Chemicals', 'Inputs', 'Livestock', 'Services', 'Produce'];

  const subcategoriesMap: Record<string, string[]> = {
    Seeds: ['All', 'Cereal Seeds', 'Maize', 'Rice', 'Vegetable Seeds'],
    Seedlings: ['All', 'Fruit Seedlings', 'Tree Seedlings', 'Coffee Seedlings'],
    Machinery: ['All', 'Tractor Hire', 'Pumps & Irrigation', 'Processing Equipment', 'Drones'],
    Inputs: ['All', 'Fertilizers', 'Soil Conditioners', 'Animal Feed'],
    Chemicals: ['All', 'Pesticides', 'Fungicides', 'Herbicides']
  };

  // Filtering Logic
  let filtered = listings.filter((l) => {
    if (techZoneOnly && l.category !== 'Machinery' && l.category !== 'Services') return false;

    if (selectedCategory !== 'All' && l.category !== selectedCategory) return false;
    if (selectedSubcategory !== 'All' && l.subcategory !== selectedSubcategory) return false;
    if (selectedCondition !== 'All' && l.condition !== selectedCondition) return false;
    if (selectedLocation !== 'All' && l.district !== selectedLocation) return false;
    if (verifiedOnly && !l.isVerified) return false;
    if (deliveryOnly && !l.deliveryAvailable) return false;
    if (l.price < minPrice) return false;
    if (maxPrice > 0 && l.price > maxPrice) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(q);
      const matchCat = l.category.toLowerCase().includes(q);
      const matchLoc = l.location.toLowerCase().includes(q);
      const matchSeller = l.farmerName.toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchLoc && !matchSeller) return false;
    }

    return true;
  });

  // Sorting Logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formPrice) return;

    const defaultDistrict = formDistrict || userProfile?.district || 'Central District';
    const newListing: Listing = {
      id: `list_${Date.now()}`,
      sellerId: userProfile?.id || 'usr_seller',
      title: formTitle,
      category: formCategory,
      price: parseFloat(formPrice) || 0,
      currency: 'UGX',
      unit: formUnit,
      location: `${defaultDistrict} Hub`,
      district: defaultDistrict,
      farmerName: userProfile?.name || 'Agri Seller',
      farmerRole: userProfile?.jobTitle || 'Verified Seller',
      farmerAvatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isVerified: userProfile?.isVerified || true,
      phone: userProfile?.phone || '+256 700 000000',
      whatsapp: userProfile?.whatsapp || '256700000000',
      images: [formImageUrl || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'],
      description: formDescription || 'Quality verified agricultural listing.',
      stockQty: formStock || 'In Stock',
      stockStatus: 'In Stock',
      rating: 5.0,
      reviewsCount: 1,
      featured: false,
      type: formCategory === 'Machinery' ? 'machinery' : formCategory === 'Services' ? 'service' : 'product',
      createdAt: 'Just now'
    };

    onAddListing(newListing);
    setIsNewListingModalOpen(false);

    // Reset Form
    setFormTitle('');
    setFormPrice('');
    setFormDescription('');
    setFormImageUrl('');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header / Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {techZoneOnly ? 'AgriTech Zone & Machinery Hub' : 'Agricultural Products Marketplace'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
            {techZoneOnly
              ? 'Explore tractors, solar water pumps, drip irrigation kits, drones & farm machinery.'
              : 'Discover certified seeds, crop protection, fertilizers, machinery, and fresh harvests from verified suppliers.'}
          </p>
        </div>

        <button
          onClick={() => setIsNewListingModalOpen(true)}
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Listing</span>
        </button>
      </div>

      {/* Main Search Bar & Mobile Filter Trigger */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, locations or sellers..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            />
          </div>

          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="md:hidden flex items-center space-x-1.5 px-3.5 py-2.5 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* View toggle */}
          <div className="hidden sm:flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs ${viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'text-slate-500'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs ${viewMode === 'list' ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'text-slate-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Category Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedSubcategory('All');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Layout: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block col-span-1 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 h-fit sticky top-20">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
              <Filter className="w-4 h-4 text-emerald-700" />
              <span>Filter Products</span>
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSubcategory('All');
                setSelectedCondition('All');
                setSelectedLocation('All');
                setVerifiedOnly(false);
                setDeliveryOnly(false);
                setMinPrice(0);
                setMaxPrice(1000000);
              }}
              className="text-[11px] font-bold text-emerald-700 hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Subcategory */}
          {subcategoriesMap[selectedCategory] && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Subcategory</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {subcategoriesMap[selectedCategory].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}

          {/* Condition */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Condition</label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="All">All Conditions</option>
              <option value="Certified">Certified / Official</option>
              <option value="New">Brand New</option>
              <option value="Used - Good">Used - Good</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span>Verified Sellers Only</span>
            </label>

            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={deliveryOnly}
                onChange={(e) => setDeliveryOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span>Delivery Available</span>
            </label>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          {/* Sorting Bar */}
          <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm text-xs">
            <span className="text-slate-500 font-medium">
              Showing <strong className="text-slate-900">{filtered.length}</strong> products
            </span>

            <div className="flex items-center space-x-2">
              <span className="text-slate-500 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-1.5 font-bold text-slate-800 text-xs focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Empty State */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <p className="text-4xl">🌾</p>
              <h3 className="text-lg font-bold text-slate-900">No products match your criteria</h3>
              <p className="text-xs text-slate-500">Try adjusting your category, price range, or filter options.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => {
                const isWishlisted = wishlist.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Image Box */}
                      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Wishlist button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(item.id);
                          }}
                          className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm text-slate-600 transition-all"
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>

                        {/* Quick View Button */}
                        <button
                          onClick={() => setQuickViewListing(item)}
                          className="absolute bottom-2.5 right-2.5 bg-slate-900/80 hover:bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Quick View</span>
                        </button>

                        {item.isVerified && (
                          <span className="absolute top-2.5 left-2.5 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-sm">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-emerald-700 uppercase">{item.category}</span>
                          <span className="text-slate-400 flex items-center">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400 mr-0.5" />
                            {item.rating} ({item.reviewsCount})
                          </span>
                        </div>

                        <h3
                          onClick={() => onOpenProductDetail(item)}
                          className="text-sm font-bold text-slate-900 line-clamp-1 hover:text-emerald-700 transition-colors cursor-pointer"
                        >
                          {item.title}
                        </h3>

                        <div className="flex items-center space-x-1 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-base font-extrabold text-slate-900">
                          {item.price.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">{item.currency}/{item.unit}</span>
                        </div>
                        <div className="text-[10px] text-emerald-600 font-semibold">{item.stockQty}</div>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onAddToCart(item, 1)}
                          className="p-2 bg-emerald-50 hover:bg-emerald-700 text-emerald-700 hover:text-white rounded-xl transition-colors"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List Mode */
            <div className="space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-20 h-20 rounded-xl object-cover bg-slate-100"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">{item.category}</span>
                      <h3
                        onClick={() => onOpenProductDetail(item)}
                        className="text-sm font-bold text-slate-900 hover:text-emerald-700 cursor-pointer"
                      >
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-3 text-xs text-slate-500">
                        <span>{item.location}</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-medium">{item.stockQty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-right">
                      <div className="text-base font-extrabold text-slate-900">
                        {item.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">{item.currency}/{item.unit}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(item, 1)}
                      className="bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewListing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setQuickViewListing(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100">
              <img src={quickViewListing.images[0]} alt={quickViewListing.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase">{quickViewListing.category}</span>
              <h2 className="text-lg font-bold text-slate-900">{quickViewListing.title}</h2>
              <p className="text-xs text-slate-600 line-clamp-3">{quickViewListing.description}</p>
              <div className="text-xl font-extrabold text-slate-900 pt-2">
                {quickViewListing.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">{quickViewListing.currency}/{quickViewListing.unit}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  onAddToCart(quickViewListing, 1);
                  setQuickViewListing(null);
                }}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  onOpenProductDetail(quickViewListing);
                  setQuickViewListing(null);
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs text-center"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Listing Modal */}
      {isNewListingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Create Agricultural Listing</h2>
              <button onClick={() => setIsNewListingModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Certified Hybrid Maize Seeds 25kg"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Seeds">Seeds</option>
                    <option value="Seedlings">Seedlings</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Chemicals">Chemicals</option>
                    <option value="Inputs">Inputs</option>
                    <option value="Livestock">Livestock</option>
                    <option value="Services">Services</option>
                    <option value="Produce">Produce</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (UGX) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 15000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    placeholder="kg, bag, acre, pc, day"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">District / Location</label>
                  <input
                    type="text"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    placeholder="District name"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide specifications, quality guarantees, germination rate, or delivery details..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all"
              >
                Publish Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
