import React, { useState } from 'react';
import { UserRole, Listing, UserProfile } from '../types';
import {
  User,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Settings,
  LogOut,
  CheckCircle2,
  Store,
  Plus,
  Edit3,
  Award,
  Sparkles,
  Shield,
  Trash2,
  AlertTriangle
} from 'lucide-react';

interface ProfileAndAdminProps {
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  listings: Listing[];
  onDeleteListing: (id: string) => void;
  activeView: 'profile' | 'admin';
}

export const ProfileAndAdminScreen: React.FC<ProfileAndAdminProps> = ({
  currentUserRole,
  setCurrentUserRole,
  listings,
  onDeleteListing,
  activeView
}) => {
  const [profile, setProfile] = useState<UserProfile>({
    id: 'usr_001',
    name: 'Kassim Ssali',
    email: 'kassim@agrisell.ug',
    phone: '+256 772 888999',
    location: 'Wakiso District, Uganda',
    role: currentUserRole,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    bio: 'Commercial seed producer & coffee farmer in Central Region, Uganda. Dedicated to high-yielding, disease-resistant crop varieties.',
    rating: 4.9,
    totalSales: 128
  });

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(profile.bio);

  const handleSaveBio = () => {
    setProfile({ ...profile, bio: bioInput });
    setIsEditingBio(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {activeView === 'profile' ? (
        /* USER PROFILE VIEW */
        <div className="space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden space-y-4">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-emerald-800 to-green-700"></div>

            <div className="relative pt-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex items-end space-x-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-black text-slate-900">{profile.name}</h1>
                    {profile.isVerified && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 border border-emerald-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Farmer</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-semibold capitalize">{profile.role} • {profile.location}</p>
                </div>
              </div>

              {/* Role Switcher Pill */}
              <div className="bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex items-center space-x-1 text-xs">
                <span className="text-slate-500 font-bold px-2">Mode:</span>
                {(['farmer', 'buyer', 'expert', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setCurrentUserRole(r);
                      setProfile({ ...profile, role: r });
                    }}
                    className={`px-3 py-1 rounded-lg font-bold capitalize transition-all ${
                      currentUserRole === r ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About / Bio</h3>
                {!isEditingBio && (
                  <button onClick={() => setIsEditingBio(true)} className="text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1">
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Bio</span>
                  </button>
                )}
              </div>

              {isEditingBio ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    rows={3}
                    value={bioInput}
                    onChange={(e) => setBioInput(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                  <button onClick={handleSaveBio} className="px-3 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded-lg">
                    Save Changes
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-700 leading-relaxed mt-1">{profile.bio}</p>
              )}
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">{profile.phone}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">{profile.email}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-800">{profile.rating} Rating ({profile.totalSales} Sales)</span>
              </div>
            </div>
          </div>

          {/* User's Posted Listings Management */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Store className="w-5 h-5 text-emerald-700" />
                <span>My Active Listings ({listings.length})</span>
              </h2>
            </div>

            <div className="divide-y divide-slate-100">
              {listings.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <img src={item.images[0]} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-emerald-800 font-extrabold">{item.priceUgx.toLocaleString()} UGX/{item.unit}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteListing(item.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ADMIN DASHBOARD VIEW */
        <div className="space-y-6">
          <div className="bg-amber-500 text-white rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-black">AgriSell Admin Moderation Center</h1>
                <p className="text-xs text-amber-100">Platform oversight, user verification, and content moderation.</p>
              </div>
            </div>
          </div>

          {/* Admin Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Listings</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{listings.length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold text-slate-400 uppercase">Verified Farmers</span>
              <p className="text-2xl font-black text-emerald-700 mt-1">1,420</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold text-slate-400 uppercase">AI Queries Today</span>
              <p className="text-2xl font-black text-blue-700 mt-1">3,890</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold text-slate-400 uppercase">Pending Moderation</span>
              <p className="text-2xl font-black text-amber-600 mt-1">2</p>
            </div>
          </div>

          {/* Moderate Marketplace Listings Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Moderate Active Marketplace Listings</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {listings.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={item.images[0]} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-500">{item.farmerName} • {item.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md font-bold">Approved</span>
                    <button
                      onClick={() => onDeleteListing(item.id)}
                      className="p-1.5 bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white rounded-lg transition-colors"
                      title="Remove Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
