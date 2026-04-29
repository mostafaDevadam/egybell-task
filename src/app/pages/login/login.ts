import { Component, computed, inject, signal } from '@angular/core';
import { AuthForm } from '../../components/forms/auth-form/auth-form';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAuthFromCookiesAction, loginAction, selectUserId$, setAuthFromCookiesAction } from '../../store/auth.store';

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
  keys = environment.keys

  private store = inject(Store)

  loading$: Observable<boolean>
  error$: Observable<string | null>

  userId$ = this.store.select(selectUserId$)

  name = signal<string>("")
  count = signal<number>(0)

  co = computed(() => this.count() + 1)
  c = 0

  updateName() {
    this.c++
    let c = this.count()
    const i = `new name test ${this.c}`
    this.name.set(i)
  }


  constructor() {
    //if(this.service.getAccessTokenFromCookie()) this.router.navigate(['/'])
    this.loading$ = this.store.select(state => state.auth.loading)
    this.error$ = this.store.select(state => state.auth.error)


  }

  async login(e: { email: string, password: string }) {
    console.log("login: ", e)
      /*this.store.dispatch(
        loginAction(e)
      )*/

      //this.userId$.pipe(tap(userId => console.log("tap userId:", userId))).subscribe(userId => console.log("userId$:", userId))


      ; (await this.service.login(e.email, e.password)).subscribe(res => {
        if (res.data) {
          console.log("login page res:", res.data)
          this.service.saveInCookie(this.keys.NG_USERROLE, res.data.role)
          this.service.saveInCookie(this.keys.NG_USERID, res.data.id)
          this.service.saveInCookie(this.keys.NG_ACCESSTOKEN, res.data.access_token)
          this.service.saveInCookie(this.keys.NG_REFRESHTOKEN, res.data.refresh_token)
          // save in redux: userRole, accessToken, refreshToken, userID
          this.service.isAuth.set(Boolean(res.data.access_token))
          this.store.dispatch(setAuthFromCookiesAction({
            role: res.data.role,
            access_token: res.data.access_token as string,
            refresh_token: res.data.refresh_token as string,
            userId: Number(res.data.id),
            isAuth: Boolean(res.data.access_token)
          }))
          this.router.navigate(['/'])
        }
      })

  }




}
