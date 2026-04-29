import { Component, computed, effect, inject, model, OnChanges, signal, SimpleChanges } from '@angular/core';
import { LogoutButton } from '../../buttons/logout-button/logout-button';
import { NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth-service';
import { Router } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAuthInfo, selectIsAuth, selectRole, selectRole$, selectToken, selectUser, selectUserId$ } from '../../../store/auth.store';
import { tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LogoutButton, AsyncPipe, JsonPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnChanges {

  private service = inject(AuthService)
  private cookie = inject(CookieService)
  //private router = inject(Router);
  private store = inject(Store)

  user$ = this.store.select(state => state.auth.user)
  role$ = this.store.select(selectRole$)
  userId$ = this.store.select(selectUserId$)
  token$ = this.store.select(selectToken)
  isAuth$ = this.store.select(selectIsAuth)
  authInfo = this.store.select(selectAuthInfo)
  user$$ = this.store.select(selectUser)

  

  


  public isAuth = computed(() => {
    return this.service.isAuth()
  })

  public role = computed(() => {
    return this.service.role()
  })

  public isAdmin = computed(() => this.service.isAdmin())
  public isUser = computed(() => this.service.isUser())




  constructor() {
    // Effect runs whenever auth state OR route changes
    effect(() => {
      const isAuth = this.service.isAuth();
      const role = this.service.role();
      const isAdmin = this.service.isAdmin();
      const isUser = this.service.isUser();


      //const currentUrl = this.router.url;

      // Check access token on route changes
      //const token = this.service.getFromCookie('ng_accessToken');
      //const r = this.service.getFromCookie('ng_userRole')

      console.log({ isAuth, role, isAdmin, isUser })

      /*if (!token ) {
        console.log('No token found, redirecting to login');
        //this.router.navigate(['/login']);
      }*/
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChanges")
    console.log("role$:", this.role$)

  }

  ngOnInit() {
    // Update on every route change
    this.role$.pipe(tap(role => console.log("tap role:", role))).subscribe(role => console.log("role$:", role))
    this.userId$.pipe(tap(userId => console.log("tap userId:", userId))).subscribe(userId => console.log("userId$:", userId))
    this.token$.pipe(tap(token => console.log("tap token:", token))).subscribe(token => console.log("token$:", token))
    this.authInfo.pipe(tap(authInfo => console.log("tap authInfo:", authInfo))).subscribe(authInfo => console.log("authInfo$:", authInfo))
    this.user$$.pipe(tap(user => console.log("tap user$$:", user))).subscribe(user => console.log("user$$:", user))
  }





}
