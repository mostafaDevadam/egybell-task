import { Component, computed, effect, inject, input, model, OnChanges, output, signal } from '@angular/core';
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
export class AuthForm implements OnChanges {
  public title = input.required<string>()
  public isConfirm = input<boolean>(false)
  onSubmit = output<any>()
  confirmPassword = model()
  isMatched = signal<boolean | null>(null)
  router = inject(Router)
  //private service = inject(AuthService)
  //private router = inject(Router)


  authModel = signal<AUTH_BODY_TYPE & { confirmPassword: string }>({
    email: '',
    password: '',
    role: '',
    confirmPassword: '',
  })

  // Inside your component class
  public authForm = form(this.authModel, (schemaPath) => {
    required(schemaPath.email);
    email(schemaPath.email);

    required(schemaPath.password);
    minLength(schemaPath.password, 6);

    // Ensure this block is reactive to the input signal
    if (this.isConfirm()) {
      required(schemaPath.role!!);
      required(schemaPath.confirmPassword);
      minLength(schemaPath.confirmPassword, 6);
    }
  });

  constructor() {
    effect(() => {
      const registerMode = this.isConfirm();

    const password = this.authForm.password().value();
    const confirmPassword = this.authForm.confirmPassword().value();

    if (password && confirmPassword) {
      this.isMatched.set(password === confirmPassword);
    } else {
      // Reset to null if one of the fields is empty to hide the error
      this.isMatched.set(null);
    }






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

  ngOnChanges() {
    console.log("ngOnChanges:", (this.confirmPassword()))
  }

  cp = signal(this.confirmPassword())

  isSubmitting = signal(false)

  emailError = computed(() => {
    return this.authForm.email().errors().find(err => err.kind === "required" || err.kind === "email")
  })

  passwordError = computed(() => {
    return this.authForm.password().errors().find(err => err.kind === "required" || err.kind === "minLength")
  })

  /*confirmPasswordError = computed(() => {
    return this.authForm.confirmPassword().errors().find(err => err.kind === "required" || err.kind === "minLength")
  })*/

  confirmPasswordError = computed(() => {
  // Finds the first error where the kind is 'required'
  return this.authForm.confirmPassword().errors().find(err => err.kind === "required");
});

  // Add this computed property
formIsInvalid = computed(() => {
  const formInvalid = this.authForm().invalid();
  // If in register mode, also check if passwords match
  if (this.isConfirm()) {
    return formInvalid || !this.isMatched();
  }
  return formInvalid;
});

  handleOnSubmit(event: Event): void {
  event.preventDefault();

  // 1. Mark everything as touched to show errors
  this.authForm().markAsTouched();

  // 2. Check both the form's internal validity AND your custom match logic
  const passwordsMatch = this.isConfirm() ? this.isMatched() : true;

  if (this.authForm().valid() && passwordsMatch) {
    console.log("Form is valid and passwords match. Submitting...");
    this.onSubmit.emit(this.authForm().value());
    this.isSubmitting.set(true);
  } else {
    console.log("Validation failed");
    // Optionally focus the first error or show a toast
  }
}

}
