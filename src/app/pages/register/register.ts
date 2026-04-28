import { Component, inject } from '@angular/core';
import { AuthForm } from '../../components/forms/auth-form/auth-form';
import { AuthService } from '../../auth/auth-service';
import { AUTH_BODY_TYPE } from '../../shared/types';
import { Role } from '../../shared/enums';

@Component({
  selector: 'app-register',
  imports: [AuthForm],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private service = inject(AuthService)


  async register(e: AUTH_BODY_TYPE) {
    console.log("register: ", e)
    ;(await this.service.register(e.email, e.password, e.role as Role)).subscribe(res => {
      console.log("register page res:", res)
    })
  }


}
