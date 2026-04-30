import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';


export interface IToastMessage {
  text: string;
  duration?: number;
  type?: 'success' | 'error' | 'info';
}

export interface IMessage {
  id: string;
  text: string;
  duration: number;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: Date;
  progressPercentage: number;
  position?: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-left';
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<IToastMessage | null>();
  message$ = this.messageSource.asObservable();

  private messages = signal<IMessage[]>([]);
  messages$ = this.messages.asReadonly();

  private maxMessages = 5; // Maximum messages to show at once



  showSuccess(message: string, duration: number = 10): void {
    this.messageSource.next({ text: message, duration, type: 'success' });
  }

  showError(message: string, duration: number = 5): void {
    this.messageSource.next({ text: message, duration, type: 'error' });
  }

  clear(): void {
    this.messageSource.next(null);
  }
  // for messages-container
  showMessage(text: string, type: 'success' | 'error' | 'info' | 'warning' = 'success', duration: number = 10): void {
    const id = Math.random().toString(36).substring(7);
    const newMessage: IMessage = {
      id,
      text,
      type,
      duration,
      timestamp: new Date(),
      progressPercentage: 100
    };

    // Add new message
    this.messages.update(prev => [newMessage, ...prev].slice(0, this.maxMessages));

    // Start countdown for this message
    this.startCountdown(id, duration);
  }

  private startCountdown(id: string, duration: number): void {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const currentMessages = this.messages();
      const messageIndex = currentMessages.findIndex(m => m.id === id);

      if (messageIndex === -1) {
        clearInterval(interval);
        return;
      }

      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      const percentage = (remaining / duration) * 100;

      this.messages.update(prev =>
        prev.map(msg =>
          msg.id === id
            ? { ...msg, progressPercentage: percentage }
            : msg
        )
      );

      if (remaining <= 0) {
        this.removeMessage(id);
        clearInterval(interval);
      }
    }, 100);
  }

  removeMessage(id: string): void {
    this.messages.update(prev => prev.filter(msg => msg.id !== id));
  }

  clearAll(): void {
    this.messages.set([]);
  }
  // for global container
  showSuccess$(text: string, duration: number = 5, position: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-left' = 'top-right'): void {
    this.addMessage(text, 'success', duration, position);
  }

  showError$(text: string, duration: number = 5, position: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-left' = 'top-center'): void {
    this.addMessage(text, 'error', duration, position);
  }

  showWarning(text: string, duration: number = 5, position: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-left' = 'bottom-right'): void {
    this.addMessage(text, 'warning', duration, position);
  }

  showInfo(text: string, duration: number = 5, position: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-left' = 'top-right'): void {
    this.addMessage(text, 'info', duration, position);
  }

  showStacked(text: string, duration: number = 5): void {
    this.addMessage(text, 'info', duration, 'bottom-left');
  }

  // New method to show a single message with custom position
  showMessage$(
    text: string, 
    type: 'success' | 'error' | 'info' | 'warning' = 'info', 
    duration: number = 5, 
    position: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-left' = 'top-right'
  ): void {
    this.addMessage(text, type, duration, position);
  }

  // For login success - show only one message
  showLoginSuccess(username: string): void {
    this.addMessage(
      `Welcome back, ${username}!`, 
      'success', 
      5, 
      'top-right'
    );
    // Don't call showStacked() here
  }


  private addMessage(
    text: string,
    type: IMessage['type'],
    duration: number,
    position: IMessage['position']
  ): void {
    const id = Math.random().toString(36).substring(7);
    const newMessage: IMessage = {
      id,
      text,
      type,
      duration,
      position,
      timestamp: new Date(),
      progressPercentage: 100
    };
    
    this.messages.update(prev => [...prev, newMessage]);
    
    // Start countdown
    this.startCountdown$(id, duration);
  }

  private startCountdown$(id: string, duration: number): void {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const currentMessages = this.messages();
      const messageIndex = currentMessages.findIndex(m => m.id === id);
      
      if (messageIndex === -1) {
        clearInterval(interval);
        return;
      }
      
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      const percentage = (remaining / duration) * 100;
      
      this.messages.update(prev => 
        prev.map(msg => 
          msg.id === id 
            ? { ...msg, progressPercentage: percentage }
            : msg
        )
      );
      
      if (remaining <= 0) {
        this.removeMessage(id);
        clearInterval(interval);
      }
    }, 100);
  }

 
  

}