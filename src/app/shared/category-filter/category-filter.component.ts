import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss'
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory = 'All';
  @Output() selectedCategoryChange = new EventEmitter<string>();

  selectCategory(category: string): void {
    if (category !== this.selectedCategory && this.categories.includes(category)) {
      this.selectedCategoryChange.emit(category);
    }
  }
}
