import { Component } from '@angular/core';
import { SubcategoriesService } from '../../../../services/subcategories/subcategoriesService';
import { SubcategoryDetails } from '../../../../services/subcategories/subcategory';
import { CategoriesService } from '../../../../services/categories/categoriesService';
import { CategoryDetails } from '../../../../services/categories/category-details';
import { Router } from '@angular/router';
import { Header } from '../../../util/header/header';
import { Footer } from '../../../util/footer/footer';
import { Navbar } from '../../../util/navbar/navbar';
import { FormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-add',
  imports: [
    Header, Footer, Navbar, FormsModule
  ],
  templateUrl: './add.html',
  styleUrl: './add.sass'
})

@UntilDestroy()
export class Add {

  newSubcategory!: SubcategoryDetails;
  subCategoryService: SubcategoriesService;
  
  categories_list: CategoryDetails[] = [];
  
  constructor(
    private router: Router, 
    subCategoryService: SubcategoriesService,
    categoryService: CategoriesService,
  ) {
    this.subCategoryService = subCategoryService;
    categoryService.getCategories().subscribe();
    categoryService.watchAllCategories().pipe(untilDestroyed(this)).subscribe(ps => this.categories_list = ps);
    this.newSubcategory = { 
      id: 101010, 
      name: "", 
      status: "active", 
      product_count: 0, 
      category_id: 0,
      category: this.categories_list[0]
    }
  }

  saveChanges() {
    if (!this.newSubcategory)
      return;

    this.subCategoryService.create(this.newSubcategory).subscribe(s => {
      this.router.navigate(['subcategories']);
    });
  }

  cancel() {
    this.router.navigate(['subcategories']);
  }

  onInputChange(event: Event) {
    this.newSubcategory = { 
      id: 101010, 
      name: (event.target as HTMLInputElement).value, 
      status: "active", 
      product_count: 0, 
      category_id: 0,
      category: this.categories_list[0]
    }
  }
}
