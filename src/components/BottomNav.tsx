import React from 'react';
import { ActiveTab } from '../types';
import {
  Sprout,
  Store,
  Bot,
  Users,
  User,
  TrendingUp
} from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home' as ActiveTab, label: 'Home', icon: Sprout },
    { id: 'marketplace' as ActiveTab, label: 'Market', icon: Store },
    { id: 'cofarmer' as ActiveTab, label: 'CoFarmer', icon: Bot, highlight: true },
    { id: 'connect' as ActiveTab, label: 'Connect', icon: Users },
    { id: 'market_info' as ActiveTab, label: 'Prices', icon: TrendingUp },
    { id: 'profile' as ActiveTab, label: 'Profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg px-2 py-1.5 flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        if (item.highlight) {
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center relative -top-3"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                isActive
                  ? 'bg-gradient-to-tr from-emerald-700 to-green-500 text-white scale-110 ring-4 ring-emerald-100'
                  : 'bg-emerald-600 text-white hover:scale-105'
              }`}>
                <Icon className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className={`text-[10px] font-bold mt-0.5 ${isActive ? 'text-emerald-700' : 'text-slate-600'}`}>
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors ${
              isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
