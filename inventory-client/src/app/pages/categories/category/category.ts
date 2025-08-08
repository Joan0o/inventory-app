import { Component, inject, Input } from '@angular/core';
import { CategoryDetails } from '../../../services/categories/category-details';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../services/categories/categoriesService';

@Component({
  selector: 'app-category',
  imports: [FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.sass'
})
export class Category {

  private categoryService = inject(CategoriesService);

  @Input({ required: true }) category!: CategoryDetails;

  isEditing = false;
  editedCategory!: CategoryDetails;

  ngOnInit() {
    this.editedCategory = { ...this.category };
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.category = { ...this.editedCategory };
    this.isEditing = false;
    this.categoryService.update(this.category.id, this.category).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
      },
      error: (error) => {
        console.error('Update failed:', error);
      }
    });
  }

  cancelEdit() {
    this.editedCategory = { ...this.category };
    this.isEditing = false;
  }

}
