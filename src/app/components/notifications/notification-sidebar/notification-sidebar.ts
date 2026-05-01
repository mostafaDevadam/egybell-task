import { Component, effect, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';
import { INotification, NotificationService } from '../notification-service';
import { SocketSignalStore } from '../../../signal-store/socket-signal.store';

@Component({
  selector: 'app-notification-sidebar',
  imports: [],
  templateUrl: './notification-sidebar.html',
  styleUrl: './notification-sidebar.css',
})
export class NotificationSidebar {

  private notificationService = inject(NotificationService);
  private elementRef = inject(ElementRef);
  
  // Inputs and Outputs
  isOpen = input<boolean>(false);
  close = output<void>();

  /*
  isRippling = signal<boolean>(false);
  shouldAnimate = signal<boolean>(false);
  
  // State
  filter = signal<'all' | 'unread'>('all');
  notifications = this.notificationService.getNotifications();
  unreadCount = this.notificationService.getUnreadCount();
  
  // Computed filtered notifications
  filteredNotifications = signal<INotification[]>([]);
  
  constructor() {
    // Update filtered notifications when filter or notifications change
    effect(() => {
      const allNotifs = this.notifications();
      const currentFilter = this.filter();
      
      if (currentFilter === 'unread') {
        this.filteredNotifications.set(allNotifs!!.filter(n => !n?.isRead));
      } else {
        //this.filteredNotifications.set(allNotifs as Notification[]);
      }
    });
  }
  
  setFilter(filter: 'all' | 'unread') {
    this.filter.set(filter);
  }
  
  markAsRead(id: string) {
    this.notificationService.markAsRead(id);
  }
  
  markAllAsRead() {
    this.notificationService.markAllAsRead();
  }
  
  deleteNotification(id: string, event: Event) {
    event.stopPropagation();
    this.notificationService.deleteNotification(id);
  }
  
  clearAll() {
    if (confirm('Are you sure you want to clear all notifications?')) {
      this.notificationService.clearAll();
    }
  }
  
  handleNotificationClick(notification: INotification) {
    if (!notification.isRead) {
      this.markAsRead(notification.id);
    }
    
    // Handle navigation if actionUrl exists
    if (notification.actionUrl) {
      // Navigate to URL
      console.log('Navigate to:', notification.actionUrl);
    }
  }
  
  getIconBgClass(type: string): string {
    const classes = {
      info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      success: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      error: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
    };
    return classes[type as keyof typeof classes] || classes.info;
  }
  
  formatTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }
  
   @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isOpen() && 
        this.elementRef.nativeElement && 
        !this.elementRef.nativeElement.contains(event.target)) {
      //this.closeSidebar();
    } 
  }
  */
  store = inject(SocketSignalStore);
  
 
  
  filteredNotifications = signal<any[]>([]);
  
  constructor() {
    effect(() => {
      this.filteredNotifications.set(this.store.notificationsList());
      /*const filter = this.store.filter();
      const notifications = this.store.notificationsList();
      
      if (filter === 'unread') {
        this.filteredNotifications.set(notifications.filter(n => !n.read));
      } else {
        this.filteredNotifications.set(notifications);
      }*/
    });
  }
  
  setFilter(filter: 'all' | 'unread') {
    // this.store.setFilter(filter);
  }
  
  markAllAsRead() {
    // this.store.markAllAsRead();
  }
  
  deleteNotification(id: number | null, event: MouseEvent) {
    event.stopPropagation();
    if (id) {
      //this.store.deleteNotification(id);
    }
  }
  
  clearAll() {
    if (confirm('Are you sure you want to clear all notifications?')) {
      //this.store.clearAll();
    }
  }
  
  sendTestNotification() {
    //this.store.sendTestNotification();
  }
  
  reconnect() {
    this.store.connect();
  }
  
  handleNotificationClick(notification: any) {
    if (!notification.isRead && notification.id) {
      //this.store.markAsRead(notification.id);
      this.store.markAsReadNotification(notification.id)
    }
  }
  
  getIconBgClass(type: string): string {
    const classes = {
      info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      success: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      error: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
    };
    return classes[type as keyof typeof classes] || classes.info;
  }
  
  getDefaultTitle(type: string): string {
    const titles = {
      info: 'Information',
      success: 'Success',
      warning: 'Warning',
      error: 'Error'
    };
    return titles[type as keyof typeof titles] || 'Notification';
  }
  
  formatTime(dateString: string | null): string {
    if (!dateString) return 'Just now';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }
  
  @HostListener('document:keydown', ['$event'])
  onEscKey(event: KeyboardEvent): void {
    if (this.isOpen()) {
      event.preventDefault();
      this.close.emit();
    }
  }

  markAsRead(id: number){
     this.store.markAsReadNotification(id)
  }
}
