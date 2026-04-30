import { Component, computed, inject, signal } from '@angular/core';
import { MessageService, IToastMessage } from './message-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.css',
  animations: [
    /*trigger('progressBar', [
      state('start', style({ width: '100%' })),
      state('end', style({ width: '0%' })),
      transition('start => end', animate('10000ms linear'))
    ]),
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])*/
  ]
})
export class Message {

  displayText = signal<string>('This message will disappear after 10 seconds.');
  isMessageVisible = false;

  secondsRemaining = signal<number>(10);
  progressPercentage = signal<number>(100);

  private timeoutId: any = null;
  private intervalId: any = null;
  private animationFrameId: number | null = null;
  private startTime: number | null = null;
  private duration = 10000; // 10 seconds
  progressState = signal<string>('start')

  messageService = inject(MessageService)
  message: IToastMessage | null = null;


  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.messageService.message$.subscribe(msg => {
      if (msg) {
        this.showMessage(msg);
      } else {
        this.dismiss();
      }
    });
  }


  private showMessage(msg: IToastMessage): void {
    this.clearTimers();
    this.message = msg;
    this.progressPercentage.set(100)
    const duration = (msg.duration || 10) * 1000;
    //
     this.secondsRemaining.set(10)
    this.isMessageVisible = true;

    this.intervalId = setInterval(() => {
      if (this.progressPercentage() > 0) {
        this.progressPercentage.set(Math.max(0, this.progressPercentage() - (100 / (duration / 100))))
      }
      //
      if (this.secondsRemaining() > 0) {
        this.secondsRemaining.set(this.secondsRemaining() - 1)
      }
    }, 100);

    this.timeoutId = setTimeout(() => {
      this.dismiss();
    }, duration);
  }

  dismiss(): void {
    this.message = null;
    this.isMessageVisible = false;
    this.clearTimers();
  }

   getMessageClasses(): string {
    const baseClass = "px-6 py-4 rounded-r-lg shadow-lg";
    if (this.message?.type === 'success') {
      return `${baseClass} bg-emerald-500 border-l-4 border-emerald-700 text-white`;
    } else if (this.message?.type === 'error') {
      return `${baseClass} bg-red-500 border-l-4 border-red-700 text-white`;
    }
    return `${baseClass} bg-blue-500 border-l-4 border-blue-700 text-white`;
  }

   getIconClasses(): string {
    return "text-white";
  }



  showTemporaryMessage(): void {
    //this.displayText.set(text!!);
    this.clearTimers();
    this.secondsRemaining.set(10)
    this.isMessageVisible = true;

    this.intervalId = setInterval(() => {
      if (this.secondsRemaining() > 0) {
        this.secondsRemaining.set(this.secondsRemaining() - 1)
      }
    }, 1000);

    this.timeoutId = setTimeout(() => {
      this.isMessageVisible = false;
      this.clearTimers();
    }, 10000);
  }

  onAnimationComplete(): void {
    if (this.isMessageVisible) {
      this.isMessageVisible = false;
      this.clearTimers();
    }
  }

  private clearTimers(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy(): void {
     this.subscription?.unsubscribe();
    this.clearTimers();
  }


}
