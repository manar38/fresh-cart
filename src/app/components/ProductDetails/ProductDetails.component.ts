import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/Cart.service';
import { ProductsService } from 'src/app/Services/Products.service';
import { Product } from 'src/app/interfaces/Product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ProductDetails',
  templateUrl: './ProductDetails.component.html',
  styleUrls: ['./ProductDetails.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productID?: any;
  myProduct?: Product;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // console.log(this._ActivatedRoute);

    // this._ActivatedRoute.snapshot.params['productId'];
    this.productID = this._ActivatedRoute.snapshot.paramMap.get('id');
    // console.log(this._ActivatedRoute.snapshot.paramMap.get('productId'));
    this._ProductsService.getProductDetails(this.productID).subscribe({
      next: (results) => {
        console.log(results.data);
        this.myProduct = results.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed !');
      },
    });
  }

  addToCart(productID: any) {
    this._cartService.addToCart(productID).subscribe({
      next: (response) => {
        // console.log(response);
        this._cartService.numCartItems.next(response.numOfCartItems);
        this.toastr.success(response.message, response.status, {
          closeButton: true,
          progressBar: true,
        });
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.message, 'Error', {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
        });
      },
      complete: () => {
        console.log('completed !');
      },
    });
  }
}
