
import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { SubcategoryDetails } from '../../../services/subcategories/subcategory';
import { ProductDetails } from '../../../services/products/product-details';
import { ProductsServices } from '../../../services/products/products-services';
import { FormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SubcategoriesService } from '../../../services/subcategories/subcategoriesService';

@Component({
  selector: 'app-product-component',
  imports: [FormsModule],
  templateUrl: './product-component.html',
  styleUrl: './product-component.sass'
})

@UntilDestroy()
export class ProductComponent {

  private productService = inject(ProductsServices);

  @Input({ required: true }) product!: ProductDetails;

  isEditing = false;
  editedProduct!: ProductDetails;
  subcategory_list: SubcategoryDetails[] = [];

  constructor(
    private subCategoryService: SubcategoriesService,
    private cdr: ChangeDetectorRef
  ) {
    
  }

  ngOnInit() {
    this.editedProduct = { ...this.product };
    this.subCategoryService.getCategories().subscribe();
    this.subCategoryService.watchAllCategories().pipe(untilDestroyed(this)).subscribe(ps => {
      this.subcategory_list = ps
      this.cdr.detectChanges();
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    for (let i = 0; i < this.subcategory_list.length; i++) {
      if (this.subcategory_list[i].id == this.editedProduct.subcategory_id){
        this.editedProduct.subcategory_id = this.subcategory_list[i].id;
        this.editedProduct.category_id = this.subcategory_list[i].category_id;
        this.editedProduct.category = this.subcategory_list[i].category;
        this.editedProduct.subcategory = this.subcategory_list[i];
      }
    }
    this.product = { ...this.editedProduct };
    this.isEditing = false;
    this.productService.update(this.product.id, this.product).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
      },
      error: (error) => {
        console.error('Update failed:', error);
      }
    });
  }

  cancelEdit() {
    this.editedProduct = { ...this.product };
    this.isEditing = false;
  }

  getCategoryName(product: ProductDetails): string {
    return product.category?.name ?? 'Ninguna';
  }

  getSubcategoryName(product: ProductDetails): string {
    return product.subcategory?.name ?? 'Ninguna';
  }

  getCategoryNameBySubCategoryId(s: SubcategoryDetails): string {
    let nameFound = '';
    let id = s.category_id;
    for (let i = 0; i < this.subcategory_list.length; i++) {
      console.log(this.subcategory_list);
      if (this.subcategory_list[i].category_id == id) {
        console.log(id, this.subcategory_list[i]);
        nameFound = this.subcategory_list[i].category?.name ?? 'Sin categoría';
      }
    }
    return nameFound;
  }

}


