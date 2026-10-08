import React from 'react';
import { ActiveTab, Listing, MarketPrice, AgriNews } from '../types';
import {
  ShoppingBag,
  PlusCircle,
  Bot,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Newspaper,
  Star,
  MapPin,
  Tag,
  CheckCircle2,
  Sparkles,
  Search,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

interface HomeScreenProps {
  listings: Listing[];
  marketPrices: MarketPrice[];
  agriNews: AgriNews[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectListing: (listing: Listing) => void;
  searchQuery: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  listings,
  marketPrices,
  agriNews,
  setActiveTab,
  onSelectListing,
  searchQuery
}) => {
  const filteredListings = listings.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredListings = filteredListings.filter((l) => l.featured).slice(0, 4);
  const recentListings = filteredListings.slice(0, 6);

  const categories = [
    { name: 'Seeds', icon: '🌱', count: '120+ Listings' },
    { name: 'Seedlings', icon: '🪴', count: '85+ Listings' },
    { name: 'Machinery', icon: '🚜', count: '45+ Rentals' },
    { name: 'Chemicals', icon: '🧪', count: '90+ Inputs' },
    { name: 'Inputs', icon: '📦', count: '150+ Supplies' },
    { name: 'Livestock', icon: '🐄', count: '60+ Offers' },
    { name: 'Services', icon: '🛠️', count: '40+ Experts' },
    { name: 'Produce', icon: '🌾', count: '200+ Harvests' }
  ];

  return (
    <div className="space-[#1e293b] space-y-8 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Agricultural Marketplace Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Buy, Sell, Connect & Grow Your Agricultural Business
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
            Directly trade verified seeds, fertilizers, machinery, and fresh harvests with trusted farmers, suppliers, and agricultural specialists.
          </p>

          {/* Prominent Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="inline-flex items-center justify-center space-x-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-5 py-3 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Products</span>
            </button>

            <button
              onClick={() => setActiveTab('seller_dashboard')}
              className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl border border-emerald-400/40 shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Products</span>
            </button>

            <button
              onClick={() => setActiveTab('cofarmer')}
              className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl border border-white/20 backdrop-blur-md transition-all text-sm"
            >
              <Bot className="w-4 h-4 text-emerald-300" />
              <span>Ask CoFarmer AI</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Discovery */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Explore Categories</h2>
            <p className="text-xs text-slate-500">Discover quality agricultural inputs and produce</p>
          </div>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab('marketplace')}
              className="flex flex-col items-center justify-center p-3.5 bg-white border border-slate-200/80 hover:border-emerald-500 rounded-2xl hover:shadow-md transition-all group text-center"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">{cat.name}</span>
              <span className="text-[10px] text-slate-400 mt-0.5">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Deals & Featured Products */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xl font-bold text-slate-900">Deals & Featured Products</h2>
          </div>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>Browse Deals</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredListings.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectListing(item)}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                    FEATURED
                  </span>
                  {item.isVerified && (
                    <span className="absolute top-2.5 right-2.5 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                    {item.category} • {item.subcategory || 'General'}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-base font-extrabold text-slate-900">
                    {item.price.toLocaleString()} <span className="text-[11px] font-normal text-slate-500">{item.currency}/{item.unit}</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{item.stockQty}</div>
                </div>

                <button className="p-2 bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white rounded-xl transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Commodity Market Ticker */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 shadow-lg space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold">Commodity Market Intelligence</h2>
          </div>
          <button
            onClick={() => setActiveTab('market_info')}
            className="text-xs font-bold text-emerald-400 hover:underline"
          >
            Full Market Trends & Charts →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {marketPrices.slice(0, 3).map((price) => (
            <div key={price.id} className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block font-medium">{price.commodity}</span>
                <span className="text-lg font-extrabold text-white">
                  {price.price.toLocaleString()} <span className="text-xs text-slate-400 font-normal">{price.currency}/{price.unit}</span>
                </span>
                <span className="text-[10px] text-slate-500 block">{price.market}</span>
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${price.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : price.trend === 'down' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-700 text-slate-300'}`}>
                {price.trend === 'up' ? `+${price.changePercentage}%` : price.trend === 'down' ? `${price.changePercentage}%` : 'Stable'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Sellers Banner */}
      <section className="bg-emerald-50 rounded-3xl border border-emerald-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Agricultural Network</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Trade with Certified Farmers & Suppliers</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Our sellers pass official verification checks for business registration, quality inputs, and reliable fulfillment. Look for the Verified Badge when buying.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('connect')}
          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-all whitespace-nowrap"
        >
          Connect with Experts & Sellers
        </button>
      </section>

      {/* Agricultural News Highlights */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-emerald-700" />
            <h2 className="text-xl font-bold text-slate-900">Agricultural News & Advisory</h2>
          </div>
          <button
            onClick={() => setActiveTab('market_info')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>More News</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agriNews.map((news) => (
            <div key={news.id} className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                  <span>{news.source}</span>
                  <span>{news.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-emerald-700 transition-colors">
                  {news.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{news.summary}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-[11px]">
                <span className="text-emerald-700 font-semibold">{news.category}</span>
                <span className="text-slate-400">{news.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
