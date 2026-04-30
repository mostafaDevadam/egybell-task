// src/app/toast/toast.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { Toast, ToastOptions, ToastConfig, ToastType, DEFAULT_CONFIG } from './toast.types';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private config: ToastConfig = { ...DEFAULT_CONFIG };
  private toasts = signal<Toast[]>([]);
  private timers = new Map<string, any>();

  public readonly activeToasts = computed(() => this.toasts());
  public readonly hasToasts = computed(() => this.toasts().length > 0);
  
  public readonly topRightToasts = computed(() => 
    this.toasts().filter(t => (t.position || this.config.position) === 'top-right')
  );
  public readonly topLeftToasts = computed(() => 
    this.toasts().filter(t => (t.position || this.config.position) === 'top-left')
  );
  public readonly topCenterToasts = computed(() => 
    this.toasts().filter(t => (t.position || this.config.position) === 'top-center')
  );
  public readonly bottomRightToasts = computed(() => 
    this.toasts().filter(t => (t.position || this.config.position) === 'bottom-right')
  );
  public readonly bottomLeftToasts = computed(() => 
    this.toasts().filter(t => (t.position || this.config.position) === 'bottom-left')
  );
  public readonly bottomCenterToasts = computed(() => 
    this.toasts().filter(t => (t.position || this.config.position) === 'bottom-center')
  );

  constructor() {
    effect(() => {
      const currentToasts = this.toasts();
      if (currentToasts.length > this.config.maxToasts) {
        this.removeOldestToasts();
      }
    });
  }

  configure(config: Partial<ToastConfig>) {
    this.config = { ...this.config, ...config };
  }

  success(message: string, options?: ToastOptions) {
    return this.show({ message, type: 'success', ...options });
  }

  error(message: string, options?: ToastOptions) {
    return this.show({ message, type: 'error', ...options });
  }

  warning(message: string, options?: ToastOptions) {
    return this.show({ message, type: 'warning', ...options });
  }

  info(message: string, options?: ToastOptions) {
    return this.show({ message, type: 'info', ...options });
  }

  loading(message: string, options?: ToastOptions) {
    return this.show({ message, type: 'loading', duration: undefined, ...options });
  }

  show(options: { message: string; type: ToastType } & Partial<ToastOptions>) {
    const id = this.generateId();
    const toast: Toast = {
      id,
      type: options.type,
      message: options.message,
      title: options.title,
      duration: options.duration ?? this.config.duration,
      closable: options.closable ?? this.config.closable,
      showProgress: options.showProgress ?? this.config.showProgress,
      position: options.position ?? this.config.position,
      createdAt: new Date(),
    };

    this.toasts.update(toasts => [...toasts, toast]);

    // Only set timer if duration is finite and not loading
    if (toast.duration && toast.type !== 'loading' && isFinite(toast.duration)) {
      const timer = setTimeout(() => this.remove(id), toast.duration);
      this.timers.set(id, timer);
    }

    return id;
  }

  remove(id: string) {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }

    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  removeAll() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
    this.toasts.set([]);
  }

  updateLoadingToSuccess(id: string, message: string, options?: ToastOptions) {
    const currentToasts = this.toasts();
    const toastIndex = currentToasts.findIndex(t => t.id === id);
    
    if (toastIndex !== -1 && currentToasts[toastIndex].type === 'loading') {
      const updatedToasts = [...currentToasts];
      updatedToasts[toastIndex] = {
        ...updatedToasts[toastIndex],
        type: 'success',
        message: message,
        duration: options?.duration ?? 3000,
        title: options?.title
      };
      
      this.toasts.set(updatedToasts);
      
      const toast = updatedToasts[toastIndex];
      if (toast.duration && isFinite(toast.duration)) {
        const timer = setTimeout(() => this.remove(id), toast.duration);
        this.timers.set(id, timer);
      }
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  private removeOldestToasts() {
    const toasts = this.toasts();
    const excess = toasts.length - this.config.maxToasts;
    if (excess > 0) {
      const toRemove = toasts.slice(0, excess);
      toRemove.forEach(t => this.remove(t.id));
    }
  }
}