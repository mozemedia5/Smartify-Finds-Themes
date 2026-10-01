import React, { useState } from 'react';
import { MarketPrice, AgriNews, Opportunity } from '../types';
import { MOCK_MARKET_PRICES, MOCK_AGRI_NEWS, MOCK_OPPORTUNITIES } from '../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Newspaper,
  CloudSun,
  Award,
  Search,
  ExternalLink,
  MapPin,
  Calendar,
  Building2,
  Droplets,
  Wind,
  Thermometer
} from 'lucide-react';

export const MarketInfoScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prices' | 'news' | 'opportunities' | 'weather'>('prices');
  const [priceSearch, setPriceSearch] = useState('');
  const [newsCategory, setNewsCategory] = useState('All');

  const newsCategories = ['All', 'Uganda Ag', 'Markets', 'Tech', 'Crops', 'Livestock'];

  const filteredPrices = MOCK_MARKET_PRICES.filter(p =>
    p.commodity.toLowerCase().includes(priceSearch.toLowerCase()) ||
    p.market.toLowerCase().includes(priceSearch.toLowerCase()) ||
    p.location.toLowerCase().includes(priceSearch.toLowerCase())
  );

  const filteredNews = MOCK_AGRI_NEWS.filter(n =>
    newsCategory === 'All' || n.category === newsCategory
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-green-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Uganda Market Intelligence & Info</h1>
            <p className="text-xs text-emerald-100 mt-0.5">
              Daily commodity prices, sourced agricultural news, weather, and grants/opportunities.
            </p>
          </div>
        </div>

        {/* Navigation Switcher */}
        <div className="flex items-center bg-black/20 p-1 rounded-xl backdrop-blur-md border border-white/10 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('prices')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeTab === 'prices' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Market Prices</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeTab === 'news' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:text-white'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>AgriNews</span>
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeTab === 'opportunities' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Opportunities</span>
          </button>

          <button
            onClick={() => setActiveTab('weather')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeTab === 'weather' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:text-white'
            }`}
          >
            <CloudSun className="w-3.5 h-3.5" />
            <span>Weather</span>
          </button>
        </div>
      </div>

      {/* PRICES TAB */}
      {activeTab === 'prices' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={priceSearch}
                onChange={(e) => setPriceSearch(e.target.value)}
                placeholder="Search commodity or market..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              />
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Data sourced from major regional agricultural hubs across Uganda
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Commodity</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price (UGX)</th>
                    <th className="p-3.5">Market / Location</th>
                    <th className="p-3.5 text-right">24h Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {filteredPrices.map((row) => (
                    <tr key={row.id} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{row.commodity}</td>
                      <td className="p-3.5"><span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">{row.category}</span></td>
                      <td className="p-3.5 font-extrabold text-emerald-800">
                        {row.priceUgx.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">/ {row.unit}</span>
                      </td>
                      <td className="p-3.5">{row.market} ({row.location})</td>
                      <td className="p-3.5 text-right font-bold">
                        <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] ${
                          row.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : row.trend === 'down' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {row.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                          {row.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                          {row.trend === 'stable' && <Minus className="w-3 h-3" />}
                          <span>{row.changePercentage > 0 ? `+${row.changePercentage}%` : `${row.changePercentage}%`}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* AGRINEWS TAB */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setNewsCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  newsCategory === cat
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews.map((news) => (
              <div key={news.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-emerald-300 transition-all flex flex-col md:flex-row group">
                <img src={news.image} alt={news.title} className="h-44 md:h-auto md:w-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold mb-1">
                      <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">{news.category}</span>
                      <span>{news.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                      {news.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Source: <strong>{news.source}</strong></span>
                    {news.originalUrl && (
                      <a
                        href={news.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-bold flex items-center hover:underline"
                      >
                        Source Link <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OPPORTUNITIES TAB */}
      {activeTab === 'opportunities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_OPPORTUNITIES.map((opp) => (
            <div key={opp.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:border-emerald-300 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md">
                    {opp.type}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-2">{opp.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 flex items-center space-x-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{opp.organization}</span>
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                {opp.description}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                <span className="text-slate-500 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  <span>Deadline: <strong>{opp.deadline}</strong></span>
                </span>

                <a
                  href={opp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center space-x-1"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WEATHER TAB */}
      {activeTab === 'weather' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Uganda Agricultural Weather Guidance</h2>
              <p className="text-xs text-slate-500">Seasonal rain forecasts & farming advisories for Central/Western regions.</p>
            </div>
            <CloudSun className="w-10 h-10 text-amber-500" />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl">
              <Thermometer className="w-5 h-5 text-amber-600 mx-auto" />
              <span className="text-[10px] text-slate-500 uppercase font-bold block mt-1">Temperature</span>
              <p className="text-lg font-black text-amber-900">27°C</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl">
              <Droplets className="w-5 h-5 text-blue-600 mx-auto" />
              <span className="text-[10px] text-slate-500 uppercase font-bold block mt-1">Humidity</span>
              <p className="text-lg font-black text-blue-900">68%</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
              <Wind className="w-5 h-5 text-emerald-600 mx-auto" />
              <span className="text-[10px] text-slate-500 uppercase font-bold block mt-1">Rain Chance</span>
              <p className="text-lg font-black text-emerald-900">75% (Moderate)</p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Seasonal Farming Advisory</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Second rains expected to continue through November. Ideal timing for top-dressing maize, bean weed control, and nursery seedling field transplantation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
