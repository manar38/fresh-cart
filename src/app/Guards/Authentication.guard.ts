import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);
  if (localStorage.getItem('token') == null) {
    _Router.navigate(['sign-in']);
    return false;
  } else {
    return true;
  }
};
