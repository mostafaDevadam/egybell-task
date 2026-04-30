import { Component, computed, effect, HostListener, inject, model, OnChanges, signal, SimpleChanges } from '@angular/core';
import { LogoutButton } from '../../buttons/logout-button/logout-button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth-service';
import { CookieService } from 'ngx-cookie-service';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAuthInfo, selectIsAuth, selectRole, selectRole$, selectToken, selectUser, selectUserId$ } from '../../../store/auth.store';
import { filter, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserSignalStore } from '../../../signal-store/user-signal.store';
import { ToggleSwitch } from "../../forms/inputs/toggle-switch/toggle-switch";
import { DarkModeSignalStore } from '../../../signal-store/dark-mode.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LogoutButton, ToggleSwitch, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnChanges {

  private service = inject(AuthService)
  private cookie = inject(CookieService)
  private router = inject(Router);
  private store = inject(Store)

  user$ = this.store.select(state => state.auth.user)
  role$ = this.store.select(selectRole$)
  userId$ = this.store.select(selectUserId$)
  token$ = this.store.select(selectToken)
  isAuth$ = this.store.select(selectIsAuth)
  authInfo = this.store.select(selectAuthInfo)
  user$$ = this.store.select(selectUser)

  readonly uStore = inject(UserSignalStore)
  name$ = this.uStore.selectName()
  age$ = this.uStore.selectAge()


  // Create a signal for the current URL
  currentUrl = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.router.url)
  ), { initialValue: this.router.url });

  // Method to check if route is active
  isRouteActive(route: string): boolean {
    if (route === '/') {
      return this.currentUrl() === route;
    }
    return this.currentUrl().startsWith(route);
  }


  public isAuth = computed(() => {
    return this.service.isAuth()
  })

  public role = computed(() => {
    return this.service.role()
  })

  public isAdmin = computed(() => this.service.isAdmin())
  public isUser = computed(() => this.service.isUser())

  isDarkMode = signal(false);
  isMobile = signal(window.innerWidth < 768);
  isMobileMenuOpen = signal(false);

    private darkModeSignalStore = inject(DarkModeSignalStore);





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

   /* window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 768);
    });*/

     this.checkScreenSize();
    this.loadDarkModePreference();
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


  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
  
  checkScreenSize() {
    const mobile = window.innerWidth < 768;
    this.isMobile.set(mobile);
    
    // Close mobile menu when switching to desktop
    if (!mobile && this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
    }
  }
  
  loadDarkModePreference() {
    // Check localStorage for saved preference
    const savedPreference = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialValue = savedPreference !== null 
      ? savedPreference === 'true' 
      : prefersDark;
    
    this.isDarkMode.set(initialValue);
    //this.darkModeSignalStore.toggle()
    this.applyDarkMode(initialValue);
  }
  
  onDarkModeChange(value: boolean): void {
    this.isDarkMode.set(value);
    this.applyDarkMode(value);
    localStorage.setItem('darkMode', String(value));
     //this.darkModeSignalStore.toggle();
    
  }
  
  applyDarkMode(enabled: boolean): void {
    /*if (enabled) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }*/
    this.darkModeSignalStore.set(enabled);
    
  }
  




  
  


  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }


 



}
