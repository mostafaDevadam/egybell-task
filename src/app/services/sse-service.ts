import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private sseSource?: EventSource;
  private apiUrl = environment.apiUrl

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


}
