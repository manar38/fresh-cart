import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedUserDataService {
  userData = new BehaviorSubject(null);
  userID: BehaviorSubject<any> = new BehaviorSubject(null);

  freshToken: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _Route: Router) {
    if (localStorage.getItem('token')) {
      this.getUserData();
      // console.log(this.userData);
    }
  }
  getUserData(): any {
    let encodedToken: any = localStorage.getItem('token');
    this.freshToken.next(encodedToken);
    console.log(this.freshToken.getValue());
    let decodedToken: any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
    this.userID.next(decodedToken.id);
    localStorage.setItem('userID', this.userID.getValue());
    // console.log(this.userData);
  }
  removeUserData() {
    this.userData.next(null);
    this.freshToken.next(null);
    localStorage.clear();
    this.userID.next(null);
    this._Route.navigate(['sign-in']);
  }
}
