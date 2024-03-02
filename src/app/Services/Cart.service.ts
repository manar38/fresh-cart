import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthorizedUserDataService } from './AuthorizedUserData.service';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  header: any = {
    token: localStorage.getItem('token'),
  };

  numCartItems = new BehaviorSubject(0);

  constructor(
    private _http: HttpClient,
    private _AuthUser: AuthorizedUserDataService
  ) {
    if (localStorage.getItem('token')) {
      this.getUserCart().subscribe({
        next: (response) => {
          console.log(response);
          this.numCartItems.next(response.numOfCartItems);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completed !');
        },
      });
    }

    this._AuthUser.freshToken.subscribe({
      next: (response) => {
        this.header.token = response;
        // console.log(this.header.token);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed !');
      },
    });
  }

  addToCart(productId: number): Observable<any> {
    return this._http.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId },
      { headers: this.header }
    );
  }
  getUserCart(): Observable<any> {
    console.log(this.header.token);
    return this._http.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: this.header,
    });
  }

  removeItemFromCart(productId: any): Observable<any> {
    return this._http.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers: this.header }
    );
  }

  updateCartQuantity(productId: any, count: number): Observable<any> {
    return this._http.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers: this.header }
    );
  }

  clearCart(): Observable<any> {
    console.log(this.header.token);
    return this._http.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: this.header,
    });
  }

  checkOut(id: any, formData: FormGroup): Observable<any> {
    return this._http.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: formData,
      },
      {
        headers: this.header,
      },
    );
  }
}
