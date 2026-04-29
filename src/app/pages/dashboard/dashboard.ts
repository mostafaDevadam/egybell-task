import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/auth.store';
import { tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Role } from '../../shared/enums';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  lorem = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eligendi iure, illo saepe quam quos optio adipisci suscipit dolorum magni excepturi molestias ullam fugiat libero! Voluptatum delectus soluta neque aspernatur!

  `

  store = inject(Store)
  user = this.store.select(selectUser)
  email = signal<string>("")
  role = signal<Role>(Role.USER)

  ngOnInit(){
    console.log("Dashboard")
    this.user.pipe(tap(user => console.log("tap user#:", user)))
    .subscribe(user =>{ 
      if(user){
         console.log("user#:", user)
        this.email.set(user.email!! as string)
        this.role.set(user.role!! as Role)
      }
     
    
    })
  }

}
