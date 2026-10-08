import React, { useState, useEffect } from 'react';
import { ActiveTab, UserRole, Listing, UserProfile, InventoryItem, Order, CartItem } from './types';
import { MOCK_LISTINGS, MOCK_MARKET_PRICES, MOCK_AGRI_NEWS } from './data/mockData';
import { MarketplaceService } from './services/marketplaceService';
import { OrderService } from './services/orderService';
import { NotificationService } from './services/notificationService';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { MarketplaceScreen } from './components/MarketplaceScreen';
import { CoFarmerScreen } from './components/CoFarmerScreen';
import { ConnectScreen } from './components/ConnectScreen';
import { MarketInfoScreen } from './components/MarketInfoScreen';
import { ProfileAndAdminScreen } from './components/ProfileAndAdminScreen';
import { SellerDashboard } from './components/SellerDashboard';
import { LoginModal } from './components/LoginModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartCheckoutModal } from './components/CartCheckoutModal';
import { CustomerOrdersModal } from './components/CustomerOrdersModal';
import { MessagingDrawer } from './components/MessagingDrawer';
import { NotificationsModal } from './components/NotificationsModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('farmer');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // E-commerce state
  const [wishlist, setWishlist] = useState<string[]>(() => MarketplaceService.getWishlist());
  const [cart, setCart] = useState<CartItem[]>(() => OrderService.getCart());
  const [orders, setOrders] = useState<Order[]>(() => OrderService.getOrders());

  // Modals / Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [messagingParticipant, setMessagingParticipant] = useState<{ id: string; name: string } | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    id: 'usr_001',
    name: 'Kassim Ssali',
    email: 'kassim@agrisell.com',
    phone: '+256 772 888999',
    whatsapp: '256772888999',
    jobTitle: 'Commercial Seed Producer',
    district: 'Central District',
    region: 'Central Region',
    location: 'Central Agricultural Hub',
    role: 'farmer',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    bio: 'Commercial seed producer & high-yield crop specialist. Dedicated to quality, disease-resistant crop varieties.',
    rating: 4.9,
    totalSales: 128,
    hasSeenCoFarmerOnboarding: false,
    storeName: 'Kassim Certified AgriStore'
  });

  // User Inventory State
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 'inv_1',
      sellerId: 'usr_001',
      name: 'Certified Rice Seed Bags',
      category: 'Seeds',
      quantity: 120,
      unit: 'bags',
      pricePerUnit: 15000,
      currency: 'UGX',
      location: 'Central Warehouse',
      district: 'Central District',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600',
      status: 'In Stock',
      lastUpdated: 'Today'
    },
    {
      id: 'inv_2',
      sellerId: 'usr_001',
      name: 'Organic NPK Fertilizer Batch',
      category: 'Inputs',
      quantity: 45,
      unit: 'bags',
      pricePerUnit: 135000,
      currency: 'UGX',
      location: 'Central Warehouse',
      district: 'Central District',
      imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600',
      status: 'In Stock',
      lastUpdated: 'Yesterday'
    }
  ]);

  const handleToggleWishlist = (productId: string) => {
    const updated = MarketplaceService.toggleWishlist(productId);
    setWishlist(updated);
  };

  const handleAddToCart = (listing: Listing, quantity: number) => {
    const updated = OrderService.addToCart({
      listing,
      quantity,
      unitPrice: listing.price,
      currency: listing.currency,
      selectedSellerId: listing.sellerId || 'usr_seller'
    });
    setCart(updated);

    if (userProfile) {
      NotificationService.addNotification(
        userProfile.id,
        'order',
        'Item Added to Cart',
        `Added ${quantity} x ${listing.title} to your shopping cart.`
      );
    }
  };

  const handleUpdateCartQuantity = (cartItemId: string, quantity: number) => {
    const updated = OrderService.updateCartQuantity(cartItemId, quantity);
    setCart(updated);
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    const updated = OrderService.removeFromCart(cartItemId);
    setCart(updated);
  };

  const handleClearCart = () => {
    OrderService.clearCart();
    setCart([]);
  };

  const handleOrderCreated = (newOrder: Order) => {
    setOrders(OrderService.getOrders());
    setCart([]);
    if (userProfile) {
      NotificationService.addNotification(
        userProfile.id,
        'order',
        'Order Placed Successfully',
        `Your order ${newOrder.orderNumber} for ${newOrder.totalAmount.toLocaleString()} ${newOrder.currency} has been confirmed!`
      );
    }
  };

  const handleOpenMessageSeller = (sellerId: string, sellerName: string) => {
    setMessagingParticipant({ id: sellerId, name: sellerName });
    setIsMessagingOpen(true);
  };

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
          setActiveTab('seller_dashboard');
          setIsNewListingModalOpen(true);
        }}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        unreadNotificationsCount={userProfile ? NotificationService.getNotifications(userProfile.id).filter(n => !n.read).length : 0}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomeScreen
            listings={listings}
            marketPrices={MOCK_MARKET_PRICES}
            agriNews={MOCK_AGRI_NEWS}
            setActiveTab={setActiveTab}
            onSelectListing={(l) => setSelectedListing(l)}
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
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={(l) => setSelectedListing(l)}
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
            onOpenMessageSeller={handleOpenMessageSeller}
          />
        )}

        {activeTab === 'market_info' && (
          <MarketInfoScreen />
        )}

        {activeTab === 'seller_dashboard' && (
          <SellerDashboard
            userProfile={userProfile}
            listings={listings}
            onAddListing={handleAddListing}
            onDeleteListing={handleDeleteListing}
            inventory={inventory}
            onAddInventoryItem={handleAddInventoryItem}
            onUpdateInventoryItem={handleUpdateInventoryItem}
            onDeleteInventoryItem={handleDeleteInventoryItem}
            onOpenNewListing={() => setIsNewListingModalOpen(true)}
            orders={orders}
            onRefreshOrders={() => setOrders(OrderService.getOrders())}
          />
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
              setActiveTab('seller_dashboard');
              setIsNewListingModalOpen(true);
            }}
            activeView={activeTab}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedListing && (
        <ProductDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onAddToCart={handleAddToCart}
          onOpenMessageSeller={handleOpenMessageSeller}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          relatedProducts={listings.filter(l => l.category === selectedListing.category && l.id !== selectedListing.id)}
          onSelectRelatedProduct={(rel) => setSelectedListing(rel)}
        />
      )}

      {/* Cart & Checkout Modal */}
      <CartCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        userProfile={userProfile}
        onOrderCreated={handleOrderCreated}
      />

      {/* Customer Orders Modal */}
      <CustomerOrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onRefreshOrders={() => setOrders(OrderService.getOrders())}
        onOpenMessageSeller={handleOpenMessageSeller}
      />

      {/* Messaging Drawer */}
      <MessagingDrawer
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        currentUserId={userProfile?.id || 'usr_buyer'}
        currentUserName={userProfile?.name || 'Verified User'}
        initialParticipant={messagingParticipant}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        userId={userProfile?.id || 'usr_001'}
      />

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
