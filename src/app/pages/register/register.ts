import { Component, inject } from '@angular/core';
import { AuthForm } from '../../components/forms/auth-form/auth-form';
import { AuthService } from '../../auth/auth-service';
import { AUTH_BODY_TYPE } from '../../shared/types';
import { Role } from '../../shared/enums';
import { MessageService } from '../../components/toast-uis/message/message-service';

@Component({
  selector: 'app-register',
  imports: [AuthForm],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private service = inject(AuthService)
  private messageService = inject(MessageService)


  async register(e: AUTH_BODY_TYPE) {
    console.log("register: ", e)
      ; (await this.service.register(e.email, e.password, e.role as Role)).subscribe(res => {
        console.log("register page res:", res)
        this.messageService.showStacked(
          'Register successfully',
          4
        );
      }, error => {
        console.log("register page error:", error)
        this.messageService.showStacked(
          'Register failed',
          4
        );
      })
  }


}
