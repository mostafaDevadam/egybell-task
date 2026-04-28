import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { AuthService } from '../../../auth/auth-service';
import { AUTH_BODY_TYPE } from '../../../shared/types';
import { Role } from '../../../shared/enums';
import { email, form, FormField, FormRoot, minLength, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  imports: [FormField,],
  standalone: true,
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.css',
  /*host: {
    ngSkipHydration: 'true'
  }*/
})
export class AuthForm {
  public title = input.required<string>()
  public isConfirm = input<boolean>(false)
  onSubmit = output<any>()

  //private service = inject(AuthService)
  //private router = inject(Router)


  authModel = signal<AUTH_BODY_TYPE>({
    email: '',
    password: '',
    role: '',
  })

  public authForm = form(this.authModel, (schemaPath) => {
    required(schemaPath.email);
    email(schemaPath.email);
    required(schemaPath.password);
    minLength(schemaPath.password, 6);
    if (this.isConfirm()) required(schemaPath.role!!);

  })

  constructor() {
    effect(() => {
      const registerMode = this.isConfirm();

      /*if (!registerMode) {
        const roleControl = this.authForm.role!!
        if (roleControl && typeof roleControl === 'function') {
          console.log("roleControl:", roleControl)
        }

        const role = this.authForm.role;

        // Option A: If it's a FormControl-like object
        if (role && 'setValue' in role) {
          (role as any).setValue('');
        }

      }*/
    })
  }


  isSubmitting = signal(false)

  emailError = computed(() => {
    return this.authForm.email().errors().find(err => err.kind === "required" || err.kind === "email")
  })

  passwordError = computed(() => {
    return this.authForm.password().errors().find(err => err.kind === "required" || err.kind === "minLength")
  })

  handleOnSubmit(event: Event): void {
    const submitEvent = event as SubmitEvent;
    submitEvent.preventDefault();

    console.log('Form submitted ', this.authForm().value());



    this.authForm().markAsTouched();

    if (this.isConfirm()) {
      this.onSubmit.emit(this.authForm().value())
    } else {
      this.onSubmit.emit({ email: this.authForm().value().email, password: this.authForm().value().password })
    }



    if (this.authForm().invalid()) {
      console.log("auth-form is invalid")

    }

    /*await submit(this.authForm, async (root) => {
      console.log(root().value());
    });*/

    this.isSubmitting.set(true)


  }

}
