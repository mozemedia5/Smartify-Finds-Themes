import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { Sprout, Mail, ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [step, setStep] = useState<'auth' | 'role'>('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [fullName, setFullName] = useState('Kassim Ssali');
  const [jobTitle, setJobTitle] = useState('Commercial Farmer');
  const [district, setDistrict] = useState('Wakiso');

  if (!isOpen) return null;

  const handleGoogleAuth = () => {
    setStep('role');
  };

  const handleAppleAuth = () => {
    setStep('role');
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('role');
  };

  const handleFinalizeRole = () => {
    const user: UserProfile = {
      id: 'usr_' + Date.now(),
      name: fullName || 'AgriSell Member',
      email: email || 'user@agrisell.ug',
      phone: '+256 772 123456',
      whatsapp: '256772123456',
      jobTitle: jobTitle || (selectedRole === 'farmer' ? 'Agro Farmer' : selectedRole === 'buyer' ? 'Produce Buyer' : 'Agri Consultant'),
      district: district || 'Kampala',
      location: `${district || 'Kampala'}, Uganda`,
      role: selectedRole,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'AgriSell verified user operating in Uganda agricultural ecosystem.',
      rating: 5.0,
      totalSales: 12,
      hasSeenCoFarmerOnboarding: false
    };

    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 text-white p-6 text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center mb-2">
            <Sprout className="w-7 h-7 text-emerald-300 stroke-[2.2]" />
          </div>
          <h2 className="text-xl font-black">Welcome to AgriSell.ug</h2>
          <p className="text-xs text-emerald-100 mt-1">Uganda's Agricultural Marketplace & AI CoFarmer</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {step === 'auth' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium text-center">
                Sign in or register to connect with verified buyers, farmers & experts
              </p>

              {/* Social Login Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center space-x-2.5 shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleAppleAuth}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2.5 shadow-sm transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.35-.57.66-.97 1.74-.84 2.76 1.01.08 2.05-.51 2.56-1.26z" />
                  </svg>
                  <span>Continue with Apple</span>
                </button>
              </div>

              <div className="relative my-3 flex items-center justify-center">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-white px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute">or email</span>
              </div>

              {/* Email Login Form */}
              <form onSubmit={handleEmailAuth} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kassim@agrisell.ug"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1"
                >
                  <span>Continue to Role Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* STEP 2: ROLE SELECTION WORKFLOW */
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Choose Your Primary Role</h3>
                <p className="text-xs text-slate-500">You can easily switch your role anytime in your profile or header menu.</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { role: 'buyer', label: 'Buyer', desc: 'Browse products, place orders, chat with sellers' },
                  { role: 'farmer', label: 'Farmer / Seller', desc: 'List produce, use CoFarmer AI & manage inventory' },
                  { role: 'expert', label: 'Agronomy Expert', desc: 'Provide advice, verify farms & consult' },
                  { role: 'business', label: 'Agri Business', desc: 'Supplies, machinery, inputs & services' }
                ].map((item) => {
                  const isSelected = selectedRole === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setSelectedRole(item.role as UserRole)}
                      className={`p-3 rounded-2xl text-left border transition-all relative ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      <p className={`text-xs font-extrabold ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                        {item.label}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Extra Details */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Job / Designation</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">District</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between space-x-2">
                <button
                  type="button"
                  onClick={() => setStep('auth')}
                  className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinalizeRole}
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Complete Login as {selectedRole.toUpperCase()}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
