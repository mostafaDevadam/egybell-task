import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth-service';
import { Store } from '@ngrx/store';
import { logoutAction } from '../../../store/auth.store';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
})
export class LogoutButton {
  service = inject(AuthService)
   private store = inject(Store)

  logout() {
     this.service.logout()
     this.store.dispatch(logoutAction())
  }
}
