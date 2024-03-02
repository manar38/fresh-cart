import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/Cart.service';
import { CategoriesService } from 'src/app/Services/Categories.service';
import { ProductsService } from 'src/app/Services/Products.service';
import { WishlistService } from 'src/app/Services/Wishlist.service';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: any[] = [];
  viewedProducts: Product[] = [];
  isLoading: boolean = true;
  searchTerm: string = '';
  constructor(
    private _productsService: ProductsService,
    private _CategoryService: CategoriesService,
    private _cartService: CartService,
    private _wishListService: WishlistService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCategories();
    this._productsService.getAllProducts().subscribe({
      next: (results) => {
        // console.log(results.data);
        this.products = results.data;
        this.viewedProducts = results.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // console.log('completed !');
      },
    });
  }

  getCategories() {
    this._CategoryService.getCategories().subscribe({
      next: (results) => {
        this.categories = results.data;
        // console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // console.log('completed !');
      },
    });
  }

  search() {
    const results = [];
    for (let i = 0; i < this.products.length; i++) {
      if (
        this.products[i].title
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      ) {
        results.push(this.products[i]);
      }
    }
    if (this.searchTerm) {
      this.products = results;
    } else {
      this.products = this.viewedProducts;
    }
  }

  addToCart(productID: any) {
    console.log(this._cartService.header.token);
    this._cartService.addToCart(productID).subscribe({
      next: (response) => {
        console.log(response);
        this._cartService.numCartItems.next(response.numOfCartItems);
        console.log(this._cartService.numCartItems.getValue());
        this.toastr.success(response.message, response.status, {
          closeButton: true,
          progressBar: true,
        });
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.message, 'Error', {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
        });
      },
      complete: () => {
        // console.log('completed !');
      },
    });
  }

  addProductToWishList(productID: any) {
    this._wishListService.AddToWishlist(productID).subscribe({
      next: (response) => {
        // console.log(response);
        this._wishListService.wishListItems.next(response.data);
        console.log(this._wishListService.wishListItems.getValue());

        this.toastr.success(response.message, response.status, {
          closeButton: true,
          progressBar: true,
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // console.log('completed !');
      },
    });
  }
}
