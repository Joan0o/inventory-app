import { Component } from '@angular/core';
import { SubcategoryDetails } from '../../services/subcategories/subcategory';
import { ProductComponent } from './product/product-component';
import { ProductsServices } from '../../services/products/products-services';
import { ProductDetails } from '../../services/products/product-details';
import { SubcategoriesService } from '../../services/subcategories/subcategoriesService';
import { Header } from '../util/header/header';
import { Footer } from '../util/footer/footer';
import { Navbar } from '../util/navbar/navbar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-products-component',
  imports: [
    ProductComponent,
    Header, Footer, Navbar],
  templateUrl: './products-component.html',
  styleUrl: './products-component.sass'
})

@UntilDestroy()
export class ProductsComponent {
  list: ProductDetails[] = [];
  subcategory_list: SubcategoryDetails[] = [];

  constructor(
    private router: Router,
    private subCategoryService: SubcategoriesService,
    private productsService: ProductsServices,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getCategories().subscribe();
    this.productsService.watchAllCategories().pipe(untilDestroyed(this)).subscribe(ps => {
      this.list = ps
      this.cdr.detectChanges();
    });
  }

  add() {
    this.router.navigate(['newproduct'])
  }
}

