import React, { useState } from 'react';
import { UserRole, Listing, UserProfile, InventoryItem } from '../types';
import {
  User,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Award,
  Shield,
  Trash2,
  Package,
  Plus,
  X,
  Check,
  Building2,
  Image as ImageIcon
} from 'lucide-react';

interface ProfileAndAdminProps {
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  userProfile: UserProfile | null;
  onUpdateProfile: (updated: UserProfile) => void;
  listings: Listing[];
  onDeleteListing: (id: string) => void;
  inventory: InventoryItem[];
  onAddInventoryItem: (item: InventoryItem) => void;
  onUpdateInventoryItem: (item: InventoryItem) => void;
  onDeleteInventoryItem: (id: string) => void;
  onOpenNewListing: () => void;
  activeView: 'profile' | 'admin';
}

export const ProfileAndAdminScreen: React.FC<ProfileAndAdminProps> = ({
  currentUserRole,
  setCurrentUserRole,
  userProfile,
  onUpdateProfile,
  listings,
  onDeleteListing,
  inventory,
  onAddInventoryItem,
  onUpdateInventoryItem,
  onDeleteInventoryItem,
  onOpenNewListing,
  activeView
}) => {
  // Default fallbacks if userProfile is not initialized yet
  const profile: UserProfile = userProfile || {
    id: 'usr_001',
    name: 'Kassim Ssali',
    email: 'kassim@agrisell.ug',
    phone: '+256 772 888999',
    whatsapp: '256772888999',
    jobTitle: 'Commercial Seed Producer',
    district: 'Wakiso',
    location: 'Wakiso District, Uganda',
    role: currentUserRole,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    bio: 'Commercial seed producer & coffee farmer in Central Region, Uganda. Dedicated to high-yielding, disease-resistant crop varieties.',
    rating: 4.9,
    totalSales: 128
  };

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editPhone, setEditPhone] = useState(profile.phone);
  const [editWhatsapp, setEditWhatsapp] = useState(profile.whatsapp);
  const [editJobTitle, setEditJobTitle] = useState(profile.jobTitle || '');
  const [editDistrict, setEditDistrict] = useState(profile.district || 'Kampala');
  const [editBio, setEditBio] = useState(profile.bio);

  // New Inventory Item Form Modal State
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [invName, setInvName] = useState('');
  const [invCategory, setInvCategory] = useState('Produce');
  const [invQty, setInvQty] = useState('');
  const [invUnit, setInvUnit] = useState('kg');
  const [invPrice, setInvPrice] = useState('');
  const [invImage, setInvImage] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name: editName,
      email: editEmail,
      phone: editPhone,
      whatsapp: editWhatsapp,
      jobTitle: editJobTitle,
      district: editDistrict,
      location: `${editDistrict}, Uganda`,
      bio: editBio
    };
    onUpdateProfile(updated);
    setIsEditingProfile(false);
  };

  const handleAddInventorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invName || !invQty || !invPrice) return;

    const newItem: InventoryItem = {
      id: 'inv_' + Date.now(),
      name: invName,
      category: invCategory,
      quantity: Number(invQty),
      unit: invUnit,
      pricePerUnitUgx: Number(invPrice),
      location: profile.district,
      imageUrl: invImage || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600',
      status: Number(invQty) > 20 ? 'In Stock' : Number(invQty) > 0 ? 'Low Stock' : 'Sold Out',
      lastUpdated: 'Just now'
    };

    onAddInventoryItem(newItem);
    setIsInventoryModalOpen(false);
    setInvName('');
    setInvQty('');
    setInvPrice('');
    setInvImage('');
  };

  return (
    <div className="space-y-6 pb-20">
      {activeView === 'profile' ? (
        /* USER PROFILE VIEW */
        <div className="space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden space-y-4">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800"></div>

            <div className="relative pt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
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
                        <span>Verified Member</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-semibold capitalize">
                    {profile.jobTitle || profile.role} • {profile.district}, Uganda
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? 'Cancel Editing' : 'Profile Settings'}</span>
                </button>
              </div>
            </div>

            {/* Profile Settings Form (Editable) */}
            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                <h3 className="font-extrabold text-slate-900 text-sm">Update Saved Profile Details</h3>
                <p className="text-slate-500 text-[11px]">
                  These contact and location details are automatically attached when you publish products or services on AgriSell.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Job Title / Role</label>
                    <input
                      type="text"
                      value={editJobTitle}
                      onChange={(e) => setEditJobTitle(e.target.value)}
                      placeholder="e.g. Organic Produce Farmer"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">District / Location</label>
                    <input
                      type="text"
                      required
                      value={editDistrict}
                      onChange={(e) => setEditDistrict(e.target.value)}
                      placeholder="e.g. Masaka / Wakiso"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">WhatsApp Contact</label>
                    <input
                      type="text"
                      value={editWhatsapp}
                      onChange={(e) => setEditWhatsapp(e.target.value)}
                      placeholder="256772000000"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Farm / Enterprise Bio</label>
                  <textarea
                    rows={3}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all"
                >
                  Save Profile Settings
                </button>
              </form>
            ) : (
              /* Bio View */
              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About / Farm Enterprise</h3>
                <p className="text-xs text-slate-700 leading-relaxed mt-1">{profile.bio}</p>
              </div>
            )}

            {/* Saved Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Phone & WhatsApp</span>
                  <span className="font-semibold text-slate-800">{profile.phone}</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Email</span>
                  <span className="font-semibold text-slate-800 truncate">{profile.email}</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Reputation</span>
                  <span className="font-semibold text-slate-800">{profile.rating} Rating ({profile.totalSales} Sales)</span>
                </div>
              </div>
            </div>
          </div>

          {/* INVENTORY MANAGEMENT SECTION (For Farmers/Sellers/Businesses) */}
          {currentUserRole !== 'buyer' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
                    <Package className="w-5 h-5 text-emerald-700" />
                    <span>My Inventory Management</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Track stock quantities, produce batches, update images & manage farm inventory.</p>
                </div>

                <button
                  onClick={() => setIsInventoryModalOpen(true)}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Item</span>
                </button>
              </div>

              {inventory.length === 0 ? (
                <div className="bg-slate-50/60 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-3">
                  <Package className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No items in your inventory yet. Add produce, seeds, or chemicals to easily keep track of quantities.
                  </p>
                  <button
                    onClick={() => setIsInventoryModalOpen(true)}
                    className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm"
                  >
                    Add Inventory Item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {inventory.map((inv) => (
                    <div key={inv.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2 flex flex-col justify-between">
                      <div className="flex items-start space-x-3">
                        <img src={inv.imageUrl} alt={inv.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-slate-900">{inv.name}</h4>
                          <span className="text-[10px] font-semibold text-slate-500">{inv.category} • {inv.location}</span>
                          <p className="text-xs font-extrabold text-emerald-800 mt-0.5">
                            {inv.pricePerUnitUgx.toLocaleString()} UGX / {inv.unit}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          inv.status === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {inv.quantity} {inv.unit} ({inv.status})
                        </span>

                        <button
                          onClick={() => onDeleteInventoryItem(inv.id)}
                          className="p-1 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                          title="Delete Inventory Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MY ACTIVE LISTINGS SECTION */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  My Active Marketplace Listings ({listings.length})
                </h2>
                <p className="text-xs text-slate-500">Live products and services published on AgriSell.ug marketplace</p>
              </div>

              <button
                onClick={onOpenNewListing}
                className="px-3 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-emerald-800 transition-colors"
              >
                + Post Listing
              </button>
            </div>

            {/* If listings empty, show elegant pale ink empty state */}
            {listings.length === 0 ? (
              <div className="bg-emerald-50/40 border-2 border-dashed border-emerald-200/80 rounded-2xl p-8 text-center space-y-3">
                <Package className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-xs font-bold text-slate-700">No Active Listings</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  You have not posted any active agricultural produce or service listings yet.
                </p>
                <button
                  onClick={onOpenNewListing}
                  className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-800 transition-all"
                >
                  + Add Your First Listing
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {listings.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <img src={item.images[0]} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        <p className="text-[11px] text-emerald-800 font-extrabold">
                          {item.priceUgx.toLocaleString()} UGX/{item.unit} • {item.location}
                        </p>
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
            )}
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
              <p className="text-2xl font-black text-amber-600 mt-1">0</p>
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

      {/* Modal - Add Inventory Item */}
      {isInventoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-200 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add Inventory Stock Item</h3>
              <button onClick={() => setIsInventoryModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddInventorySubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  value={invName}
                  onChange={(e) => setInvName(e.target.value)}
                  placeholder="e.g. Yellow Beans Batch / Coffee Bags"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={invCategory}
                    onChange={(e) => setInvCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="Produce">Produce / Harvest</option>
                    <option value="Seeds">Seeds</option>
                    <option value="Inputs">Inputs / Chemicals</option>
                    <option value="Machinery">Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quantity *</label>
                  <input
                    type="number"
                    required
                    value={invQty}
                    onChange={(e) => setInvQty(e.target.value)}
                    placeholder="100"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={invUnit}
                    onChange={(e) => setInvUnit(e.target.value)}
                    placeholder="kg / bags / pcs"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price per Unit (UGX) *</label>
                  <input
                    type="number"
                    required
                    value={invPrice}
                    onChange={(e) => setInvPrice(e.target.value)}
                    placeholder="3500"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={invImage}
                  onChange={(e) => setInvImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Save Item to Inventory
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
