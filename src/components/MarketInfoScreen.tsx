import React, { useState } from 'react';
import { MarketPrice, AgriNews } from '../types';
import { MOCK_MARKET_PRICES, MOCK_AGRI_NEWS } from '../data/mockData';
import {
  TrendingUp,
  Newspaper,
  Calendar,
  MapPin,
  Search,
  Filter,
  BarChart2,
  ExternalLink,
  CloudSun,
  AlertCircle
} from 'lucide-react';

export const MarketInfoScreen: React.FC = () => {
  const [prices, setPrices] = useState<MarketPrice[]>(MOCK_MARKET_PRICES);
  const [selectedCommodity, setSelectedCommodity] = useState<MarketPrice>(MOCK_MARKET_PRICES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [news, setNews] = useState<AgriNews[]>(MOCK_AGRI_NEWS);
  const [activeTab, setActiveTab] = useState<'prices' | 'news' | 'weather'>('prices');

  const filteredPrices = prices.filter(
    p => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Market Intelligence & News</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
            Live commodity prices, regional price trends, historical trade charts, and certified agricultural advisories.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-emerald-500/30 text-xs font-bold">
          <TrendingUp className="w-4 h-4 text-emerald-300" />
          <span>Real-time Ticker</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('prices')}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'prices' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Commodity Price Ticker & Trends
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'news' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Curated Agricultural News ({news.length})
        </button>
        <button
          onClick={() => setActiveTab('weather')}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'weather' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Agri Weather Guidance
        </button>
      </div>

      {/* Tab 1: Prices */}
      {activeTab === 'prices' && (
        <div className="space-y-6 text-xs">
          {/* Commodity Historical Chart Card */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">{selectedCommodity.category}</span>
                <h3 className="text-xl font-extrabold">{selectedCommodity.commodity}</h3>
                <span className="text-xs text-slate-400">{selectedCommodity.market} • {selectedCommodity.location}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black">
                  {selectedCommodity.price.toLocaleString()} <span className="text-xs font-normal text-slate-400">{selectedCommodity.currency}/{selectedCommodity.unit}</span>
                </div>
                <span className={`text-xs font-bold ${selectedCommodity.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedCommodity.trend === 'up' ? `+${selectedCommodity.changePercentage}%` : `${selectedCommodity.changePercentage}%`}
                </span>
              </div>
            </div>

            {/* Historical Bar Chart Visualization */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-slate-300 text-[11px]">Historical Monthly Price Trend</h4>
              <div className="flex items-end space-x-3 h-36 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                {selectedCommodity.historicalPrices?.map((hp, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center space-y-2 h-full justify-end">
                    <span className="text-[9px] text-slate-400 font-bold">{hp.price.toLocaleString()}</span>
                    <div
                      style={{ height: `${Math.min(100, (hp.price / selectedCommodity.price) * 80)}%` }}
                      className="w-full bg-emerald-500 rounded-t-md hover:bg-emerald-400 transition-all"
                    ></div>
                    <span className="text-[10px] text-slate-400 font-bold">{hp.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Commodity Price Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                  <th className="p-3.5">Commodity</th>
                  <th className="p-3.5">Market Location</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Trend</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPrices.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 cursor-pointer" onClick={() => setSelectedCommodity(item)}>
                    <td className="p-3.5 font-bold text-slate-900">{item.commodity}</td>
                    <td className="p-3.5">{item.market} ({item.location})</td>
                    <td className="p-3.5 font-extrabold">{item.price.toLocaleString()} {item.currency}/{item.unit}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {item.trend === 'up' ? `+${item.changePercentage}%` : `${item.changePercentage}%`}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-bold text-emerald-700">
                      View Chart →
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: News */}
      {activeTab === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {news.map((n) => (
            <div key={n.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <img src={n.image} alt={n.title} className="w-full aspect-video rounded-xl object-cover bg-slate-100" />
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                  <span>{n.source}</span>
                  <span>{n.date}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 line-clamp-2">{n.title}</h3>
                <p className="text-slate-600 line-clamp-3">{n.summary}</p>
              </div>

              <a
                href={n.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-2 border-t border-slate-100 text-emerald-700 font-bold flex items-center justify-between"
              >
                <span>Read Full Article</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Weather */}
      {activeTab === 'weather' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 text-xs">
          <div className="flex items-center space-x-3">
            <CloudSun className="w-8 h-8 text-amber-500" />
            <div>
              <h3 className="font-bold text-base text-slate-900">Regional Planting Season Weather Guidance</h3>
              <p className="text-slate-500">Seasonal precipitation and soil temperature advisories</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2 text-emerald-900">
            <h4 className="font-bold text-xs">Optimal Planting Window:</h4>
            <p>
              Seasonal rains are forecasted across Central and Eastern agricultural zones. Ensure fields are tilled and seedbed preparation is complete prior to rainfall onset.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
