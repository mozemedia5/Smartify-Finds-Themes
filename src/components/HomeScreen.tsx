import React from 'react';
import { Listing, MarketPrice, AgriNews, ActiveTab } from '../types';
import {
  Sprout,
  Store,
  Bot,
  TrendingUp,
  Newspaper,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  Sparkles,
  Tractor,
  Wheat,
  Stethoscope,
  Droplet,
  Tag,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Minus
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
  const categoriesList = [
    { name: 'Seeds', icon: Wheat, color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Seedlings', icon: Sprout, color: 'bg-green-100 text-green-800' },
    { name: 'Machinery', icon: Tractor, color: 'bg-amber-100 text-amber-800' },
    { name: 'Services', icon: Stethoscope, color: 'bg-blue-100 text-blue-800' },
    { name: 'Inputs', icon: Droplet, color: 'bg-teal-100 text-teal-800' },
    { name: 'Livestock', icon: Tag, color: 'bg-rose-100 text-rose-800' },
  ];

  const featuredListings = listings.filter(l => l.featured || true).slice(0, 4);

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Banner with Modern Agri Styling */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white p-6 md:p-8 shadow-xl">
        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
          <Sprout className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-700/60 border border-emerald-500/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Uganda's #1 Agricultural Ecosystem</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Connect directly with verified farmers, buyers & agro-services across Uganda.
          </h1>

          <p className="text-sm md:text-base text-emerald-100 leading-relaxed">
            Marketplace discovery, live crop disease AI diagnosis, daily commodity prices, and direct WhatsApp seller connection.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center space-x-2 active:scale-95"
            >
              <Store className="w-4 h-4" />
              <span>Explore Marketplace</span>
            </button>

            <button
              onClick={() => setActiveTab('cofarmer')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all flex items-center space-x-2 active:scale-95"
            >
              <Bot className="w-4 h-4 text-emerald-300" />
              <span>Ask AI CoFarmer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Commodity Market Price Ticker */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-bold text-slate-900">Uganda Live Market Prices</h2>
            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Updated Today</span>
          </div>
          <button
            onClick={() => setActiveTab('market_info')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>View All Markets</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {marketPrices.slice(0, 6).map((price) => (
            <div key={price.id} className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 hover:border-emerald-300 transition-colors">
              <p className="text-xs font-semibold text-slate-700 truncate">{price.commodity}</p>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-sm font-extrabold text-slate-900">
                  {price.priceUgx.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">UGX/{price.unit}</span>
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 truncate">{price.market}</span>
                <span className={`font-bold flex items-center ${
                  price.trend === 'up' ? 'text-emerald-600' : price.trend === 'down' ? 'text-rose-600' : 'text-slate-500'
                }`}>
                  {price.trend === 'up' && <TrendingUp className="w-2.5 h-2.5 mr-0.5" />}
                  {price.trend === 'down' && <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                  {price.trend === 'stable' && <Minus className="w-2.5 h-2.5 mr-0.5" />}
                  {price.changePercentage > 0 ? `+${price.changePercentage}%` : `${price.changePercentage}%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Quick Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-extrabold text-slate-900">Browse Categories</h2>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categoriesList.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveTab('marketplace')}
                className="flex flex-col items-center justify-center p-3.5 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-emerald-300 transition-all group"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2 ${cat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Crop Doctor Quick Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-200/60 px-2 py-0.5 rounded-md">
                Crop Doctor AI
              </span>
              <span className="text-xs text-slate-500 font-medium">Free Diagnostics</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-slate-900 mt-1">
              Having crop diseases or pest attacks on your farm?
            </h3>
            <p className="text-xs md:text-sm text-slate-600 mt-0.5">
              Upload leaf or plant photos to AI CoFarmer for instant diagnosis and organic/chemical treatment advice.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('cofarmer')}
          className="w-full md:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-sm whitespace-nowrap transition-colors flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Diagnose Crop Now</span>
        </button>
      </div>

      {/* Featured Marketplace Listings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Featured Agricultural Listings</h2>
            <p className="text-xs text-slate-500">Verified seeds, seedlings, tractors, and fertilizers in Uganda</p>
          </div>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>Explore All ({listings.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredListings.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectListing(item)}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col group"
            >
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {item.category}
                </span>
                {item.isVerified && (
                  <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-sm">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-1 flex items-center space-x-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Price</span>
                    <p className="text-sm font-black text-emerald-800">
                      {item.priceUgx.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">UGX/{item.unit}</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-1">
                    <a
                      href={`https://wa.me/${item.whatsapp}?text=Hello%20${encodeURIComponent(item.farmerName)},%20I%20am%20interested%20in%20your%20listing%20on%20AgriSell:%20${encodeURIComponent(item.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors"
                      title="Direct WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${item.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                      title="Direct Call"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AgriNews & Sourced Insights Highlights */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-bold text-slate-900">Sourced AgriNews Uganda</h2>
          </div>
          <button
            onClick={() => setActiveTab('market_info')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>Read All News</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agriNews.map((news) => (
            <div key={news.id} className="flex flex-col bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-300 transition-all group">
              <img src={news.image} alt={news.title} className="h-36 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">{news.category}</span>
                    <span>{news.date} • {news.readTime}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700">
                    {news.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                    {news.summary}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Source: <strong>{news.source}</strong></span>
                  <span className="text-emerald-700 font-bold flex items-center">
                    Source Link <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
