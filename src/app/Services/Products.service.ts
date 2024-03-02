import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
HttpClient;
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  getProductDetails(id: number): Observable<any> {
    return this._http.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    )
  }
}
