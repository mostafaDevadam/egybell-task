import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-positioned-messages',
  imports: [],
  templateUrl: './positioned-messages.html',
  styleUrl: './positioned-messages.css',
})
export class PositionedMessages {

   topRightMessages = signal<Array<{id: string, text: string, duration?: number}>>([]);
  bottomRightMessages = signal<Array<{id: string, text: string, duration?: number}>>([]);
  topCenterMessages = signal<Array<{id: string, text: string, duration?: number}>>([]);

  showSuccess(text: string, duration: number = 5): void {
    this.addMessage(this.topRightMessages, text, duration);
  }

  showInfo(text: string, duration: number = 5): void {
    this.addMessage(this.topRightMessages, text, duration);
  }

  showWarning(text: string, duration: number = 5): void {
    this.addMessage(this.bottomRightMessages, text, duration);
  }

  showError(text: string, duration: number = 5): void {
    this.addMessage(this.topCenterMessages, text, duration);
  }

  private addMessage(
    signalRef: ReturnType<typeof signal<Array<{id: string, text: string, duration?: number}>>>,
    text: string,
    duration: number
  ): void {
    const id = Math.random().toString(36).substring(7);
    signalRef.update(prev => [...prev, { id, text, duration }]);
    
    setTimeout(() => {
      signalRef.update(prev => prev.filter(msg => msg.id !== id));
    }, duration * 1000);
  }

  removeMessage(
    signalRef: ReturnType<typeof signal<Array<{id: string, text: string, duration?: number}>>>,
    id: string
  ): void {
    signalRef.update(prev => prev.filter(msg => msg.id !== id));
  }


}
