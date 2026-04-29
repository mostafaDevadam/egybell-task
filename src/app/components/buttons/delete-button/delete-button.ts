import { Component, output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  imports: [],
  templateUrl: './delete-button.html',
  styleUrl: './delete-button.css',
})
export class DeleteButton {

  onDelete = output<any>()

  onClick() {
    this.onDelete.emit(true)
  }

}
