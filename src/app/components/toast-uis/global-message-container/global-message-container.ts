import { Component, inject } from '@angular/core';
import { IMessage, MessageService } from '../message/message-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-global-message-container',
  imports: [DatePipe],
  templateUrl: './global-message-container.html',
  styleUrl: './global-message-container.css',
})
export class GlobalMessageContainer {


  messageService = inject(MessageService)
  messages = this.messageService.messages$;

  getMessagesByPosition(position: string): IMessage[] {
    return this.messages().filter(msg => msg.position === position);
  }

  getMessageClasses(type: string): string {
    switch(type) {
      case 'success': return 'bg-green-50 border border-green-200';
      case 'error': return 'bg-red-50 border border-red-200';
      case 'warning': return 'bg-yellow-50 border border-yellow-200';
      case 'info': return 'bg-blue-50 border border-blue-200';
      default: return 'bg-white border border-gray-200';
    }
  }

  getProgressBarClass(type: string): string {
    switch(type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  }

  removeMessage(id: string): void {
    this.messageService.removeMessage(id);
  }
}
