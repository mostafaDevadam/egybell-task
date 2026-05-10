import { inject, Injectable, NgZone, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private sseSource?: EventSource;
  private apiUrl = environment.apiUrl

  private _zone = inject(NgZone)

  data = signal<any>({
    created_at: '',
    value: 0,
    usersOnline: 0,
    message: '',
  })

  connectSSE() {
    if (this.sseSource) this.sseSource.close()

    this.sseSource = new EventSource(`${this.apiUrl}/sse/events`)

    this.sseSource.onmessage = (event) => {
      try{
      console.log("sse event onmessage:", event.data)
      this.data.set(JSON.parse(event.data))
      }catch(error){
          console.error("Error passing SSE data:", error)
      }
     
    }

    this.sseSource.onerror = (event) => {
      console.log("sse event onerror:", event)
    }

    console.log("SEE connection started automatically")
  }

  disconnect(){
    if(this.sseSource){
      this.sseSource.close()
      this.sseSource = undefined
      console.log("SSE connection closed")
    }
    
  }

  connectSSE_() {
    if (this.sseSource) this.sseSource.close();

    this.sseSource = new EventSource(`${this.apiUrl}/sse/events`);

    this.sseSource.onmessage = (event) => {
      // EventSource runs outside Angular's zone. 
      // zone.run() forces Angular to check for changes.
      this._zone.run(() => {
        try {
          const parsed = JSON.parse(event.data);
          this.data.set(parsed);
          console.log("New data received:", parsed);
        } catch (error) {
          console.error("Error parsing SSE data:", error);
        }
      });
    };

    this.sseSource.onerror = (err) => {
      console.error("SSE connection lost. Browser will auto-retry...", err);
    };
  }


  getServerSentEvents(): Observable<any[]>{
    return new Observable<any[]>(observer => {
      const eventSource = new EventSource(`${this.apiUrl}/sse/events/list`)

      eventSource.onmessage = (event) => {
        this._zone.run(() => {
          const data = JSON.parse(event.data)
          observer.next(data)
        })
      }

      eventSource.onerror = (event) => {
        this._zone.run(() => {
          observer.error(event)
        })
      }

      return () => {
        eventSource.close()
      }
    })
  }


}
