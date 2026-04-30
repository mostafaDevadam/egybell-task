import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRole, selectUserId } from '../../../store/auth.store';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


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
  imports: [AsyncPipe,],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table<T = any> implements OnInit {

  data = input<T[] | any[]>()
  fields = input<ITabelField[]>()
  isPaginated = input<boolean>(false)
  // Output events for actions
  readonly viewAction = output<IActionEvent>();
  readonly editAction = output<IActionEvent>();
  readonly deleteAction = output<IActionEvent>();
  readonly showActions = input<boolean>(true);

  store = inject(Store)

  userId = this.store.select(selectUserId)
  role = this.store.select(selectRole)
  pageSizeInput = input<number>(10);

  // Pagination state
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);

    readonly pageChange = output<{ page: number, pageSize: number }>();






  ngOnInit(): void {
    console.log("Table data:", this.data())
    console.log("Table fields:", this.fields())
    // Initialize page size from input
    this.pageSize.set(this.pageSizeInput());

    // Reset to first page when data changes
    if (this.isPaginated()) {
      // You can add a effect to reset page when data changes
      // For Angular 16+, you'd use effect() here
    }
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




  // Computed values for pagination
  totalPages = computed(() => {
    const totalItems = this.data()?.length || 0;
    return Math.ceil(totalItems / this.pageSize());
  });

  paginatedData = computed(() => {
    if (!this.isPaginated()) {
      return this.data() || [];
    }

    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.data()?.slice(start, end) || [];
  });

  startIndex = computed(() => {
    return (this.currentPage() - 1) * this.pageSize();
  });

  endIndex = computed(() => {
    const end = this.currentPage() * this.pageSize();
    return Math.min(end, this.data()?.length || 0);
  });

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2; // Number of pages to show on each side of current page
    const range: number[] = [];

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    const pages: number[] = [];

    if (total <= 7) {
      // Show all pages if total is small
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current - delta > 2) {
        pages.push(-1); // Ellipsis
      }

      pages.push(...range);

      if (current + delta < total - 1) {
        pages.push(-2); // Ellipsis
      }

      // Always show last page
      pages.push(total);
    }

    return pages;
  });


  // Pagination methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.emitPageChange();
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
       this.emitPageChange();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
       this.emitPageChange();
    }
  }

  firstPage(): void {
    this.currentPage.set(1);
     this.emitPageChange();
  }

  lastPage(): void {
    this.currentPage.set(this.totalPages());
     this.emitPageChange();
  }

  onPageSizeChange(event: Event): void {
   const select = event.target as HTMLSelectElement;
    const newSize = parseInt(select.value, 10);
    this.pageSize.set(newSize);
    this.currentPage.set(1); // Reset to first page when changing page size
    this.emitPageChange();
  }

   emitPageChange(): void {
    this.pageChange.emit({
      page: this.currentPage(),
      pageSize: this.pageSize()
    });
  }

  // Helper method to get original index from paginated data
  getOriginalIndex(paginatedIndex: number): number {
    return this.startIndex() + paginatedIndex;
  }

  // Helper method to safely get cell values



  // Method to refresh pagination (call this when data changes externally)
  refreshPagination(): void {
    if (this.currentPage() > this.totalPages()) {
      this.currentPage.set(Math.max(1, this.totalPages()));
    }
  }



}
