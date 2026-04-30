// src/app/toast/toast.types.ts
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
  showProgress?: boolean;
  position?: ToastPosition;
  createdAt: Date;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
  closable?: boolean;
  showProgress?: boolean;
  position?: ToastPosition;
}

export type ToastPosition = 
  | 'top-right' 
  | 'top-left' 
  | 'top-center'
  | 'bottom-right' 
  | 'bottom-left' 
  | 'bottom-center';

export interface ToastConfig {
  duration: number;
  position: ToastPosition;
  closable: boolean;
  showProgress: boolean;
  maxToasts: number;
}

export const DEFAULT_CONFIG: ToastConfig = {
  duration: 3000,
  position: 'top-right',
  closable: true,
  showProgress: true,
  maxToasts: 5
};