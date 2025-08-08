import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../../services/categories/categoriesService';
import { CategoryDetails } from '../../../../services/categories/category-details';
import { Router } from '@angular/router';
import { Header } from '../../../util/header/header';
import { Footer } from '../../../util/footer/footer';
import { Navbar } from '../../../util/navbar/navbar';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-category',
  imports: [
    Header, Footer, Navbar, FormsModule
  ],
  templateUrl: './add-category.html',
  styleUrl: './add-category.sass'
})
export class AddCategory {

  newCategory!: CategoryDetails;
  categoryService: CategoriesService;

  constructor(private router: Router, categoryService: CategoriesService) {
    this.categoryService = categoryService;
  }
  
  saveChanges() {
    if (!this.newCategory)
      return;

    this.categoryService.create(this.newCategory).subscribe(s => {
      this.router.navigate(['categories']);
    });
  }

  cancel() {
      this.router.navigate(['categories']);
  }

  onInputChange(event: Event){
    this.newCategory = {id: 101010, name: (event.target as HTMLInputElement).value, status: "active"}
  }
}
