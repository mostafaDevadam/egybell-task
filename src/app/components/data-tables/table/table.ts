import { Component, inject, input, OnInit, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRole, selectUserId } from '../../../store/auth.store';
import { AsyncPipe, JsonPipe } from '@angular/common';


export interface ITabelField {
  key: string
  label: string
}

export interface IActionEvent {
  action: 'view' | 'edit' | 'delete';
  item: any;
  index: number;
}


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AsyncPipe, ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table<T = any> implements OnInit {

  data = input<T[] | any[]>()
  fields = input<ITabelField[]>()
  // Output events for actions
  readonly viewAction = output<IActionEvent>();
  readonly editAction = output<IActionEvent>();
  readonly deleteAction = output<IActionEvent>();
  readonly showActions = input<boolean>(true);

  store = inject(Store)

  userId = this.store.select(selectUserId)
  role = this.store.select(selectRole)


  ngOnInit(): void {
    console.log("Table data:", this.data())
    console.log("Table fields:", this.fields())
  }

  // Helper method to safely get cell values
  getCellValue(item: any, fieldKey: string): any {
    const value = item[fieldKey];

    // Handle different field types
    if (value === undefined || value === null) {
      return '-';
    }

    // Special formatting for specific fields if needed
    switch (fieldKey) {
      case 'email':
        return value;
      case 'timestamp':
        return value;
      case 'role':
        return value;
      case 'user':
        return value?.email;
      case 'action':
        return value;
      default:
        return value;
    }
  }

  getColspan(): number {
    let cols = this.fields()!!.length;
    if (this.showActions()) cols++;
    return cols;
  }

  onAction(action: 'view' | 'edit' | 'delete', item: any, index: number) {
    const event: IActionEvent = { action, item, index };

    switch (action) {
      case 'view':
        this.viewAction.emit(event);
        break;
      case 'edit':
        this.editAction.emit(event);
        break;
      case 'delete':
        this.deleteAction.emit(event);
        break;
    }
  }

   formatDate = (cellValue: any) => {
        if (!cellValue) return cellValue
        return new Date(cellValue!!).toISOString().slice(0, 10)
    }



}
