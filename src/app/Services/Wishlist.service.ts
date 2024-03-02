import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthorizedUserDataService } from './AuthorizedUserData.service';
import { CartService } from './Cart.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  header: any = {
    token: localStorage.getItem('token'),
  };
  wishListItems: any = new BehaviorSubject([]);

  constructor(
    private _http: HttpClient,
    private _AuthUser: AuthorizedUserDataService,
    private_cartService: CartService
  ) {
    this._AuthUser.freshToken.subscribe({
      next: (response) => {
        this.header.token = response;
        console.log(this.header.token);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed !');
      },
    });
  }

  AddToWishlist(productId: any): Observable<any> {
    return this._http.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        productId: productId,
      },
      {
        headers: this.header,
      }
    );
  }
  getProductsFromWishlist(): Observable<any> {
    return this._http.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: this.header,
    });
  }

  removeProductFromWishList(productId: any): Observable<any> {
    return this._http.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: this.header,
      }
    );
  }
}
