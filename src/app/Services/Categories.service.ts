import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _http: HttpClient) {}

  getCategories(): Observable<any> {
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/categories/`);
  }
  getSubCategoriesBasedOnCategory(categoryId: string): Observable<any> {
    return this._http.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
    );
  }
}
