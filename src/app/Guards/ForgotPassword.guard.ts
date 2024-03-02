import { Router, type CanActivateFn } from '@angular/router';
import { ForgotPasswordService } from '../Services/ForgotPassword.service';
import { inject } from '@angular/core';
export const ForgotPasswordGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);
  let _ForgotPasswordService = inject(ForgotPasswordService);
  if (_ForgotPasswordService.isValidCode.getValue() == false) {
    return true;
  } else {
    _Router.navigate(['ResetPassword']);
    return false;
  }
};
