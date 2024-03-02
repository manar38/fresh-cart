import { Component, OnInit } from '@angular/core';
import { AuthorizedUserDataService } from 'src/app/Services/AuthorizedUserData.service';
import { CartService } from 'src/app/Services/Cart.service';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  cartItems!: number;
  constructor(
    private _AuthUser: AuthorizedUserDataService,
    private _cartService: CartService
  ) {
    _AuthUser.userData.subscribe({
      next: () => {
        if (this._AuthUser.userData.getValue()) {
          // console.log(this._AuthUser.userData);
          this.isLogin = true;
          console.log('there is user data');
          let token: any = localStorage.getItem('token');
          this._AuthUser.freshToken.next(token);
          console.log(this._AuthUser.freshToken.getValue());
          this.getTheUserCart();
        } else {
          console.log('no user data');
          this.isLogin = false;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._cartService.numCartItems.subscribe({
      next: (response) => {
        console.log(response);
        this.cartItems = response;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed !');
      },
    });
  }
  getTheUserCart() {
    this._cartService.getUserCart().subscribe({
      next: (response) => {
        this._cartService.numCartItems.next(response.numOfCartItems);
        this.cartItems = this._cartService.numCartItems.getValue();
        console.log(this._cartService.numCartItems.getValue());
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed !');
      },
    });
  }
  ngOnInit() {}

  logout() {
    this._AuthUser.removeUserData();
    this._cartService.numCartItems.next(0);
    this.isLogin = false;
  }
}
