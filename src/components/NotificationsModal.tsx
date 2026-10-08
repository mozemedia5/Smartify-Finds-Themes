import React from 'react';
import { NotificationItem } from '../types';
import { NotificationService } from '../services/notificationService';
import { X, Bell, CheckCircle2, Package, MessageCircle, ShieldCheck } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  userId
}) => {
  if (!isOpen) return null;

  const notifications = NotificationService.getNotifications(userId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl relative text-xs">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-sm text-slate-900">Notification Center</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <p>No new notifications at this moment.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => NotificationService.markAsRead(n.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  n.read ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-emerald-50/60 border-emerald-200 text-slate-900 font-medium'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xs">{n.title}</h4>
                  <span className="text-[9px] text-slate-400">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-[11px] mt-1">{n.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
