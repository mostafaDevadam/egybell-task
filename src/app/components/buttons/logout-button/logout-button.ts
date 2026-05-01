import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth-service';
import { Store } from '@ngrx/store';
import { logoutAction } from '../../../store/auth.store';
import { MessageService } from '../../toast-uis/message/message-service';
import { AuthSignalStore } from '../../../signal-store/auth-signal.store';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',

})
export class LogoutButton {
  authService = inject(AuthService)
  private store = inject(Store)
  messageService = inject(MessageService)
  private authSignalStore = inject(AuthSignalStore);



  async logout() {
    
    this.authService.logout()
    this.store.dispatch(logoutAction())
    this.authSignalStore.logout()
    this.messageService.showStacked(
      'Logout successfully',
      4
    );

  }
}
