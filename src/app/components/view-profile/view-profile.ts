import { Component, inject, input, OnInit, signal } from '@angular/core';
import { USER_TYPE } from '../../shared/types';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectRole, selectUserId } from '../../store/auth.store';
import { DeleteButton } from '../buttons/delete-button/delete-button';
import { UsersService } from '../../services/users';
import { firstValueFrom } from 'rxjs';
import { Role } from '../../shared/enums';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { DeleteDialog } from '../dialogs/delete-dialog/delete-dialog';

@Component({
  selector: 'app-view-profile',
  imports: [AsyncPipe, DeleteButton, DeleteDialog],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css',
})
export class ViewProfile implements OnInit {


  user = input<USER_TYPE | null>()
  store = inject(Store)
  userService = inject(UsersService)
  id = this.store.select(selectUserId)
  role = this.store.select(selectRole)

  id$ = signal<number>(0)
  role$ = signal<Role>(Role.USER)
  router = inject(Router)
  authService = inject(AuthService)


  ngOnInit(): void {
    console.log("View Profile data:", this.user())
    const _id = firstValueFrom(this.id)
    _id.then(idx => {
      console.log("_id:", idx)
      this.id$.set(idx!!)
    })

    const _role = firstValueFrom(this.role)
    _role.then(_r => {
      this.role$.set(_r as Role)
    })

  }

  isOpen = false
  isDelete = false

  openDeleteDialog(val: any){
      this.isDelete = true
  }

  closeModal() {
    this.isDelete = false;
  }

  async handleOnDelete(event: any) {
    console.log("handleOnDelete:", event)

    if (!event) return

    if (!this.user()) return

    // if role is admin then delete and nav to '/'
    // else if role is user and id matches selectId then delete , logout and nav to '/login'

    const res = firstValueFrom(await this.userService.deleteUser(Number(this.user()!!.id)))
    res.then(res => {
      if (res) {
        console.log("deleteUser res:", res)

        if (this.role$() === Role.ADMIN) {
          /*this.store.dispatch({
            type: 'DELETE_USER',
            payload: this.user()!!.id
          })*/
          // route to users
          this.router.navigate(['users'])
        } else {
          /*this.store.dispatch({
            type: 'LOGOUT'
          })*/
          // logout and route to login
          this.authService.logout()
          this.router.navigate(['login'])
        }

      }

    })
  }
}
