import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const LoginGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);
  if (localStorage.getItem('token') != null) {
    _Router.navigate(['home']);
    return false;
  }
  return true;
};
