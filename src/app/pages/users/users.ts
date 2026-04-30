import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users';
import { IActionEvent, ITabelField, Table } from '../../components/data-tables/table/table';
import { USER_TYPE } from '../../shared/types';
import { firstValueFrom, from, fromEvent, lastValueFrom, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DeleteButton } from '../../components/buttons/delete-button/delete-button';
import { CloseButton } from '../../components/buttons/close-button/close-button';
import { DeleteDialog } from '../../components/dialogs/delete-dialog/delete-dialog';
import { MessageService } from '../../components/toast-uis/message/message-service';

@Component({
  selector: 'app-users',
  imports: [Table, DeleteDialog,],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  service = inject(UsersService)
  router = inject(Router)
  users = signal<USER_TYPE[]>([])
  users$ = this.users.asReadonly()
  //users: Observable<USER_TYPE[]>
  isDelete = false
  selectedUserId = signal<number | null>(null)

  readonly fields: ITabelField[] = [
    { key: 'id', label: 'ID' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },

  ]

  messageService = inject(MessageService)



  async ngOnInit() {
    /*const data = from(this.service.fetchAllUsers())
    data.subscribe(sub => sub.subscribe(users => {
      this.users.set(users.data)
      console.log("users:", users)
      console.log("users#:", this.users())
    }))*/
    /*try {
      const response = (await this.service.fetchAllUsers()).toPromise()
      response.then(users => this.users.set(users?.data!!))
    } catch (error) {
      console.log("fetchAllUsers error:", error)

    }*/
    this.fetchUsers()



    /*
    .then(th => 
     th.subscribe(sub => {
       console.log("users sub:", sub)})
    )*/
  }

  fetchUsers = async () => {
  try {
    // 1. Wait for the initial promise from the service
    const observable = await this.service.fetchAllUsers();
    
    // 2. Convert observable to promise and wait for the HTTP result
    // Note: use firstValueFrom(observable) in modern Angular instead of .toPromise()
    const users = await lastValueFrom(observable)
    
    this.users.set(users?.data ?? []);
  } catch (error) {
    console.error("fetchAllUsers error:", error);
  }
}
  closeModal() {
    this.isDelete = false;
  }

  handleAction(event: IActionEvent) {
    switch (event.action) {
      case 'view':
        console.log('View:', event.item);
        //alert(`View User: ${event.item.email}`);
          this.messageService.showStacked(
            'View User Profile is ready',
            4
          );
        this.router.navigate([`/profile/${event.item.id}/view`])
        break;
      case 'edit':
        console.log('Edit:', event.item);
        //alert(`Edit User: ${event.item.email}`);
         this.messageService.showStacked(
            'Edit User Profile is ready',
            4
          );
        this.router.navigate([`/profile/${event.item.id}/edit`])
        break;
      case 'delete':
        this.isDelete = true
        if (event.item) {
          console.log('Delete:', event.item);
          this.selectedUserId.set(event.item.id)
           this.messageService.showStacked(
            'Delete User is ready',
            4
          );
        }

        // if (confirm(`Delete ${event.item.email}?`)) {
        //this.usersSignal.update(users => users.filter(u => u.id !== event.item.id));
        //alert(`Delete User: ${event.item.email}`);
        // }
        break;
    }
  }

  async deleteUser() {
    if (this.selectedUserId() && this.selectedUserId() !== null) {
      this.isDelete = false;
      const res = firstValueFrom(await this.service.deleteUser(this.selectedUserId()!!))
      res.then(res => {
        if (res) {
          console.log("deleteUser res:", res)
          this.fetchUsers()
           this.messageService.showStacked(
            'Deleted User is successfully',
            4
          );
        }

      })

    }

  }



}
