import { CartItem, Order, OrderStatus } from '../types';

const STORAGE_KEY_CART = 'agrisell_cart_v1';
const STORAGE_KEY_ORDERS = 'agrisell_orders_v1';

export class OrderService {
  // Cart Management
  public static getCart(): CartItem[] {
    const raw = localStorage.getItem(STORAGE_KEY_CART);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static saveCart(cart: CartItem[]): void {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
  }

  public static addToCart(item: Omit<CartItem, 'id' | 'addedAt'>): CartItem[] {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(c => c.listing.id === item.listing.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push({
        ...item,
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        addedAt: new Date().toISOString()
      });
    }
    this.saveCart(cart);
    return cart;
  }

  public static updateCartQuantity(cartItemId: string, quantity: number): CartItem[] {
    let cart = this.getCart();
    if (quantity <= 0) {
      cart = cart.filter(c => c.id !== cartItemId);
    } else {
      cart = cart.map(c => c.id === cartItemId ? { ...c, quantity } : c);
    }
    this.saveCart(cart);
    return cart;
  }

  public static removeFromCart(cartItemId: string): CartItem[] {
    const cart = this.getCart().filter(c => c.id !== cartItemId);
    this.saveCart(cart);
    return cart;
  }

  public static clearCart(): void {
    localStorage.removeItem(STORAGE_KEY_CART);
  }

  // Order Management
  public static getOrders(): Order[] {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static saveOrders(orders: Order[]): void {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }

  public static createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const orders = this.getOrders();
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newOrder, ...orders];
    this.saveOrders(updated);
    this.clearCart();
    return newOrder;
  }

  public static updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;
    orders[index].orderStatus = status;
    orders[index].updatedAt = new Date().toISOString();
    this.saveOrders(orders);
    return orders[index];
  }

  public static cancelOrder(orderId: string, reason?: string): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;
    if (orders[index].orderStatus === 'Delivered') {
      return null; // Cannot cancel delivered order
    }
    orders[index].orderStatus = 'Cancelled';
    orders[index].updatedAt = new Date().toISOString();
    if (reason) {
      orders[index].notes = `Cancelled: ${reason}`;
    }
    this.saveOrders(orders);
    return orders[index];
  }
}
