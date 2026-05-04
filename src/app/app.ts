import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/layouts/navbar/navbar';
import { Message } from './components/toast-uis/message/message';
import { MessageContainer } from './components/toast-uis/message-container/message-container';
import { PositionedMessages } from "./components/toast-uis/positioned-messages/positioned-messages";
import { StackedMessages } from "./components/toast-uis/stacked-messages/stacked-messages";
import { GlobalMessageContainer } from "./components/toast-uis/global-message-container/global-message-container";
import { DarkModeSignalStore } from './signal-store/dark-mode.store';
import { SseService } from './services/sse-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Message, MessageContainer, GlobalMessageContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('egy-ng-app');
  darkModeSignalStore = inject(DarkModeSignalStore)
  isDark = this.darkModeSignalStore.isDarkMode
  private sseService = inject(SseService)

  sseData = this.sseService.data

  constructor() {
    effect(() => {
      console.log("effect SSE data changed", this.sseData())
    })
      
    
  }

  ngOnInit(){
    this.sseService.connectSSE()
  }

  ngOnDestroy(){
    this.sseService.disconnect()
  }



}
