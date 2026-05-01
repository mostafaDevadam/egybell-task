import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AuthForm } from '../../components/forms/auth-form/auth-form';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAuthFromCookiesAction, loginAction, selectUserId$, setAuthFromCookiesAction } from '../../store/auth.store';
import { UserSignalStore } from '../../signal-store/user-signal.store';
import { ToastService } from 'ngx-signal-toast';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../../components/toast-uis/message/message-service';
import { PositionedMessages } from "../../components/toast-uis/positioned-messages/positioned-messages";
import { StackedMessages } from "../../components/toast-uis/stacked-messages/stacked-messages";
import { AuthSignalStore } from '../../signal-store/auth-signal.store';
import { Role } from '../../shared/enums';

interface ILoginModel {
  email: string
  password: string

}



@Component({
  selector: 'app-login',
  imports: [AuthForm,],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
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

  readonly uStore = inject(UserSignalStore)
  toast = inject(ToastService);
  toastr = inject(ToastrService);
  messageService = inject(MessageService)
  authSignalStore = inject(AuthSignalStore)



  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
    /* this.toast.success('Operation completed successfully!', {
       styles: {
         borderColor: '#333',
         background: '#fff',
         messageColor: '#333',
         titleColor: '#333',
       },
     });*/
  }

  //@ViewChild(Message) tempMessageComponent!: Message;

  /*triggerTempMessage(text: string): void {
    if (this.tempMessageComponent) {
      this.tempMessageComponent.showTemporaryMessage(text ?? "Temporary Message");
    } else {
      console.error('TempMessageComponent not found!');
    }
  }*/



  saveInfo() {
    this.c++
    this.uStore.updateUser({ name: 'mostafa', age: 55 + this.c })
  }

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
    // Access components after view init
    setTimeout(() => {

    });


  }

  ngOnInit() {


  }







  async login(e: { email: string, password: string }) {
    //this.triggerTempMessage("Login Success!")
    //this.messageService.showSuccess(`Login Success`);
    //this.messageService.showError(`Login Error`);
    /*this.messageService.showMessage(`Login Success 1`, 'success', 10);
   this.messageService.showMessage(`Login Success 2`, 'success', 10);
    this.messageService.showMessage(`Login Success 1`, 'error', 10);
   this.messageService.showMessage(`Login Success 2`, 'error', 10);*/

    // Show success messages
    /*this.messageService.showSuccess$(
      `Welcome back, You have successfully logged in.`,
      5,
      'top-right'
    );
    
    this.messageService.showInfo(
      'You have 3 new notifications waiting for you.',
      5,
      'top-right'
    );*/



    //this.messageService.showLoginSuccess("mostafa");





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
          
          this.authSignalStore.login({
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            role: res.data.role as Role,
            userID: Number(res.data.id)
          })


          this.messageService.showStacked(
            res.message ?? 'Login is successful',
            4
          );

          // Navigate to dashboard after showing messages
          setTimeout(() => {
            this.router.navigate(['/']);
            // Show another message after navigation
            setTimeout(() => {
              this.messageService.showSuccess$(
                'Dashboard loaded successfully!',
                4,
                'bottom-left'
              );
            }, 500);
          }, 1000);
        }
      }, error => {
        console.log("login page error:", error)
        this.messageService.showStacked(
          error.error.message ?? 'Login failed',
          4
        );
      })

  }



}
