import { Component, effect, input, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { USER_TYPE } from '../../../shared/types';
import { JsonPipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-profile-form',
  imports: [ FormField],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css',
})
export class ProfileForm implements OnInit {
  defaultUser = input<USER_TYPE | null>()
  u = signal<USER_TYPE>({})

  public title = input.required<string>()
  onSubmit = output<any>()
   profileModel = signal({
      email: "",
      role: "",
    })
  
    public profileForm = form(this.profileModel)

    constructor() {
    // Update form when defaultUser changes
    effect(() => {
        const user = this.defaultUser();
        if (user) {
          this.u.set(user)
            this.profileModel.set({
                email: user.email || "",
                role: user.role || "",
            });
        }
    });
}

  ngOnInit(): void {
     console.log("ProfileForm defaultUser:", this.defaultUser())
     if(this.defaultUser() !== null ) {
       /*this.profileModel.set({
        email: this.defaultUser()!!.email!! ?? "",
        role: this.defaultUser()!!.role!! ?? "",
       }) 
       this.profileForm = form(this.profileModel)*/
     }
  }

    ngOnChanges(changes: SimpleChanges<ProfileForm>): void {
      console.log("onChanges profile-form#", changes)
  
  
  
    }

  handleOnSubmit(event: Event): void {
    const submitEvent = event as SubmitEvent;
    submitEvent.preventDefault();

    console.log('Form submitted ', this.profileForm().value());
    this.onSubmit.emit({...this.profileForm().value(), id: this.u().id})


  }

}
