import { Component, computed, inject, signal } from '@angular/core';
import { AuthForm } from '../../components/forms/auth-form/auth-form';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';

interface ILoginModel {
  email: string
  password: string

}



@Component({
  selector: 'app-login',
  imports: [AuthForm],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private service = inject(AuthService)
  router = inject(Router)

  async login(e: { email: string, password: string }) {
    console.log("login: ", e)
      ; (await this.service.login(e.email, e.password)).subscribe(res => {
        if (res.data) {
          console.log("login page res:", res.data)
          this.service.saveInCookie('ng_userRole', res.data.role)
          this.service.saveInCookie('ng_userId', res.data.id)
          this.service.saveInCookie('ng_accessToken', res.data.access_token)
          this.service.saveInCookie('ng_refreshToken', res.data.refresh_token)
          this.service.isAuth.set(true)
          this.router.navigate(['/'])
        }
      })
  }




}
