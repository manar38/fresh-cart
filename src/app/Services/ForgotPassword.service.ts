import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {

  isValidCode:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  RetypePassword:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    this.isValidCode.next(false);
  }
  forgotPassword(formData: any): Observable<any> {
    return this._http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      formData
    );
  }
  verificationCode(formData: any): Observable<any> {
    return this._http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      formData
    );
  }
  resetPassword(formData: any): Observable<any> {
    return this._http.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      formData
    );
  }
}
