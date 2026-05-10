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
import { environment } from '../environments/environment.development';
import { MultiSseStore } from './signal-store/sse-signal.store';

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

  private apiUrl = environment.apiUrl


  sseData = this.sseService.data
  data = signal<any>(this.sseData())
  liveData = signal<any[]>([])

  sseStore = inject(MultiSseStore)

  constructor() {
    effect(() => {
      /*console.log("effect SSE data changed", this.sseData())
      this.data.set(this.sseData())
      console.log("data:", this.data())*/
    })


  }

  ngOnInit() {
    this.sseStore.connectToObjectStream(`${this.apiUrl}/sse/events`)
    this.sseStore.connectToArrayStream(`${this.apiUrl}/sse/events/list`)
    //this.sseService.connectSSE()

    /*this.sseService.connectSSE_()

    this.sseService.getServerSentEvents().subscribe
      ({
        next: (data) => {
          this.liveData.set(data)
        },
        error: (error) => console.error("SEE List Error:", error)
      })*/

  }

  ngOnDestroy() {
    //this.sseService.disconnect()
  }



}
