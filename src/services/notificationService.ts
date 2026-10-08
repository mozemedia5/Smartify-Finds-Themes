import { NotificationItem, VerificationRequest } from '../types';

const STORAGE_KEY_NOTIFICATIONS = 'agrisell_notifications_v1';
const STORAGE_KEY_VERIFICATIONS = 'agrisell_verifications_v1';

export class NotificationService {
  public static getNotifications(userId: string): NotificationItem[] {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (!raw) return [];
    try {
      const all: NotificationItem[] = JSON.parse(raw);
      return all.filter(n => n.userId === userId);
    } catch {
      return [];
    }
  }

  public static addNotification(
    userId: string,
    type: NotificationItem['type'],
    title: string,
    body: string,
    link?: string
  ): NotificationItem {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    const notifications: NotificationItem[] = raw ? JSON.parse(raw) : [];

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId,
      type,
      title,
      body,
      link,
      read: false,
      createdAt: new Date().toISOString()
    };

    const updated = [newNotif, ...notifications];
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
    return newNotif;
  }

  public static markAsRead(notificationId: string): void {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (!raw) return;
    try {
      const notifications: NotificationItem[] = JSON.parse(raw);
      const updated = notifications.map(n => n.id === notificationId ? { ...n, read: true } : n);
      localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
    } catch {}
  }
}

export class VerificationService {
  public static getRequests(): VerificationRequest[] {
    const raw = localStorage.getItem(STORAGE_KEY_VERIFICATIONS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static submitRequest(request: Omit<VerificationRequest, 'id' | 'status' | 'submittedAt'>): VerificationRequest {
    const requests = this.getRequests();
    const newReq: VerificationRequest = {
      ...request,
      id: `verif_${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    const updated = [newReq, ...requests];
    localStorage.setItem(STORAGE_KEY_VERIFICATIONS, JSON.stringify(updated));
    return newReq;
  }

  public static updateStatus(requestId: string, status: 'approved' | 'rejected', notes?: string): VerificationRequest | null {
    const requests = this.getRequests();
    const index = requests.findIndex(r => r.id === requestId);
    if (index === -1) return null;
    requests[index].status = status;
    if (notes) requests[index].notes = notes;
    localStorage.setItem(STORAGE_KEY_VERIFICATIONS, JSON.stringify(requests));
    return requests[index];
  }
}
