import { Component, inject } from '@angular/core';
import { MessageService } from '../message/message-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-container',
  imports: [DatePipe],
  templateUrl: './message-container.html',
  styleUrl: './message-container.css',
})
export class MessageContainer {


  messageService = inject(MessageService)
  messages = this.messageService.messages$


  getMessageClasses(type: string): string {
    const baseClass = "bg-white border rounded-lg shadow-xl";
    switch (type) {
      case 'success': return `${baseClass} border-green-200 bg-green-50`;
      case 'error': return `${baseClass} border-red-200 bg-red-50`;
      case 'warning': return `${baseClass} border-yellow-200 bg-yellow-50`;
      case 'info': return `${baseClass} border-blue-200 bg-blue-50`;
      default: return `${baseClass} border-gray-200 bg-white`;
    }
  }

  removeMessage(id: string): void {
    this.messageService.removeMessage(id);
  }

}
