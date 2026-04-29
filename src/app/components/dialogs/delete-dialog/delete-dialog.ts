import { Component, output } from '@angular/core';
import { CloseButton } from '../../buttons/close-button/close-button';
import { DeleteButton } from '../../buttons/delete-button/delete-button';

@Component({
  selector: 'app-delete-dialog',
  imports: [CloseButton, DeleteButton],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.css',
})
export class DeleteDialog {

  onClose = output<any>()
  onDelete = output<any>()


  closeEvent() {
    this.onClose.emit(true)
  }

  deleteEvent() {
    this.onDelete.emit(true)
  }


}
