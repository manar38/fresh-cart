import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/Home.component';
import { SignInComponent } from './Authentication/Sign-in/Sign-in.component';
import { SignUpComponent } from './Authentication/rigester/Sign-up.component';
import { BrandsComponent } from './components/Brands/Brands.component';
import { ProductsComponent } from './components/Products/Products.component';
import { ProductDetailsComponent } from './components/ProductDetails/ProductDetails.component';
import { CategoryComponent } from './components/Category/Category.component';
import { CartComponent } from './components/Cart/Cart.component';
import { authenticationGuard } from './Guards/Authentication.guard';
import { LoginGuard } from './Guards/Login.guard';
import { ForgotPasswordComponent } from './Authentication/ForgotPassword/ForgotPassword.component';
import { ResetPasswordComponent } from './Authentication/ResetPassword/ResetPassword.component';
import { ForgotPasswordGuard } from './Guards/ForgotPassword.guard';
import { resetPasswordGuard } from './Guards/ResetPassword.guard';
import { NotFoundPageComponent } from './components/notFoundPage/notFoundPage.component';
import { PaymentComponent } from './components/Payment/Payment.component';
import { AllOrdersComponent } from './components/AllOrders/AllOrders.component';
import { WishlistComponent } from './components/Wishlist/Wishlist.component';
import { SubCategoryComponent } from './components/SubCategory/SubCategory.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [authenticationGuard],
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [authenticationGuard],
    component: HomeComponent,
  },
  {
    path: 'brands',
    canActivate: [authenticationGuard],
    component: BrandsComponent,
  },
  {
    path: 'sign-in',
    canActivate: [LoginGuard],
    component: SignInComponent,
  },
  {
    path: 'cart',
    canActivate: [authenticationGuard],
    component: CartComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'products',
    canActivate: [authenticationGuard],
    component: ProductsComponent,
  },
  {
    path: 'checkout',
    canActivate: [authenticationGuard],
    component: PaymentComponent,
  },
  {
    path: 'category',
    canActivate: [authenticationGuard],
    component: CategoryComponent,
  },
  {
    path: 'ForgotPassword',
    canActivate: [ForgotPasswordGuard],
    component: ForgotPasswordComponent,
  },
  {
    path: 'ResetPassword',
    canActivate: [resetPasswordGuard],
    component: ResetPasswordComponent,
  },
  {
    path: 'product_details/:id',
    canActivate: [authenticationGuard],
    component: ProductDetailsComponent,
  },
  {
    path: 'wishlist',
    canActivate: [authenticationGuard],
    component: WishlistComponent,
  },
  {
    path: 'allorders',
    canActivate: [authenticationGuard],
    component: AllOrdersComponent,
  },
  {
    path: 'sub_category/:id',
    canActivate: [authenticationGuard],
    component: SubCategoryComponent,
  },
  {
    path: '**',
    redirectTo: 'notFound',
    pathMatch: 'full',
  },
  {
    path: 'notFound',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
