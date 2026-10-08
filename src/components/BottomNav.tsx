import React from 'react';
import { ActiveTab } from '../types';
import { Sprout, Store, Bot, Users, TrendingUp } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; highlight?: boolean }[] = [
    { id: 'home', label: 'Home', icon: <Sprout className="w-5 h-5" /> },
    { id: 'marketplace', label: 'Marketplace', icon: <Store className="w-5 h-5" /> },
    { id: 'cofarmer', label: 'CoFarmer AI', icon: <Bot className="w-5 h-5" />, highlight: true },
    { id: 'connect', label: 'Connect', icon: <Users className="w-5 h-5" /> },
    { id: 'market_info', label: 'Market Info', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 px-2 py-1.5 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white ring-4 ring-emerald-100 scale-105'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <Bot className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 ${
                    isActive ? 'text-emerald-700' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}>
                {item.icon}
              </div>
              <span
                className={`text-[10px] mt-0.5 ${
                  isActive ? 'font-bold text-emerald-700' : 'font-medium text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
