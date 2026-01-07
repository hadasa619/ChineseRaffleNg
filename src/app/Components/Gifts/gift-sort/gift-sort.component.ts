import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-gift-sort',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './gift-sort.component.html'
})
export class GiftSortComponent {
  @Output() sortChange = new EventEmitter<string>();

  selectedSort = signal<string>("");
  sortOptions = [
    { label: 'Category', value: 'category' },
    { label: 'Price', value: 'price' }
  ];

   onSortChange(value: string) {
    this.selectedSort.set(value);
    this.sortChange.emit(value);
  }
}