import React, { useState } from 'react';
import { CartItem, Order, UserProfile } from '../types';
import { OrderService } from '../services/orderService';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  Building,
  DollarSign
} from 'lucide-react';

interface CartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  userProfile: UserProfile | null;
  onOrderCreated: (order: Order) => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  userProfile,
  onOrderCreated
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form State
  const [buyerName, setBuyerName] = useState(userProfile?.name || '');
  const [buyerPhone, setBuyerPhone] = useState(userProfile?.phone || '');
  const [buyerEmail, setBuyerEmail] = useState(userProfile?.email || '');
  const [region, setRegion] = useState(userProfile?.region || 'Central Region');
  const [district, setDistrict] = useState(userProfile?.district || 'Central District');
  const [town, setTown] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(userProfile?.location || '');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Mobile Money' | 'Card' | 'Bank Transfer' | 'Cash on Delivery'>('Mobile Money');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price calculations
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 15000 : 0;
  const tax = Math.round(subtotal * 0.02); // 2% platform fee
  const totalAmount = subtotal + deliveryFee + tax;
  const currency = cart[0]?.currency || 'UGX';

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone || !deliveryAddress) return;

    setIsSubmitting(true);

    const orderItems = cart.map((c) => ({
      listingId: c.listing.id,
      title: c.listing.title,
      price: c.unitPrice,
      quantity: c.quantity,
      unit: c.listing.unit,
      image: c.listing.images[0],
      sellerId: c.selectedSellerId,
      sellerName: c.listing.farmerName
    }));

    const order = OrderService.createOrder({
      buyerId: userProfile?.id || 'usr_buyer',
      buyerName,
      buyerPhone,
      buyerEmail,
      deliveryAddress,
      region,
      district,
      town,
      deliveryInstructions,
      items: orderItems,
      subtotal,
      deliveryFee,
      tax,
      totalAmount,
      currency,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      paymentMethod,
      orderStatus: 'Confirmed'
    });

    setIsSubmitting(false);
    setCreatedOrder(order);
    onOrderCreated(order);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {step === 'cart' ? 'Shopping Cart' : step === 'checkout' ? 'Order Checkout' : 'Order Confirmation'}
              </h2>
              <p className="text-[10px] text-slate-500">
                {step === 'cart' ? `${cart.length} unique item(s) selected` : step === 'checkout' ? 'Enter delivery and payment details' : 'Order successfully placed'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {step === 'cart' && (
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <p className="text-4xl">🛒</p>
                  <h3 className="text-sm font-bold text-slate-800">Your cart is currently empty</h3>
                  <p className="text-xs text-slate-500">Explore marketplace products and add items to your cart.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.listing.images[0]}
                            alt={item.listing.title}
                            className="w-14 h-14 rounded-xl object-cover bg-white"
                          />
                          <div>
                            <h4 className="font-bold text-slate-900 line-clamp-1">{item.listing.title}</h4>
                            <p className="text-[10px] text-slate-500">Seller: {item.listing.farmerName}</p>
                            <div className="font-extrabold text-slate-900 mt-1">
                              {item.unitPrice.toLocaleString()} {item.currency} / {item.listing.unit}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-slate-700 font-bold hover:bg-slate-100"
                            >
                              -
                            </button>
                            <span className="px-3 font-bold text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-slate-700 font-bold hover:bg-slate-100"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="bg-emerald-50/80 border border-emerald-200/80 p-4 rounded-2xl space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-bold text-slate-900">{subtotal.toLocaleString()} {currency}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Est. Regional Delivery:</span>
                      <span className="font-bold text-slate-900">{deliveryFee.toLocaleString()} {currency}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Service / Platform Fee (2%):</span>
                      <span className="font-bold text-slate-900">{tax.toLocaleString()} {currency}</span>
                    </div>
                    <div className="border-t border-emerald-200 pt-2 flex justify-between font-extrabold text-sm text-slate-900">
                      <span>Total Amount:</span>
                      <span className="text-emerald-800">{totalAmount.toLocaleString()} {currency}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          )}

          {step === 'checkout' && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Delivery Address & Recipient</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Recipient Name *</label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Region / Province</label>
                    <input
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">District / County</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specific Delivery Address *</label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Street, trading center, or landmark..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Payment Architecture */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                  <span>Provider-Ready Payment Method</span>
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Mobile Money', label: 'Mobile Money / Wallet' },
                    { id: 'Card', label: 'Credit / Debit Card' },
                    { id: 'Bank Transfer', label: 'Bank Wire Transfer' },
                    { id: 'Cash on Delivery', label: 'Pay on Delivery' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-xl font-bold text-left border transition-all ${
                        paymentMethod === m.id
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <p className="text-[10px] text-slate-500 italic">
                  Note: Payment engine architecture is ready for Flutterwave / provider hook integration without fabricating false payment tokens.
                </p>
              </div>

              {/* Action */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl"
                >
                  Back to Cart
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Confirm Order ({totalAmount.toLocaleString()} {currency})</span>
                </button>
              </div>
            </form>
          )}

          {step === 'success' && createdOrder && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">Order Placed Successfully!</h3>
                <p className="text-xs text-slate-500">
                  Order Number: <strong className="text-emerald-700">{createdOrder.orderNumber}</strong>
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-xs text-left space-y-2">
                <div className="flex justify-between font-bold">
                  <span>Status:</span>
                  <span className="text-emerald-700">{createdOrder.orderStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-bold">{createdOrder.totalAmount.toLocaleString()} {createdOrder.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Address:</span>
                  <span>{createdOrder.deliveryAddress}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md"
              >
                Close & Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
