import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Categories } from './pages/categories/categories';
import { SubcategoriesComponent } from './pages/subcategories/subcategories-component';
import { AddCategory } from './pages/categories/category/add-category/add-category';
import { Add as addSubcategory } from './pages/subcategories/subcategory/add/add';
import { Add as addProduct } from './pages/products/product/add/add';
import { ProductsComponent } from './pages/products/products-component';
import { Add as addUser } from './pages/users/user/add/add';
import { UsersComponent } from './pages/users/users-component';
import { usersLogin } from './pages/users/users-login';

export const routes: Routes = [
  {
    path: '',
    component: usersLogin,
    title: 'Home page',
  }, 
  {
    path: 'categories',
    component: Categories,
    title: 'categories',
  },
  {
    path: 'subcategories',
    component: SubcategoriesComponent,
    title: 'categories',
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'categories',
  },
  {
    path: 'users',
    component: UsersComponent,
    title: 'User list',
  },
  {
    path: 'newCategory',
    component: AddCategory,
    title: 'Create category',
  },
  {
    path: 'newSubcategory',
    component: addSubcategory,
    title: 'Create subcategory',
  },
  {
    path: 'newproduct',
    component: addProduct,
    title: 'Create product',
  },
  {
    path: 'newuser',
    component: addUser,
    title: 'Create user',
  },
];
