import { Component, inject } from '@angular/core';
import { CategoryDetails } from '../../services/categories/category-details';
import { Category } from './category/category';
import { CategoriesService } from '../../services/categories/categoriesService';
import { Header } from '../util/header/header';
import { Footer } from '../util/footer/footer';
import { Navbar } from '../util/navbar/navbar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-categories',
  imports: [
    Category,
    //AsyncPipe,
    Header, Footer, Navbar
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.sass'
})

@UntilDestroy()
export class Categories {
  list: CategoryDetails[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoriesService
  ) {
    this.categoryService.getCategories().subscribe();
    this.categoryService.watchAllCategories().pipe(untilDestroyed(this)).subscribe(ps => this.list = ps);
  }

  add(){
    this.router.navigate(['newCategory'])
  }
}
