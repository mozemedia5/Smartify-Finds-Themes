import React, { useState } from 'react';
import { InventoryItem, Listing, Order, UserProfile } from '../types';
import { OrderService } from '../services/orderService';
import {
  Store,
  DollarSign,
  TrendingUp,
  Package,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  Tag,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
  Percent
} from 'lucide-react';

interface SellerDashboardProps {
  userProfile: UserProfile | null;
  listings: Listing[];
  onAddListing: (listing: Listing) => void;
  onDeleteListing: (id: string) => void;
  inventory: InventoryItem[];
  onAddInventoryItem: (item: InventoryItem) => void;
  onUpdateInventoryItem: (item: InventoryItem) => void;
  onDeleteInventoryItem: (id: string) => void;
  onOpenNewListing: () => void;
  orders: Order[];
  onRefreshOrders: () => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  userProfile,
  listings,
  onAddListing,
  onDeleteListing,
  inventory,
  onAddInventoryItem,
  onUpdateInventoryItem,
  onDeleteInventoryItem,
  onOpenNewListing,
  orders,
  onRefreshOrders
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'inventory' | 'orders' | 'promotions'>('overview');

  // Inventory modal state
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [invName, setInvName] = useState('');
  const [invCategory, setInvCategory] = useState('Seeds');
  const [invQty, setInvQty] = useState('');
  const [invUnit, setInvUnit] = useState('bags');
  const [invPrice, setInvPrice] = useState('');
  const [invDistrict, setInvDistrict] = useState(userProfile?.district || 'Central District');
  const [invImageUrl, setInvImageUrl] = useState('');

  // Seller listings filter
  const mySubscribedListings = listings.filter(l => l.sellerId === userProfile?.id || l.farmerName === userProfile?.name);

  // Overview calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const activeListingsCount = mySubscribedListings.length;
  const lowStockItems = inventory.filter(i => i.quantity <= 10 || i.status === 'Low Stock');

  const handleCreateInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invName || !invPrice) return;

    const newItem: InventoryItem = {
      id: `inv_${Date.now()}`,
      sellerId: userProfile?.id || 'usr_seller',
      name: invName,
      category: invCategory,
      quantity: parseInt(invQty) || 10,
      unit: invUnit,
      pricePerUnit: parseFloat(invPrice) || 0,
      currency: 'UGX',
      location: `${invDistrict} Store`,
      district: invDistrict,
      imageUrl: invImageUrl || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600',
      status: parseInt(invQty) <= 10 ? 'Low Stock' : 'In Stock',
      lastUpdated: 'Just now'
    };

    onAddInventoryItem(newItem);
    setIsInventoryModalOpen(false);

    setInvName('');
    setInvPrice('');
    setInvQty('');
    setInvImageUrl('');
  };

  const handleUpdateOrderStatus = (orderId: string, status: any) => {
    OrderService.updateOrderStatus(orderId, status);
    onRefreshOrders();
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Seller Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div className="flex items-center space-x-4">
          <img
            src={userProfile?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'}
            alt={userProfile?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold">{userProfile?.storeName || `${userProfile?.name}'s AgriStore`}</h1>
              {userProfile?.isVerified && (
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <p className="text-xs text-slate-400">
              {userProfile?.jobTitle || 'Merchant / Seller'} • {userProfile?.district}, {userProfile?.region || 'Central Region'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenNewListing}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Product Listing</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
        {[
          { id: 'overview', label: 'Overview Analytics' },
          { id: 'listings', label: `My Listings (${mySubscribedListings.length})` },
          { id: 'inventory', label: `Stock & Inventory (${inventory.length})` },
          { id: 'orders', label: `Customer Orders (${orders.length})` },
          { id: 'promotions', label: 'Promotions & Coupons' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview Analytics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Gross Revenue</span>
              <div className="text-2xl font-black text-slate-900">
                {totalRevenue.toLocaleString()} <span className="text-xs font-normal text-slate-500">UGX</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +12% from last month
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Active Orders</span>
              <div className="text-2xl font-black text-slate-900">{totalOrdersCount}</div>
              <span className="text-[10px] text-slate-500 font-medium">Fulfilled & Pending</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Active Listings</span>
              <div className="text-2xl font-black text-slate-900">{activeListingsCount}</div>
              <span className="text-[10px] text-emerald-600 font-bold">100% Verified Stock</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Low Stock Alerts</span>
              <div className="text-2xl font-black text-amber-600">{lowStockItems.length}</div>
              <span className="text-[10px] text-amber-600 font-bold">Requires replenishment</span>
            </div>
          </div>

          {/* Low Stock Alert Bar */}
          {lowStockItems.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <div>
                  <strong className="font-bold">Attention Required:</strong> {lowStockItems.length} inventory item(s) are running low.
                </div>
              </div>
              <button
                onClick={() => setActiveTab('inventory')}
                className="bg-amber-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-amber-700"
              >
                Update Stock
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Listings Management */}
      {activeTab === 'listings' && (
        <div className="space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Published Listings</h3>
            <button
              onClick={onOpenNewListing}
              className="bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl"
            >
              + Add Listing
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mySubscribedListings.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="flex space-x-3">
                  <img src={item.images[0]} alt={item.title} className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">{item.category}</span>
                    <h4 className="font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                    <div className="font-extrabold text-slate-900">
                      {item.price.toLocaleString()} {item.currency} / {item.unit}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-slate-500">
                  <span>Stock: <strong>{item.stockQty}</strong></span>
                  <button
                    onClick={() => onDeleteListing(item.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Inventory & Warehouse */}
      {activeTab === 'inventory' && (
        <div className="space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Warehouse Stock Batches</h3>
            <button
              onClick={() => setIsInventoryModalOpen(true)}
              className="bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl"
            >
              + Restock Batch
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                  <th className="p-3.5">Batch / Item</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Quantity</th>
                  <th className="p-3.5">Unit Price</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {inventory.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-bold text-slate-900 flex items-center space-x-2">
                      <img src={inv.imageUrl} alt={inv.name} className="w-8 h-8 rounded-lg object-cover bg-slate-100" />
                      <span>{inv.name}</span>
                    </td>
                    <td className="p-3.5">{inv.category}</td>
                    <td className="p-3.5 font-extrabold">{inv.quantity} {inv.unit}</td>
                    <td className="p-3.5 font-extrabold">{inv.pricePerUnit.toLocaleString()} {inv.currency}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${inv.status === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onDeleteInventoryItem(inv.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Customer Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-900">Incoming Orders & Fulfillment</h3>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <div>
                    <span className="font-extrabold text-slate-900">{ord.orderNumber}</span>
                    <span className="text-[10px] text-slate-400 block">{ord.buyerName} • {ord.buyerPhone}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-slate-900">{ord.totalAmount.toLocaleString()} {ord.currency}</span>
                    <span className="text-[10px] text-emerald-700 block font-bold">{ord.orderStatus}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {(['Confirmed', 'Processing', 'Shipped', 'Delivered'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateOrderStatus(ord.id, st)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${ord.orderStatus === st ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      Mark {st}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Restock Inventory Modal */}
      {isInventoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-xs">
            <h3 className="font-bold text-sm text-slate-900">Restock Warehouse Batch</h3>
            <form onSubmit={handleCreateInventory} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Batch Name *</label>
                <input
                  type="text"
                  required
                  value={invName}
                  onChange={(e) => setInvName(e.target.value)}
                  placeholder="e.g. Certified Rice Seed Bags Batch A"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={invQty}
                    onChange={(e) => setInvQty(e.target.value)}
                    placeholder="100"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit Price (UGX)</label>
                  <input
                    type="number"
                    value={invPrice}
                    onChange={(e) => setInvPrice(e.target.value)}
                    placeholder="15000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInventoryModalOpen(false)}
                  className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-md"
                >
                  Save Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
