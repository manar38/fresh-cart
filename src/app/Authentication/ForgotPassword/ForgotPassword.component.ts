import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ForgotPasswordService } from 'src/app/Services/ForgotPassword.service';

@Component({
  selector: 'app-ForgotPassword',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  successCodeMessage!: string;
  successVerificationMessage!: string;
  codeErrorMessage!: string;

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private _Route: Router
  ) {
    this.forgotPasswordService.isValidCode.next(false);
  }

  ngOnInit() {}

  ForgotPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  resetCodeform: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  sendCode(email: any) {
    console.log(email);
    this.forgotPasswordService.forgotPassword(email).subscribe({
      next: (response) => {
        console.log(response);
        this.successCodeMessage = response.message;
        setInterval(() => {
          document.querySelector('#verify-code')?.classList.remove('d-none');
          document.querySelector('#forgot-password')?.classList.add('d-none');
        }, 1500);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  verifyCode(code: any) {
    console.log(code);
    this.forgotPasswordService.verificationCode(code).subscribe({
      next: (response) => {
        this.successVerificationMessage = response.status;
        this.codeErrorMessage = '';
        this.forgotPasswordService.isValidCode.next(true);
        let x = setInterval(() => {
          this._Route.navigate(['ResetPassword']);
          clearInterval(x);
        }, 1500);
      },
      error: (err) => {
        this.codeErrorMessage = err.error.message;
      },
    });
  }
}
