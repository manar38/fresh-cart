import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/Services/Cart.service';

@Component({
  selector: 'app-Payment',
  templateUrl: './Payment.component.html',
  styleUrls: ['./Payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cartID: any;
  isLoading: boolean = false;
  userID: any = new BehaviorSubject(null);

  constructor(private _cartService: CartService) {}

  ngOnInit() {
    this.getUserCart();
  }

  checkout = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  });

  confirmPayment(formData: FormGroup) {
    console.log(formData.value);
    console.log(this.cartID);
    this.isLoading = true;
    this._cartService.checkOut(this.cartID, formData.value).subscribe({
      next: (response) => {
        console.log(response);
        window.location = response.session.url;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed !');
        this.isLoading = false;
      },
    });
  }

  getUserCart() {
    return this._cartService.getUserCart().subscribe({
      next: (response) => {
        console.log(response);
        this.cartID = response.data._id;
        console.log(this.cartID);
      },
      error: (err) => {
        console.log(err.message);
      },
      complete: () => {
        // console.log('completed !');
      },
    });
  }
}
