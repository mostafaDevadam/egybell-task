// src/app/toast/toast.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast-service';
import { ToastType, ToastPosition } from './toast.types';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (position of positions; track position) {
      <div [class]="getContainerClasses(position)" class="fixed z-50">
        @for (toast of getToastsByPosition(position); track toast.id) {
          <div 
            [class]="getToastClasses(toast.type)"
            role="alert"
            class="mb-3 w-96 transform transition-all duration-300 ease-in-out"
            style="animation: slideIn 0.3s ease-out;"
          >
            <div class="flex items-start p-4">
              <!-- Icon -->
              <div class="flex-shrink-0">
                @switch (toast.type) {
                  @case ('success') {
                    <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  }
                  @case ('error') {
                    <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                  }
                  @case ('warning') {
                    <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                  }
                  @case ('info') {
                    <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                    </svg>
                  }
                  @case ('loading') {
                    <svg class="h-5 w-5 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  }
                }
              </div>

              <!-- Content -->
              <div class="ml-3 flex-1">
                @if (toast.title) {
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ toast.title }}
                  </p>
                }
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  {{ toast.message }}
                </p>
              </div>

              <!-- Close button -->
              @if (toast.closable) {
                <div class="ml-4 flex-shrink-0">
                  <button
                    (click)="toastService.remove(toast.id)"
                    class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                    [class]="getCloseButtonClasses(toast.type)"
                  >
                    <span class="sr-only">Close</span>
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              }
            </div>

            <!-- Progress bar -->
            @if (toast.showProgress && toast.duration && toast.type !== 'loading') {
              <div class="h-1 overflow-hidden rounded-b-lg">
                <div 
                  class="h-full transition-all duration-1000 ease-linear"
                  [class]="getProgressBarClasses(toast.type)"
                  style="width: 100%"
                ></div>
              </div>
            }
          </div>
        }
      </div>
    }
  `,
  styles: [`
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
  
  positions: ToastPosition[] = [
    'top-right', 'top-left', 'top-center',
    'bottom-right', 'bottom-left', 'bottom-center'
  ];
  
  getToastsByPosition(position: ToastPosition) {
    switch(position) {
      case 'top-right': return this.toastService.topRightToasts();
      case 'top-left': return this.toastService.topLeftToasts();
      case 'top-center': return this.toastService.topCenterToasts();
      case 'bottom-right': return this.toastService.bottomRightToasts();
      case 'bottom-left': return this.toastService.bottomLeftToasts();
      case 'bottom-center': return this.toastService.bottomCenterToasts();
      default: return [];
    }
  }
  
  getContainerClasses(position: ToastPosition): string {
    const classes: Record<ToastPosition, string> = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
    };
    return classes[position];
  }
  
  getToastClasses(type: ToastType): string {
    const baseClasses = 'rounded-lg shadow-lg border';
    const classes: Record<ToastType, string> = {
      success: `${baseClasses} bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800`,
      error: `${baseClasses} bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800`,
      warning: `${baseClasses} bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800`,
      info: `${baseClasses} bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800`,
      loading: `${baseClasses} bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800`
    };
    return classes[type];
  }
  
  getCloseButtonClasses(type: ToastType): string {
    const classes: Record<ToastType, string> = {
      success: 'text-green-400 hover:text-green-500 focus:ring-green-400',
      error: 'text-red-400 hover:text-red-500 focus:ring-red-400',
      warning: 'text-yellow-400 hover:text-yellow-500 focus:ring-yellow-400',
      info: 'text-blue-400 hover:text-blue-500 focus:ring-blue-400',
      loading: 'text-gray-400 hover:text-gray-500 focus:ring-gray-400'
    };
    return classes[type];
  }
  
  getProgressBarClasses(type: ToastType): string {
    const classes: Record<ToastType, string> = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
      loading: 'bg-gray-500'
    };
    return classes[type];
  }
}