import React, { useState } from 'react';
import { Listing, UserProfile } from '../types';
import {
  Store,
  Search,
  MapPin,
  ShieldCheck,
  MessageCircle,
  Phone,
  Plus,
  X,
  Star,
  SlidersHorizontal,
  CheckCircle,
  Cpu,
  Tractor,
  Zap,
  Wrench
} from 'lucide-react';

interface MarketplaceScreenProps {
  listings: Listing[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedListing: Listing | null;
  setSelectedListing: (l: Listing | null) => void;
  isNewListingModalOpen: boolean;
  setIsNewListingModalOpen: (open: boolean) => void;
  onAddListing: (newListing: Listing) => void;
  userProfile?: UserProfile | null;
  techZoneOnly?: boolean;
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
  techZoneOnly = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [listingTypeFilter, setListingTypeFilter] = useState<'all' | 'product' | 'service' | 'machinery'>(techZoneOnly ? 'machinery' : 'all');

  // Streamlined New Listing Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<Listing['category']>(techZoneOnly ? 'Machinery' : 'Seeds');
  const [formPrice, setFormPrice] = useState('');
  const [formUnit, setFormUnit] = useState(techZoneOnly ? 'day' : 'kg');
  const [formDescription, setFormDescription] = useState('');
  const [formStockQty, setFormStockQty] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formType, setFormType] = useState<'product' | 'service' | 'machinery'>(techZoneOnly ? 'machinery' : 'product');

  const categoriesList = techZoneOnly
    ? ['All', 'Machinery', 'Inputs', 'Services']
    : ['All', 'Seeds', 'Seedlings', 'Machinery', 'Services', 'Inputs', 'Livestock'];

  const regionsList = ['All', 'Central', 'Western', 'Eastern', 'Northern'];

  const defaultPhone = userProfile?.phone || '+256 772 888999';
  const defaultWhatsapp = userProfile?.whatsapp || '256772888999';
  const defaultName = userProfile?.name || 'Uganda Agro Seller';
  const defaultDistrict = userProfile?.district || 'Kampala';

  const filteredListings = listings.filter((item) => {
    const matchesTech = techZoneOnly
      ? (item.type === 'machinery' || item.category === 'Machinery' || item.title.toLowerCase().includes('tractor') || item.title.toLowerCase().includes('pump') || item.title.toLowerCase().includes('spray'))
      : true;

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = listingTypeFilter === 'all' || item.type === listingTypeFilter;

    return matchesTech && matchesSearch && matchesCategory && matchesType;
  });

  const handleSubmitNewListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formPrice) {
      alert('Please enter listing title and price.');
      return;
    }

    const newListing: Listing = {
      id: Date.now().toString(),
      title: formTitle,
      category: formCategory,
      priceUgx: Number(formPrice),
      unit: formUnit || 'unit',
      location: `${defaultDistrict}, Uganda`,
      district: defaultDistrict,
      farmerName: defaultName,
      farmerRole: userProfile?.jobTitle || 'Commercial Agro Producer',
      farmerAvatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isVerified: true,
      phone: defaultPhone,
      whatsapp: defaultWhatsapp,
      images: [
        formImageUrl || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600'
      ],
      description: formDescription || 'Quality agricultural equipment/input verified in Uganda.',
      stockQty: formStockQty || 'In Stock',
      rating: 5.0,
      reviewsCount: 1,
      featured: true,
      type: formType,
      createdAt: 'Just now'
    };

    onAddListing(newListing);
    setIsNewListingModalOpen(false);
    setFormTitle('');
    setFormPrice('');
    setFormDescription('');
    setFormImageUrl('');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              {techZoneOnly ? (
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
                  <Cpu className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-md">
                  <Store className="w-6 h-6" />
                </div>
              )}
              <div>
                <h1 className="text-xl font-extrabold text-slate-900">
                  {techZoneOnly ? 'AgriTech Zone & Machinery Hub' : 'AgriSell Uganda Marketplace'}
                </h1>
                <p className="text-xs text-slate-500">
                  {techZoneOnly
                    ? 'Explore tractors, solar water pumps, drip irrigation kits, drones & farm machinery in Uganda.'
                    : 'Direct connection discovery marketplace. Contact verified sellers directly via phone or WhatsApp.'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsNewListingModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{techZoneOnly ? '+ Post Equipment / Tech' : '+ Post New Listing'}</span>
          </button>
        </div>

        {/* Feature Highlights Banner for Tech Zone */}
        {techZoneOnly && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center space-x-3">
              <Tractor className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Tractor & Plough Hire</h4>
                <p className="text-[10px] text-slate-600">50HP - 90HP 4WD tractors with experienced operators</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center space-x-3">
              <Zap className="w-6 h-6 text-blue-700 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Solar Water Pumps</h4>
                <p className="text-[10px] text-slate-600">Submersible solar irrigation pumps & drip kits</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center space-x-3">
              <Wrench className="w-6 h-6 text-emerald-700 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Processing Machines</h4>
                <p className="text-[10px] text-slate-600">Maize millers, coffee hullers & cassava graters</p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search machinery, seeds, or location..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            />
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-semibold">Type:</span>
            <select
              value={listingTypeFilter}
              onChange={(e) => setListingTypeFilter(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none flex-1"
            >
              <option value="all">All Types</option>
              <option value="machinery">Machinery & Tech</option>
              <option value="product">Products</option>
              <option value="service">Services</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-semibold">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none flex-1"
            >
              {regionsList.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedListing(item)}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col group"
          >
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {item.category}
              </span>
              {item.isVerified && (
                <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {item.description}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-700">{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating} ({item.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Seller & Contact Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Listed Price</span>
                  <p className="text-base font-extrabold text-emerald-800">
                    {item.priceUgx.toLocaleString()} <span className="text-xs font-normal text-slate-500">UGX/{item.unit}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-1.5">
                  <a
                    href={`https://wa.me/${item.whatsapp}?text=Hello%20${encodeURIComponent(item.farmerName)},%20I%20am%20interested%20in%20your%20listing%20on%20AgriSell:%20${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-600 hover:text-white rounded-xl transition-colors"
                    title="WhatsApp Seller"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${item.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white rounded-xl transition-colors"
                    title="Call Seller"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Listing Details */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md uppercase">
                  {selectedListing.category}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-2">{selectedListing.title}</h2>
              </div>
              <button
                onClick={() => setSelectedListing(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="h-64 rounded-xl overflow-hidden bg-slate-100">
              <img src={selectedListing.images[0]} alt={selectedListing.title} className="w-full h-full object-cover" />
            </div>

            {/* Price & Stock */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 font-semibold">Price per {selectedListing.unit}</span>
                <p className="text-2xl font-black text-emerald-900">
                  {selectedListing.priceUgx.toLocaleString()} <span className="text-sm font-medium">UGX</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-semibold">Availability</span>
                <p className="text-sm font-bold text-slate-800">{selectedListing.stockQty}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Product / Service Description</h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                {selectedListing.description}
              </p>
            </div>

            {/* Seller Info Card */}
            <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={selectedListing.farmerAvatar} alt={selectedListing.farmerName} className="w-12 h-12 rounded-full object-cover border border-emerald-300" />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-slate-900">{selectedListing.farmerName}</span>
                    {selectedListing.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-slate-500">{selectedListing.farmerRole} • {selectedListing.location}</p>
                </div>
              </div>

              <div className="text-right text-xs text-slate-500">
                <p className="font-bold text-slate-800">Verified Partner</p>
                <p className="text-[10px]">AgriSell Certified</p>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`https://wa.me/${selectedListing.whatsapp}?text=Hello%20${encodeURIComponent(selectedListing.farmerName)},%20I%20am%20interested%20in%20your%20listing%20on%20AgriSell:%20${encodeURIComponent(selectedListing.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${selectedListing.phone}`}
                className="py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-md transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call {selectedListing.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Streamlined Create Listing Form */}
      {isNewListingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Post New Agri Listing</h3>
                <p className="text-[11px] text-emerald-800 font-semibold">
                  Contact details are automatically attached from your profile settings!
                </p>
              </div>
              <button onClick={() => setIsNewListingModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Auto-Attached Contact Info Preview Badge */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-bold">Posting As: {defaultName}</span>
                  <span className="block text-[10px] text-slate-600">
                    Phone: {defaultPhone} • District: {defaultDistrict}
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitNewListing} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Listing Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('product')}
                    className={`py-2 rounded-xl font-bold border transition-colors ${
                      formType === 'product' ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('service')}
                    className={`py-2 rounded-xl font-bold border transition-colors ${
                      formType === 'service' ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Service
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('machinery')}
                    className={`py-2 rounded-xl font-bold border transition-colors ${
                      formType === 'machinery' ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Machinery
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Listing Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Grafted Orange Seedlings / 50HP Tractor Hire"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="Seeds">Seeds</option>
                    <option value="Seedlings">Seedlings</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Services">Services</option>
                    <option value="Inputs">Inputs / Fertilizers</option>
                    <option value="Livestock">Livestock</option>
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
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit (e.g. kg, pc, acre, day)</label>
                  <input
                    type="text"
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    placeholder="kg"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quantity / Availability</label>
                  <input
                    type="text"
                    value={formStockQty}
                    onChange={(e) => setFormStockQty(e.target.value)}
                    placeholder="e.g. 500 bags"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide detail on quality, seed germination rate, or service coverage..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                Publish Listing Immediately
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
