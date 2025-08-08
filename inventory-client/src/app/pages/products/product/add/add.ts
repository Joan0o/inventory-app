import { Component } from '@angular/core';
import { SubcategoriesService } from '../../../../services/subcategories/subcategoriesService';
import { SubcategoryDetails } from '../../../../services/subcategories/subcategory';
import { CategoriesService } from '../../../../services/categories/categoriesService';
import { Router } from '@angular/router';
import { Header } from '../../../util/header/header';
import { Footer } from '../../../util/footer/footer';
import { Navbar } from '../../../util/navbar/navbar';
import { FormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductDetails } from '../../../../services/products/product-details';
import { ProductsServices } from '../../../../services/products/products-services';
import { CategoryDetails } from '../../../../services/categories/category-details';

@Component({
  selector: 'app-add',
  imports: [Header, Footer, Navbar, FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.sass'
})

@UntilDestroy()
export class Add {

  newProduct!: ProductDetails;

  dummytest: ProductDetails = {
    id: -101010,
    name: "",
    status: "active",
    category_id: 0,
    category: { id: -101010, name: 'dummy', status: "active" },
    subcategory_id: 0,
    subcategory: {
      id: -101010,
      name: "",
      status: "active",
      product_count: 0,
      category_id: 0,
      category: { id: 101010, name: 'dummy', status: "active" }
    }
  };

  subcategory_list: SubcategoryDetails[] = [];

  category!: CategoryDetails;
  subcategory!: SubcategoryDetails;

  constructor(
    private router: Router,
    private productService: ProductsServices,
    private subCategoryService: SubcategoriesService,
    private categoryService: CategoriesService,
  ) {
    this.newProduct = this.dummytest;
    subCategoryService.watchAllCategories().pipe(untilDestroyed(this)).subscribe(ps => {
      this.subcategory_list = ps
    });

  }

  saveChanges() {
    if (this.newProduct.name == '' || this.newProduct.subcategory_id == -101010)
      return;

    console.log(this.newProduct);

    this.productService.create(this.newProduct).subscribe(s => {
      this.router.navigate(['products']);
    });
  }

  cancel() {
    this.router.navigate(['products']);
  }

  changeCategory(event: Event) {
    this.getCategoryIdBySubCategoryId((event.target as HTMLInputElement).value);
    this.newProduct.subcategory = this.subcategory;
    this.newProduct.category = this.subcategory.category;
    this.newProduct.category_id = this.subcategory.category.id;
    this.newProduct.subcategory_id = this.subcategory.id;
  }

  getCategoryNameBySubCategoryId(id: number): string {
    let nameFound = '';
    for (let i = 0; i < this.subcategory_list.length; i++) {
      if (this.subcategory_list[i].id == id) {
        nameFound = this.subcategory_list[i].category.name ?? 'Sin categoría';
      }
    }
    return nameFound;
  }

  getCategoryIdBySubCategoryId(id: string): number | null {
    let idFound = -1;
    for (let i = 0; i < this.subcategory_list.length; i++) {
      if (this.subcategory_list[i].id+'' == id) {
        idFound = this.subcategory_list[i].category?.id ?? '-1';
        this.subcategory = this.subcategory_list[i];
      }
    }
    return idFound;
  }
}

