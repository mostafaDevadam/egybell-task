import { Component, ElementRef, HostListener, inject, output, signal } from '@angular/core';
import { SocketSignalStore } from '../../../signal-store/socket-signal.store';

@Component({
  selector: 'app-notification-button',
  imports: [],
  templateUrl: './notification-button.html',
  styleUrl: './notification-button.css',
})
export class NotificationButton {

  onClickEvent = output<any>()
  isOpen = output<boolean>()
  isClicked = false
  isOpen_ = signal<boolean>(false)

  onClick(){
    console.log("clickedon notify button")
    if(this.isClicked){
      this.isClicked = false
    }else {
      this.isClicked = true
    }
    
    this.onClickEvent.emit(this.isClicked)
  }

   store = inject(SocketSignalStore);
  private elementRef = inject(ElementRef);
  
  //isOpen = signal<boolean>(false);
  isRippling = signal<boolean>(false);
  
  constructor() {
    // Track unread count changes for ripple effect
    //let previousCount = this.store.getUnreadCount();
    
    setInterval(() => {
      /*const currentCount = this.store.getUnreadCount();
      if (currentCount > previousCount) {
        this.triggerRipple();
      }
      previousCount = currentCount;*/
    }, 100);
  }
  
  toggleSidebar() {
    this.isOpen_.update(open => !open);
    if (this.isOpen_()) {
      this.triggerRipple();
    }
  }
  
  closeSidebar() {
    this.isOpen_.set(false)
  }
  
  triggerRipple() {
    this.isRippling.set(true);
    setTimeout(() => this.isRippling.set(false), 600);
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isOpen_() && 
        this.elementRef.nativeElement && 
        !this.elementRef.nativeElement.contains(event.target)) {
      this.closeSidebar();
    }
  }
  
  @HostListener('document:keydown', ['$event'])
  onEscKey(event: KeyboardEvent): void {
    if (this.isOpen_()) {
      event.preventDefault();
      this.closeSidebar();
    }
  }
}
