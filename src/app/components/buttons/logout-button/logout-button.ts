import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth-service';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
})
export class LogoutButton {
  service = inject(AuthService)

  logout() {
     this.service.logout()
  }
}
