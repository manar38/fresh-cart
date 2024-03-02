import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/Cart.service';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css'],
})
export class CartComponent implements OnInit {
  userCart!: any[];
  totalCartPrice: number = 0;
  isLoading: boolean = true;
  constructor(private _cartService: CartService) {}

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.getUserCart();
    }
  }

  getUserCart() {
    return this._cartService.getUserCart().subscribe({
      next: (response) => {
        console.log(response);
        this._cartService.numCartItems.next(response.numOfCartItems);
        this.userCart = response.data.products;
        // console.log(this.userCart);
        this.totalCartPrice = response.data.totalCartPrice;
      },
      error: (err) => {
        console.log(err);
        this._cartService.numCartItems.next(0);
        this.userCart = [];
        this.totalCartPrice = 0;
        this.isLoading = false;
      },
      complete: () => {
        // console.log('completed !');
        this.isLoading = false;
      },
    });
  }

  updateCartQuantity(productID: any, quantity: number) {
    if (quantity == 0) {
      this.removeFromCart(productID);
    }
    return this._cartService.updateCartQuantity(productID, quantity).subscribe({
      next: (response) => {
        // console.log(response);
        this.getUserCart();
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

  removeFromCart(productID: any) {
    this.isLoading = true;
    console.log(this._cartService.header.token);
    this._cartService.removeItemFromCart(productID).subscribe({
      next: (response) => {
        console.log(response);
        this.getUserCart();
        this._cartService.numCartItems.next(response.numOfCartItems);
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

  emptyCart() {
    return this._cartService.clearCart().subscribe({
      next: (response) => {
        console.log(response);
        this._cartService.numCartItems.next(0);
        this.userCart = [];
        this.totalCartPrice = 0;
        this.isLoading = false;
        this.getUserCart();
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
}
