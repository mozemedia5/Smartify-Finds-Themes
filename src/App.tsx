import React, { useState } from 'react';
import { ActiveTab, UserRole, Listing } from './types';
import { MOCK_LISTINGS, MOCK_MARKET_PRICES, MOCK_AGRI_NEWS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { MarketplaceScreen } from './components/MarketplaceScreen';
import { CoFarmerScreen } from './components/CoFarmerScreen';
import { ConnectScreen } from './components/ConnectScreen';
import { MarketInfoScreen } from './components/MarketInfoScreen';
import { ProfileAndAdminScreen } from './components/ProfileAndAdminScreen';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('farmer');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState<boolean>(false);

  const handleAddListing = (newListing: Listing) => {
    setListings([newListing, ...listings]);
  };

  const handleDeleteListing = (id: string) => {
    setListings(listings.filter(l => l.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewListing={() => {
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

        {activeTab === 'marketplace' && (
          <MarketplaceScreen
            listings={listings}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedListing={selectedListing}
            setSelectedListing={setSelectedListing}
            isNewListingModalOpen={isNewListingModalOpen}
            setIsNewListingModalOpen={setIsNewListingModalOpen}
            onAddListing={handleAddListing}
          />
        )}

        {activeTab === 'cofarmer' && (
          <CoFarmerScreen />
        )}

        {activeTab === 'connect' && (
          <ConnectScreen />
        )}

        {activeTab === 'market_info' && (
          <MarketInfoScreen />
        )}

        {(activeTab === 'profile' || activeTab === 'admin') && (
          <ProfileAndAdminScreen
            currentUserRole={currentUserRole}
            setCurrentUserRole={setCurrentUserRole}
            listings={listings}
            onDeleteListing={handleDeleteListing}
            activeView={activeTab}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
