import { CategoryDetails } from "../categories/category-details";

export interface SubcategoryDetails {
  id: number,
  name: string,
  status: string,
  product_count: number,
  category_id: number,
  category: CategoryDetails
}
