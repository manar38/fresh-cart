import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrandsService } from 'src/app/Services/Brands.service';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-Brands',
  templateUrl: './Brands.component.html',
  styleUrls: ['./Brands.component.css'],
})
export class BrandsComponent implements OnInit {
  brands!: any[];
  isLoading: boolean = true;
  myBrand: any;
  showBrand: boolean = false;
  @ViewChild('closeButton') closeButtonRef!: ElementRef;

  constructor(private _BrandsService: BrandsService) {}

  ngOnInit() {
    this.isLoading = true;
    this._BrandsService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
        console.log(this.brands);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('completed !');
        this.isLoading = false;
      },
    });
  }

  brandDetails(id: any) {
    this._BrandsService.getBrandDetails(id).subscribe({
      next: (response) => {
        console.log(response);
        this.showBrand = true;
        this.viewBrand(response.data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed !');
      },
    });
  }
  viewBrand(brand: any) {
    this.myBrand = brand;
    let y = setInterval(() => {
      document.querySelector('.modal')?.classList.add('d-block');
      document.querySelector('.modal')?.classList.remove('d-none');
      console.log('is shown now');
      clearInterval(y);
    }, 100);
    document.querySelector('.modal')?.classList.add('show');
    document.querySelector('.modal')?.classList.remove('hide');
  }

  closePopup() {
    document.querySelector('.modal')?.classList.add('hide');
    document.querySelector('.modal')?.classList.remove('show');
    let x = setInterval(() => {
      document.querySelector('.modal')?.classList.add('d-none');
      document.querySelector('.modal')?.classList.remove('d-block');
      clearInterval(x);
    }, 100);
    console.log('is hidden now');
  }
}
