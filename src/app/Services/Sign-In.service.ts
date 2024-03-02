import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private _http: HttpClient) {}

  validateUser(loginForm: any): Observable<any> {
    return this._http.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      loginForm
    );
  }
}
