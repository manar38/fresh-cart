import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { ForgotPasswordService } from '../Services/ForgotPassword.service';

export const resetPasswordGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);
  let _ForgotPasswordService = inject(ForgotPasswordService);
  if (_ForgotPasswordService.RetypePassword.getValue()) {
    return false;
  } else {
    return true;
  }
};
