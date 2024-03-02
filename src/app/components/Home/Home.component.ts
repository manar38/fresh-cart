import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../Services/Products.service';
import { Product } from '../../interfaces/Product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from 'src/app/Services/Categories.service';
import { CartService } from 'src/app/Services/Cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/Services/Wishlist.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: any[] = [];
  isLoading: boolean = true;
  isWishlisted: boolean = false;
  WishlistItems: any[] = [];
  constructor(
    private _productsService: ProductsService,
    private _CategoryService: CategoriesService,
    private _cartService: CartService,
    private _wishListService: WishlistService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCategories();
    this._wishListService.getProductsFromWishlist().subscribe({
      next: (response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.WishlistItems.push(response.data[i]._id);
        }
        console.log('WishList Items ', this.WishlistItems);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // console.log('completed !');
      },
    });
    this._productsService.getAllProducts().subscribe({
      next: (results) => {
        // console.log(results.data);
        this.products = results.data;

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
        console.log(response);
        this._wishListService.wishListItems.next(response.data);
        this.WishlistItems = this._wishListService.wishListItems.getValue();

        // console.log(
        //   'WishList Items ',
        //   this._wishListService.wishListItems.getValue()
        // );
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

  removeProductFromWishList(productID: any) {
    return this._wishListService
      .removeProductFromWishList(productID)
      .subscribe({
        next: (response) => {
          console.log(response);
          this._wishListService.getProductsFromWishlist();
          this._wishListService.wishListItems.next(response.data);
          this.WishlistItems = this._wishListService.wishListItems.getValue();
          console.log(
            'WishList Items ',
            this._wishListService.wishListItems.getValue()
          );
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          // console.log('completed !');
        },
      });
  }

  categoryOption: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
}
