import { Injectable, signal } from '@angular/core';

export interface INotification {
  id: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  actionUrl?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = signal<INotification[]>([]);
  private unreadCount = signal<number>(0);
  
  constructor() {
    // Load mock data
    this.loadMockNotifications();
  }
  
  private loadMockNotifications() {
    const mockNotifications: INotification[] = [
      {
        id: '1',
        title: 'Welcome!',
        message: '👋 Welcome aboard! We\'re thrilled to have you join our platform.',
        timestamp: new Date(),
        isRead: false,
        type: 'success'
      },
      {
        id: '2',
        title: 'Profile Updated',
        message: '🔔 Your profile has been successfully updated.',
        timestamp: new Date(Date.now() - 3600000),
        isRead: false,
        type: 'info'
      },
      {
        id: '3',
        title: 'Security Alert',
        message: '⚠️ Please review your security settings to keep your account safe.',
        timestamp: new Date(Date.now() - 86400000),
        isRead: true,
        type: 'warning'
      },
      {
        id: '4',
        title: 'Payment Failed',
        message: '❌ Failed to process your last payment. Please update your payment method.',
        timestamp: new Date(Date.now() - 172800000),
        isRead: false,
        type: 'error'
      },
      {
        id: '5',
        title: 'New Feature',
        message: '🎉 New feature available! Check out our latest updates.',
        timestamp: new Date(Date.now() - 259200000),
        isRead: true,
        type: 'info'
      },
      {
        id: '6',
        title: 'Team Message',
        message: 'Team meeting scheduled for tomorrow at 10 AM.',
        timestamp: new Date(Date.now() - 43200000),
        isRead: false,
        type: 'info'
      }
    ];
    
    this.notifications.set(mockNotifications);
    this.updateUnreadCount();
  }
  
  getNotifications() {
    return this.notifications.asReadonly();
  }
  
  getUnreadCount() {
    return this.unreadCount.asReadonly();
  }
  
  addNotification(notification: Omit<INotification, 'id' | 'timestamp' | 'isRead'>) {
    const newNotif: INotification = {
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
      ...notification
    };
    this.notifications.update(prev => [newNotif, ...prev]);
    this.updateUnreadCount();
  }
  
  markAsRead(id: string) {
    this.notifications.update(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    this.updateUnreadCount();
  }
  
  markAllAsRead() {
    this.notifications.update(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
    this.updateUnreadCount();
  }
  
  deleteNotification(id: string) {
    this.notifications.update(prev => prev.filter(n => n.id !== id));
    this.updateUnreadCount();
  }
  
  clearAll() {
    this.notifications.set([]);
    this.updateUnreadCount();
  }
  
  private updateUnreadCount() {
    const count = this.notifications().filter(n => !n.isRead).length;
    this.unreadCount.set(count);
  }
}