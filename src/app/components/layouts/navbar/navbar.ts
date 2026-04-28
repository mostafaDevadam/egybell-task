import { Component, computed, effect, inject, model, OnChanges, signal, SimpleChanges } from '@angular/core';
import { LogoutButton } from '../../buttons/logout-button/logout-button';
import { NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth-service';
import { Router } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LogoutButton, ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnChanges {

  private service = inject(AuthService)
  private cookie = inject(CookieService)
    //private router = inject(Router);


    public isAuth = computed(() => {
      return this.service.isAuth()
    })

    public role = computed(() => {
      return this.service.role()
    })

     public isAdmin = computed(() => this.service.isAdmin() )
     public isUser = computed(() => this.service.isUser() )
      

 

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

      console.log({isAuth, role, isAdmin, isUser})
      
      /*if (!token ) {
        console.log('No token found, redirecting to login');
        //this.router.navigate(['/login']);
      }*/
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChanges")
    
  }

  ngOnInit() {
    // Update on every route change


  }

 

  

}
