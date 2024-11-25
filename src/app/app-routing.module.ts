import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/users/user.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'products', component: ProductsComponent },
];
