import { CategoryDetails } from "../categories/category-details";
import { SubcategoryDetails } from "../subcategories/subcategory";

export interface ProductDetails {
  id: number,
  name: string,
  status: string,
  category_id: number,
  subcategory_id: number,
  category: CategoryDetails,
  subcategory: SubcategoryDetails
}
