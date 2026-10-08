import React, { useState } from 'react';
import { UserRole, UserProfile, InventoryItem, Listing } from '../types';
import { VerificationService } from '../services/notificationService';
import { ShieldCheck, Upload, CheckCircle2, User, Building, Award } from 'lucide-react';

interface ProfileAndAdminScreenProps {
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  userProfile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
  listings: Listing[];
  onDeleteListing: (id: string) => void;
  inventory: InventoryItem[];
  onAddInventoryItem: (item: InventoryItem) => void;
  onUpdateInventoryItem: (item: InventoryItem) => void;
  onDeleteInventoryItem: (id: string) => void;
  onOpenNewListing: () => void;
  activeView?: 'profile' | 'admin';
}

export const ProfileAndAdminScreen: React.FC<ProfileAndAdminScreenProps> = ({
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
  activeView = 'profile'
}) => {
  const [docType, setDocType] = useState<'National ID' | 'Business License' | 'Agronomist Certificate' | 'Land Title / Lease'>('National ID');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    VerificationService.submitRequest({
      userId: userProfile.id,
      userName: userProfile.name,
      userEmail: userProfile.email,
      role: userProfile.role,
      documentType: docType
    });

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6 pb-20 text-xs">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={userProfile?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'}
            alt={userProfile?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500"
          />
          <div>
            <h1 className="text-xl font-bold">{userProfile?.name}</h1>
            <p className="text-slate-400">{userProfile?.jobTitle} • {userProfile?.district}</p>
          </div>
        </div>
      </div>

      {/* Verification Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">Official Verification Request</h3>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-50 text-emerald-900 p-4 rounded-2xl flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Verification documents submitted! Verification badge will be issued upon review.</span>
          </div>
        ) : (
          <form onSubmit={handleVerificationSubmit} className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Document Type *</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="National ID">National ID / Passport</option>
                <option value="Business License">Business Registration License</option>
                <option value="Agronomist Certificate">Agronomist / Vet Certification</option>
                <option value="Land Title / Lease">Land Title / Lease Agreement</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-sm"
            >
              Submit Verification Credentials
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
