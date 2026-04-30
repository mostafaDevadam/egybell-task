import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-stacked-messages',
  imports: [],
  templateUrl: './stacked-messages.html',
  styleUrl: './stacked-messages.css',
})
export class StackedMessages {

  private messages = signal<Array<{
    id: string, 
    text: string, 
    timestamp: Date,
    progressPercentage: number,
    duration: number
  }>>([]);
  
  messages$ = this.messages.asReadonly();

  showMessage(text: string, duration: number = 8): void {
    const id = Math.random().toString(36).substring(7);
    const timestamp = new Date();
    
    this.messages.update(prev => [{ id, text, timestamp, progressPercentage: 100, duration }, ...prev].slice(0, 5));
    
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

  getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 30) return 'Just now';
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    return `${Math.floor(seconds / 3600)} hours ago`;
  }


}
