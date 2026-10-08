import { Listing, ProductReview } from '../types';
import { MOCK_LISTINGS } from '../data/mockData';

const STORAGE_KEY_PRODUCTS = 'agrisell_products_v1';
const STORAGE_KEY_WISHLIST = 'agrisell_wishlist_v1';
const STORAGE_KEY_REVIEWS = 'agrisell_reviews_v1';

export class MarketplaceService {
  private static getStoredProducts(): Listing[] {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(MOCK_LISTINGS));
      return MOCK_LISTINGS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return MOCK_LISTINGS;
    }
  }

  private static saveProducts(products: Listing[]): void {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }

  public static async getProducts(): Promise<Listing[]> {
    return this.getStoredProducts();
  }

  public static async getProductById(id: string): Promise<Listing | null> {
    const products = this.getStoredProducts();
    return products.find(p => p.id === id) || null;
  }

  public static async addProduct(product: Omit<Listing, 'id' | 'createdAt'>): Promise<Listing> {
    const products = this.getStoredProducts();
    const newProduct: Listing = {
      ...product,
      id: `prod_${Date.now()}`,
      createdAt: 'Just now'
    };
    const updated = [newProduct, ...products];
    this.saveProducts(updated);
    return newProduct;
  }

  public static async updateProduct(id: string, updates: Partial<Listing>): Promise<Listing | null> {
    const products = this.getStoredProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates };
    this.saveProducts(products);
    return products[index];
  }

  public static async deleteProduct(id: string): Promise<boolean> {
    const products = this.getStoredProducts();
    const filtered = products.filter(p => p.id !== id);
    this.saveProducts(filtered);
    return true;
  }

  // Wishlist
  public static getWishlist(): string[] {
    const raw = localStorage.getItem(STORAGE_KEY_WISHLIST);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static toggleWishlist(productId: string): string[] {
    const current = this.getWishlist();
    let updated: string[];
    if (current.includes(productId)) {
      updated = current.filter(id => id !== productId);
    } else {
      updated = [...current, productId];
    }
    localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(updated));
    return updated;
  }

  // Product Reviews
  public static getReviewsForProduct(productId: string): ProductReview[] {
    const raw = localStorage.getItem(STORAGE_KEY_REVIEWS);
    const reviews: ProductReview[] = raw ? JSON.parse(raw) : [];
    return reviews.filter(r => r.listingId === productId);
  }

  public static addReview(review: Omit<ProductReview, 'id' | 'date'>): ProductReview {
    const raw = localStorage.getItem(STORAGE_KEY_REVIEWS);
    const reviews: ProductReview[] = raw ? JSON.parse(raw) : [];
    const newReview: ProductReview = {
      ...review,
      id: `rev_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updated = [newReview, ...reviews];
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(updated));
    return newReview;
  }
}
