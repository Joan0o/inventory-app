import { Component } from '@angular/core';
import { SubcategoryDetails } from '../../services/subcategories/subcategory';
import { SubcategoryComponent } from './subcategory/subcategory-component';
import { SubcategoriesService } from '../../services/subcategories/subcategoriesService';
import { Header } from '../util/header/header';
import { Footer } from '../util/footer/footer';
import { Navbar } from '../util/navbar/navbar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoriesService } from '../../services/categories/categoriesService';
import { CategoryDetails } from '../../services/categories/category-details';

@Component({
  selector: 'app-subcategories-component',
  imports: [SubcategoryComponent,
    Header, Footer, Navbar],
  templateUrl: './subcategories-component.html',
  styleUrl: './subcategories-component.sass'
})

@UntilDestroy()
export class SubcategoriesComponent {
  list: SubcategoryDetails[] = [];
  categories_list: CategoryDetails[] = [];

  constructor(
    private router: Router,
    private subCategoryService: SubcategoriesService,
    private categoryService: CategoriesService
  ) {
    this.subCategoryService.getCategories().subscribe();
    this.subCategoryService.watchAllCategories().pipe(untilDestroyed(this)).subscribe(ps => this.list = ps);
    this.categoryService.getCategories().subscribe();
    this.categoryService.watchAllCategories().pipe(untilDestroyed(this)).subscribe(ps => this.categories_list = ps);
  }

  add() {
    this.router.navigate(['newSubcategory'])
  }
}

