import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESPONSE_TYPE, USER_TYPE } from '../shared/types';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient)
  private apiUrl = environment.apiUrl


  async fetchAllUsers() {
    return await this.http.get<RESPONSE_TYPE<USER_TYPE[]>>(`${this.apiUrl}/users`)
  }

  async fetchUser(id: number) {
    return await this.http.get<RESPONSE_TYPE<USER_TYPE>>(`${this.apiUrl}/users/${id}`)
  }

  async updateUser(id: number, user: USER_TYPE) {
    return await this.http.patch<RESPONSE_TYPE<USER_TYPE>>(`${this.apiUrl}/users/${id}`, user)
  }

  async deleteUser(id: number) {
    return await this.http.delete<RESPONSE_TYPE>(`${this.apiUrl}/users/${id}`)
  }
}
