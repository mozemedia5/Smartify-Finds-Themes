import React from 'react';
import { ActiveTab, UserRole, UserProfile } from '../types';
import {
  Sprout,
  Store,
  Bot,
  Users,
  TrendingUp,
  User,
  Bell,
  Search,
  ShieldCheck,
  ChevronDown,
  LogIn,
  Cpu
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  userProfile: UserProfile | null;
  onOpenLoginModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNewListing: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUserRole,
  setCurrentUserRole,
  userProfile,
  onOpenLoginModal,
  searchQuery,
  setSearchQuery,
  onOpenNewListing
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-emerald-800 text-white text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium truncate">AgriSell Uganda • Official Agricultural Ecosystem</span>
        </div>
        <div className="flex items-center space-x-3">
          {userProfile ? (
            <div className="flex items-center space-x-2">
              <span className="text-emerald-200 font-semibold truncate hidden sm:inline">{userProfile.name}</span>
              <span className="text-emerald-400">|</span>
              <div className="relative group">
                <button className="flex items-center space-x-1 font-medium hover:text-emerald-200 text-xs">
                  <span>Role: <strong className="capitalize">{currentUserRole}</strong></span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-44 bg-white text-slate-800 rounded-md shadow-lg border border-slate-200 py-1 hidden group-hover:block z-50">
                  {(['farmer', 'buyer', 'business', 'expert', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setCurrentUserRole(r)}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-emerald-50 capitalize font-medium ${currentUserRole === r ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'}`}
                    >
                      {r} Mode
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center space-x-1 font-bold text-amber-300 hover:text-white transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login / Choose Role</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">AgriSell</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 border border-emerald-300 px-1.5 py-0.5 rounded-md">.ug</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Uganda Agri Ecosystem</p>
          </div>
        </div>

        {/* Global Search Box (Desktop & Tablet) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search seeds, machinery, crops, chemicals, livestock, or experts..."
              className="w-full pl-10 pr-10 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'marketplace' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Marketplace</span>
          </button>

          <button
            onClick={() => setActiveTab('tech_zone')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'tech_zone' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Tech Zone</span>
          </button>

          {/* Minimal CoFarmer Nav Icon (No large/intrusive icon) */}
          <button
            onClick={() => setActiveTab('cofarmer')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'cofarmer' ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
            title="AI CoFarmer Assistant"
          >
            <Bot className="w-4 h-4 stroke-[2]" />
            <span>CoFarmer</span>
          </button>

          <button
            onClick={() => setActiveTab('connect')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'connect' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Connect</span>
          </button>

          <button
            onClick={() => setActiveTab('market_info')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'market_info' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Prices & News</span>
          </button>

          {currentUserRole === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'admin' ? 'bg-amber-500 text-white' : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {currentUserRole !== 'buyer' ? (
            <button
              onClick={onOpenNewListing}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600/50 active:scale-95"
            >
              + Post Listing
            </button>
          ) : (
            <button
              onClick={() => setCurrentUserRole('farmer')}
              className="hidden sm:inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-all"
            >
              Switch to Seller
            </button>
          )}

          <button
            onClick={() => setActiveTab('profile')}
            className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-full transition-colors relative"
            title="User Profile"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-full transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
