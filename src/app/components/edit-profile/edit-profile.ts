import { Component, inject, input, OnInit } from '@angular/core';
import { USER_TYPE } from '../../shared/types';
import { ProfileForm } from '../forms/profile-form/profile-form';
import { UsersService } from '../../services/users';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  imports: [ProfileForm],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile implements OnInit {

  service = inject(UsersService)
  user = input<USER_TYPE | null>()

  ngOnInit(): void {
    console.log("Edit Profile data:", this.user())
  }


  async update(e: any){
      console.log("update:", e)
      const res = firstValueFrom(await this.service.updateUser(e.id, e))
      res.then(res => console.log("updated user res:", res))
     

  }


}
