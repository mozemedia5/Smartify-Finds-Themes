import React, { useState } from 'react';
import { ActiveTab, UserRole, Listing, UserProfile, InventoryItem } from './types';
import { MOCK_LISTINGS, MOCK_MARKET_PRICES, MOCK_AGRI_NEWS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { MarketplaceScreen } from './components/MarketplaceScreen';
import { CoFarmerScreen } from './components/CoFarmerScreen';
import { ConnectScreen } from './components/ConnectScreen';
import { MarketInfoScreen } from './components/MarketInfoScreen';
import { ProfileAndAdminScreen } from './components/ProfileAndAdminScreen';
import { LoginModal } from './components/LoginModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('farmer');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    id: 'usr_001',
    name: 'Kassim Ssali',
    email: 'kassim@agrisell.ug',
    phone: '+256 772 888999',
    whatsapp: '256772888999',
    jobTitle: 'Commercial Seed Producer',
    district: 'Wakiso',
    location: 'Wakiso District, Uganda',
    role: 'farmer',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    bio: 'Commercial seed producer & coffee farmer in Central Region, Uganda. Dedicated to high-yielding, disease-resistant crop varieties.',
    rating: 4.9,
    totalSales: 128,
    hasSeenCoFarmerOnboarding: false
  });

  // User Inventory State
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 'inv_1',
      name: 'BRR Certified Rice Seed Bags',
      category: 'Seeds',
      quantity: 120,
      unit: 'bags',
      pricePerUnitUgx: 15000,
      location: 'Wakiso Hub',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600',
      status: 'In Stock',
      lastUpdated: 'Today'
    },
    {
      id: 'inv_2',
      name: 'Organic NPK Fertilizer Batch',
      category: 'Inputs',
      quantity: 45,
      unit: 'bags',
      pricePerUnitUgx: 135000,
      location: 'Wakiso Hub',
      imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600',
      status: 'In Stock',
      lastUpdated: 'Yesterday'
    }
  ]);

  const handleAddListing = (newListing: Listing) => {
    setListings([newListing, ...listings]);
  };

  const handleDeleteListing = (id: string) => {
    setListings(listings.filter(l => l.id !== id));
  };

  const handleAddInventoryItem = (item: InventoryItem) => {
    setInventory([item, ...inventory]);
  };

  const handleUpdateInventoryItem = (item: InventoryItem) => {
    setInventory(inventory.map(i => i.id === item.id ? item : i));
  };

  const handleDeleteInventoryItem = (id: string) => {
    setInventory(inventory.filter(i => i.id !== id));
  };

  const handleLoginSuccess = (updatedUser: UserProfile) => {
    setUserProfile(updatedUser);
    setCurrentUserRole(updatedUser.role);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
        userProfile={userProfile}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewListing={() => {
          if (currentUserRole === 'buyer') {
            setCurrentUserRole('farmer');
          }
          setActiveTab('marketplace');
          setIsNewListingModalOpen(true);
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomeScreen
            listings={listings}
            marketPrices={MOCK_MARKET_PRICES}
            agriNews={MOCK_AGRI_NEWS}
            setActiveTab={setActiveTab}
            onSelectListing={(l) => {
              setSelectedListing(l);
              setActiveTab('marketplace');
            }}
            searchQuery={searchQuery}
          />
        )}

        {(activeTab === 'marketplace' || activeTab === 'tech_zone') && (
          <MarketplaceScreen
            listings={listings}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedListing={selectedListing}
            setSelectedListing={setSelectedListing}
            isNewListingModalOpen={isNewListingModalOpen}
            setIsNewListingModalOpen={setIsNewListingModalOpen}
            onAddListing={handleAddListing}
            userProfile={userProfile}
            techZoneOnly={activeTab === 'tech_zone'}
          />
        )}

        {activeTab === 'cofarmer' && (
          <CoFarmerScreen
            currentUserRole={currentUserRole}
            setCurrentUserRole={setCurrentUserRole}
          />
        )}

        {activeTab === 'connect' && (
          <ConnectScreen
            currentUserRole={currentUserRole}
            userProfile={userProfile}
          />
        )}

        {activeTab === 'market_info' && (
          <MarketInfoScreen />
        )}

        {(activeTab === 'profile' || activeTab === 'admin') && (
          <ProfileAndAdminScreen
            currentUserRole={currentUserRole}
            setCurrentUserRole={setCurrentUserRole}
            userProfile={userProfile}
            onUpdateProfile={(up) => setUserProfile(up)}
            listings={listings}
            onDeleteListing={handleDeleteListing}
            inventory={inventory}
            onAddInventoryItem={handleAddInventoryItem}
            onUpdateInventoryItem={handleUpdateInventoryItem}
            onDeleteInventoryItem={handleDeleteInventoryItem}
            onOpenNewListing={() => {
              if (currentUserRole === 'buyer') {
                setCurrentUserRole('farmer');
              }
              setActiveTab('marketplace');
              setIsNewListingModalOpen(true);
            }}
            activeView={activeTab}
          />
        )}
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
