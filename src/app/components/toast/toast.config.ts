// toast/toast.config.ts
import { ToastConfig } from './toast.types';

export const DEFAULT_CONFIG: ToastConfig = {
  duration: 3000,
  position: 'top-right',
  closable: true,
  showProgress: true,
  maxToasts: 5
};