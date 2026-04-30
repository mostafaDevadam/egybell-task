import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersService } from '../../services/users';
import { firstValueFrom } from 'rxjs';
import { ViewProfile } from '../../components/view-profile/view-profile';
import { EditProfile } from '../../components/edit-profile/edit-profile';
import { selectRole } from '../../store/auth.store';
import { AsyncPipe } from '@angular/common';
import { Role } from '../../shared/enums';
import { USER_TYPE } from '../../shared/types';

@Component({
  selector: 'app-profile',
  imports: [ViewProfile, EditProfile, AsyncPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  router = inject(Router)
  private route = inject(ActivatedRoute)
  id = input<string>()
  protected readonly ROLE = Role

  isView = signal<boolean>(false)
  isOwn = signal<boolean>(false)
  state = signal<"view" | "edit" | "own" | null>(null)

  store = inject(Store)
  ownId = this.store.selectSignal(state => state.auth.userId)
  role = this.store.select(selectRole)

  userService = inject(UsersService)
  user = signal<USER_TYPE | null>(null)


  ngOnInit(): void {
    console.log("profile url id:", this.router.url, this.id())
    const uid = this.route.snapshot.paramMap.get("id")
    console.log("uid:", uid)
    console.log('ownId:', this.ownId())

    if (this.router.url.endsWith('view') && this.id()) {
      this.state.set("view")
      // fetch user
      this.fetchProfile(Number(this.id()!!))
    } else if (this.router.url.endsWith('edit') && this.id()) {
      this.state.set("edit")
      // fetch user
      this.fetchProfile(Number(this.id()!!))
    } else if (this.router.url.endsWith('profile') && this.ownId()) {
      this.state.set("own")
      // fetch user
      this.fetchProfile(this.ownId())
    } else {
      this.state.set(null)
      this.router.navigate(['/notfound'])
    }

  
  }


  async fetchProfile(id: number) {
    const res = firstValueFrom(await this.userService.fetchUser(id))
    res.then(({ data }) => {
      if (data) {
        console.log("fetched user:", this.state(), data)
        this.user.set(data!!)
      }
    })
  }

}
