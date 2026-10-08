import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { OrderService } from '../services/orderService';
import {
  X,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  MessageCircle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone
} from 'lucide-react';

interface CustomerOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onRefreshOrders: () => void;
  onOpenMessageSeller: (sellerId: string, sellerName: string) => void;
}

export const CustomerOrdersModal: React.FC<CustomerOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onRefreshOrders,
  onOpenMessageSeller
}) => {
  if (!isOpen) return null;

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  const handleCancelOrder = (orderId: string) => {
    OrderService.cancelOrder(orderId, cancelReason || 'Customer requested cancellation');
    setCancellingOrderId(null);
    setCancelReason('');
    onRefreshOrders();
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] flex items-center space-x-1"><Clock className="w-3 h-3" /><span>Pending</span></span>;
      case 'Confirmed':
        return <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] flex items-center space-x-1"><CheckCircle2 className="w-3 h-3" /><span>Confirmed</span></span>;
      case 'Processing':
        return <span className="bg-indigo-100 text-indigo-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] flex items-center space-x-1"><Package className="w-3 h-3" /><span>Processing</span></span>;
      case 'Shipped':
        return <span className="bg-purple-100 text-purple-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] flex items-center space-x-1"><Truck className="w-3 h-3" /><span>Shipped</span></span>;
      case 'Delivered':
        return <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] flex items-center space-x-1"><CheckCircle2 className="w-3 h-3" /><span>Delivered</span></span>;
      case 'Cancelled':
        return <span className="bg-rose-100 text-rose-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] flex items-center space-x-1"><XCircle className="w-3 h-3" /><span>Cancelled</span></span>;
    }
  };

  const getTimelineSteps = (status: OrderStatus) => {
    const steps: { label: OrderStatus; done: boolean }[] = [
      { label: 'Pending', done: true },
      { label: 'Confirmed', done: ['Confirmed', 'Processing', 'Shipped', 'Delivered'].includes(status) },
      { label: 'Processing', done: ['Processing', 'Shipped', 'Delivered'].includes(status) },
      { label: 'Shipped', done: ['Shipped', 'Delivered'].includes(status) },
      { label: 'Delivered', done: status === 'Delivered' }
    ];
    return steps;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-auto shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">My Orders & Purchases</h2>
              <p className="text-[10px] text-slate-500">Track current agricultural deliveries and past orders</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-4xl">📦</p>
              <h3 className="text-sm font-bold text-slate-800">No orders placed yet</h3>
              <p className="text-xs text-slate-500">Items you purchase in the marketplace will appear here.</p>
            </div>
          ) : (
            orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const timeline = getTimelineSteps(order.orderStatus);

              return (
                <div
                  key={order.id}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm space-y-3"
                >
                  {/* Summary Bar */}
                  <div
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                    className="p-4 bg-white hover:bg-slate-50 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-slate-900">{order.orderNumber}</span>
                        {getStatusBadge(order.orderStatus)}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} item(s)
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-3">
                      <div className="text-right">
                        <div className="font-black text-slate-900">
                          {order.totalAmount.toLocaleString()} {order.currency}
                        </div>
                        <div className="text-[10px] text-slate-400">{order.paymentMethod}</div>
                      </div>
                      <button className="p-1 text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <div className="p-4 space-y-4 bg-slate-50/50">
                      {/* Timeline status bar */}
                      {order.orderStatus !== 'Cancelled' && (
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                          <h4 className="font-bold text-slate-800 text-[11px]">Delivery Progress</h4>
                          <div className="grid grid-cols-5 gap-1 text-center">
                            {timeline.map((st, i) => (
                              <div key={i} className="space-y-1">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    st.done ? 'bg-emerald-600' : 'bg-slate-200'
                                  }`}
                                ></div>
                                <span
                                  className={`text-[9px] block ${
                                    st.done ? 'font-bold text-emerald-800' : 'text-slate-400'
                                  }`}
                                >
                                  {st.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Items list */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-slate-800 text-[11px]">Items Ordered</h4>
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center space-x-3">
                              <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                              <div>
                                <h5 className="font-bold text-slate-900 line-clamp-1">{item.title}</h5>
                                <p className="text-[10px] text-slate-500">Seller: {item.sellerName}</p>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="font-bold text-slate-900">
                                {item.price.toLocaleString()} {order.currency} × {item.quantity}
                              </div>
                              <button
                                onClick={() => onOpenMessageSeller(item.sellerId, item.sellerName)}
                                className="text-[10px] text-emerald-700 font-bold hover:underline flex items-center justify-end space-x-1 mt-0.5"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>Contact Seller</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Address */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-1">
                        <span className="font-bold text-slate-700 block">Delivery Address:</span>
                        <p className="text-slate-600">{order.deliveryAddress}, {order.district}, {order.region}</p>
                      </div>

                      {/* Actions */}
                      {['Pending', 'Confirmed'].includes(order.orderStatus) && (
                        <div>
                          {cancellingOrderId === order.id ? (
                            <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 space-y-2">
                              <label className="font-bold text-rose-800 block">Reason for cancellation:</label>
                              <input
                                type="text"
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder="Change of plan / wrong quantity..."
                                className="w-full p-2 bg-white border border-rose-200 rounded-lg text-xs"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="bg-rose-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                                >
                                  Confirm Cancel
                                </button>
                                <button
                                  onClick={() => setCancellingOrderId(null)}
                                  className="bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs"
                                >
                                  Back
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setCancellingOrderId(order.id)}
                              className="text-rose-600 font-bold hover:underline text-xs"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
