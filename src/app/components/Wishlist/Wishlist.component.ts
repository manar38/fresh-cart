import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/Cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/Services/Wishlist.service';

@Component({
  selector: 'app-Wishlist',
  templateUrl: './Wishlist.component.html',
  styleUrls: ['./Wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishList: any[] = [];
  isEmpty: boolean = true;
  isLoading: boolean = true;
  constructor(
    private _wishListService: WishlistService,
    private _cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProductsFromWishList();
  }

  getProductsFromWishList() {
    this.isLoading = true;
    this._wishListService.getProductsFromWishlist().subscribe({
      next: (response) => {
        this._wishListService.wishListItems.next(response.data);
        this.wishList = this._wishListService.wishListItems.getValue();
        console.log('WishList Data ', this.wishList);
        if (this.wishList.length === 0) {
          this.isEmpty = true;
          // console.log('WishList is empty');
        } else {
          this.isEmpty = false;
          // console.log('WishList is not empty');
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // console.log('completed !');
        this.isLoading = false;
      },
    });
  }

  removeProductFromWishList(productID: any) {
    return this._wishListService
      .removeProductFromWishList(productID)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.getProductsFromWishList();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          // console.log('completed !');
        },
      });
  }

  addProductToCart(productID: any) {
    return this._cartService.addToCart(productID).subscribe({
      next: (response) => {
        console.log(response);
        this._cartService.numCartItems.next(response.numOfCartItems);
        this.toastr.success(response.message, response.status, {
          closeButton: true,
          progressBar: true,
        });
        this._cartService.getUserCart();
        this.removeProductFromWishList(productID);
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
}
