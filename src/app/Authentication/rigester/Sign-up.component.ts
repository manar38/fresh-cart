import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/Services/Sign-Up.service';

@Component({
  selector: 'app-Sign-up',
  templateUrl: './Sign-up.component.html',
  styleUrls: ['./Sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  
  errors: string[] = [];
  isLoading: boolean = false;

  constructor(private _signUpService: SignUpService,private _Route:Router) {}

  ngOnInit() {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/
      ),
    ]),
    rePassword: new FormControl(null,[
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/
      ),
    ]),
    phone: new FormControl(null,[Validators.required,Validators.pattern("^01[0125][0-9]{8}$")]),
  },{validators:[this.confirmPassword]} as FormControlOptions);

  confirmPassword(regForm: FormGroup) {
    if (regForm.get('password')?.value !== regForm.get('rePassword')?.value) {
      regForm.get('rePassword')?.setErrors({ notMatch: true });
    }
    else if(regForm.get('rePassword')?.value === '')
    {
      regForm.get('rePassword')?.setErrors({required:true})
    }
  }

  onSubmit(form: FormGroup) {
    console.log(form);
    this.isLoading = true;
    if (form.valid) {
      this._signUpService.Register(form.value).subscribe({
        next: (response) => {
          console.log(response);
          this._Route.navigate(['sign-in']);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err.error.message);
          this.errors = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
