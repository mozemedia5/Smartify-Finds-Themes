import React, { useState } from 'react';
import { Listing, ProductReview } from '../types';
import { MarketplaceService } from '../services/marketplaceService';
import {
  X,
  Star,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  MessageCircle,
  ShoppingBag,
  Heart,
  Truck,
  Package,
  Share2,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface ProductDetailModalProps {
  listing: Listing | null;
  onClose: () => void;
  onAddToCart: (listing: Listing, quantity: number) => void;
  onOpenMessageSeller: (sellerId: string, sellerName: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  relatedProducts: Listing[];
  onSelectRelatedProduct: (listing: Listing) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  listing,
  onClose,
  onAddToCart,
  onOpenMessageSeller,
  wishlist,
  onToggleWishlist,
  relatedProducts,
  onSelectRelatedProduct
}) => {
  if (!listing) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'usage' | 'reviews'>('description');

  // Review Form State
  const [reviews, setReviews] = useState<ProductReview[]>(() =>
    MarketplaceService.getReviewsForProduct(listing.id)
  );
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('');

  const isWishlisted = wishlist.includes(listing.id);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = MarketplaceService.addReview({
      listingId: listing.id,
      userId: 'usr_buyer',
      userName: reviewerName.trim() || 'Verified Buyer',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      rating: newRating,
      comment: newComment,
      verifiedPurchase: true
    });

    setReviews([added, ...reviews]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Sticky Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md uppercase">
              {listing.category}
            </span>
            {listing.subcategory && (
              <span className="text-xs text-slate-500 font-medium">
                • {listing.subcategory}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleWishlist(listing.id)}
              className="p-2 text-slate-500 hover:text-rose-500 rounded-full hover:bg-slate-100 transition-colors"
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Gallery & Images */}
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden border border-slate-200/80 relative">
                <img
                  src={listing.images[selectedImageIndex] || listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                {listing.isVerified && (
                  <span className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Source</span>
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {listing.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImageIndex === idx ? 'border-emerald-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Delivery info card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center space-x-2 font-bold text-slate-800">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>Delivery & Dispatch</span>
                </div>
                <p className="text-slate-600">
                  Ships directly from seller in <strong className="text-slate-900">{listing.location}</strong>. Standard delivery time: 1 - 3 business days.
                </p>
              </div>
            </div>

            {/* Right: Product Meta & Purchase Box */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {listing.title}
                </h1>

                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 mr-1" />
                    <span>{listing.rating}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">{listing.reviewsCount} Customer Reviews</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    {listing.stockStatus || 'In Stock'}
                  </span>
                </div>

                {/* Price Display */}
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900">
                      {listing.price.toLocaleString()}{' '}
                      <span className="text-sm font-normal text-slate-600">
                        {listing.currency} / {listing.unit}
                      </span>
                    </div>
                    {listing.originalPrice && (
                      <div className="text-xs text-slate-400 line-through">
                        {listing.originalPrice.toLocaleString()} {listing.currency}
                      </div>
                    )}
                  </div>
                  <div className="text-right text-xs text-slate-500 font-medium">
                    Stock: <strong className="text-slate-800">{listing.stockQty}</strong>
                  </div>
                </div>

                {/* Seller Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={listing.farmerAvatar}
                      alt={listing.farmerName}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs font-bold text-slate-900">{listing.farmerName}</span>
                        {listing.isVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">{listing.farmerRole}</p>
                      <p className="text-[10px] text-slate-400 flex items-center mt-0.5">
                        <MapPin className="w-3 h-3 mr-0.5" />
                        {listing.location}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenMessageSeller(listing.sellerId || 'usr_seller', listing.farmerName)}
                    className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Message</span>
                  </button>
                </div>

                {/* Quantity & Actions */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-slate-700">Quantity:</span>
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-xs font-bold text-slate-900">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        onAddToCart(listing, quantity);
                        onClose();
                      }}
                      className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add {quantity} to Cart</span>
                    </button>

                    <a
                      href={`https://wa.me/${listing.whatsapp}?text=Hello%20${encodeURIComponent(listing.farmerName)},%20I%20am%20interested%20in%20buying%20"${encodeURIComponent(listing.title)}"%20on%20AgriSell.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp Seller</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info Tabs */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            <div className="flex border-b border-slate-200 space-x-6 text-xs font-bold">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-3 transition-colors ${activeTab === 'description' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 transition-colors ${activeTab === 'specs' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`pb-3 transition-colors ${activeTab === 'usage' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Usage & Packaging
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 transition-colors ${activeTab === 'reviews' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Customer Reviews ({reviews.length})
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'description' && (
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {listing.description}
              </p>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {listing.specifications ? (
                  listing.specifications.map((s, i) => (
                    <div key={i} className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                      <span className="text-slate-500 font-medium">{s.label}</span>
                      <span className="font-bold text-slate-900">{s.value}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">Standard agricultural product specifications certified by supplier.</p>
                )}
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-3 text-xs text-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Recommended Usage Guidelines:</h4>
                  <p>{listing.usageInfo || 'Store in a cool dry place. Follow standard agricultural dosage and safety guidelines.'}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Packaging Info:</h4>
                  <p>{listing.packagingInfo || 'Sealed moisture-resistant bags / eco-friendly transport packaging.'}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Submit review */}
                <form onSubmit={handleAddReview} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 text-xs">
                  <h4 className="font-bold text-slate-900">Write a Review</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="Your Name (e.g. John K.)"
                      className="p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-700">Rating:</span>
                      <select
                        value={newRating}
                        onChange={(e) => setNewRating(parseInt(e.target.value))}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl font-bold"
                      >
                        <option value={5}>5 Stars ★★★★★</option>
                        <option value={4}>4 Stars ★★★★☆</option>
                        <option value={3}>3 Stars ★★★☆☆</option>
                        <option value={2}>2 Stars ★★☆☆☆</option>
                        <option value={1}>1 Star ★☆☆☆☆</option>
                      </select>
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience regarding germination rate, delivery time, or product quality..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
                  >
                    Submit Review
                  </button>
                </form>

                {/* Review list */}
                <div className="space-y-3">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-white border border-slate-200/80 rounded-2xl space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.5 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-slate-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-slate-200 pt-6 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">Related Recommendations</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedProducts.slice(0, 4).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedProduct(rel)}
                    className="bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl p-3 cursor-pointer transition-all space-y-2 group"
                  >
                    <img src={rel.images[0]} alt={rel.title} className="aspect-[4/3] rounded-xl object-cover w-full bg-slate-200" />
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700">{rel.title}</h4>
                    <div className="text-xs font-extrabold text-slate-900">
                      {rel.price.toLocaleString()} {rel.currency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
