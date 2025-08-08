import { Component, inject, Input } from '@angular/core';
import { SubcategoryDetails } from '../../../services/subcategories/subcategory';
import { CategoryDetails } from '../../../services/categories/category-details';
import { FormsModule } from '@angular/forms';
import { SubcategoriesService } from '../../../services/subcategories/subcategoriesService';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoriesService } from '../../../services/categories/categoriesService';

@Component({
  selector: 'app-subcategory-component',
  imports: [FormsModule],
  templateUrl: './subcategory-component.html',
  styleUrl: './subcategory-component.sass'
})

@UntilDestroy()
export class SubcategoryComponent {

  private subCategoriesService = inject(SubcategoriesService);

  @Input({ required: true }) subCategory!: SubcategoryDetails;

  isEditing = false;
  editedSubcategory!: SubcategoryDetails;
  categories_list: CategoryDetails[] = [];

  constructor(
    private categoryService: CategoriesService
  ) {
    this.categoryService.getCategories().subscribe();
    this.categoryService.watchAllCategories().pipe(untilDestroyed(this)).subscribe(ps => this.categories_list = ps);
  }


  ngOnInit() {
    this.editedSubcategory = { ...this.subCategory };
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    for(let i = 0; i < this.categories_list.length; i++){
      if(this.categories_list[i].id == this.editedSubcategory.category_id)
        this.editedSubcategory.category = this.categories_list[i];
    }
    this.subCategory = { ...this.editedSubcategory };
    this.isEditing = false;
    this.subCategoriesService.update(this.subCategory.id, this.subCategory).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
      },
      error: (error) => {
        console.error('Update failed:', error);
      }
    });
  }

  cancelEdit() {
    this.editedSubcategory = { ...this.subCategory };
    this.isEditing = false;
  }

  getCategoryName(subcategory: SubcategoryDetails): string {
    return subcategory.category?.name ?? 'Ninguna';
  }

}

