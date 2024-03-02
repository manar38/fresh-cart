import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/Navbar/Navbar.component';
import { FooterComponent } from './shared/Footer/Footer.component';
import { NotFoundPageComponent } from './components/notFoundPage/notFoundPage.component';
import { CartComponent } from './components/Cart/Cart.component';
import { BrandsComponent } from './components/Brands/Brands.component';
import { WishlistComponent } from './components/Wishlist/Wishlist.component';
import { ProfileComponent } from './components/Profile/Profile.component';
import { SignInComponent } from './Authentication/Sign-in/Sign-in.component';
import { SignUpComponent } from './Authentication/rigester/Sign-up.component';
import { HomeComponent } from './components/Home/Home.component';
import { ProductsComponent } from './components/Products/Products.component';
import { ProductDetailsComponent } from './components/ProductDetails/ProductDetails.component';
import { CategoryComponent } from './components/Category/Category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './Authentication/ForgotPassword/ForgotPassword.component';
import { ResetPasswordComponent } from './Authentication/ResetPassword/ResetPassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/Payment/Payment.component';
import { AllOrdersComponent } from './components/AllOrders/AllOrders.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { SubCategoryComponent } from './components/SubCategory/SubCategory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundPageComponent,
    CartComponent,
    BrandsComponent,
    WishlistComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CategoryComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PaymentComponent,
    AllOrdersComponent,
    WishlistComponent,
    SubCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
