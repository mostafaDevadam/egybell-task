import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LOG_TYPE, RESPONSE_TYPE } from '../shared/types';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  http = inject(HttpClient)
  private apiUrl = environment.apiUrl
  authService = inject(AuthService)


  async fetchAllLogs(){
     const token = this.authService.getAccessTokenFromCookie()
     console.log("token before logs:", token)
    return await this.http.get<RESPONSE_TYPE<LOG_TYPE[]>>(`${this.apiUrl}/logs`)
  }


}
