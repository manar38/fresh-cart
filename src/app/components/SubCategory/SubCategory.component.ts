import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute module
import { CategoriesService } from 'src/app/Services/Categories.service';

@Component({
  selector: 'app-SubCategory',
  templateUrl: './SubCategory.component.html',
  styleUrls: ['./SubCategory.component.css'],
})
export class SubCategoryComponent implements OnInit {
  categoryID!: any;
  subCategories: any[] = [];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CategoryService: CategoriesService
  ) {}
  ngOnInit() {
    this.categoryID = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.getSubCategories(this.categoryID);
  }
  getSubCategories(categoryId: string) {
    this._CategoryService
      .getSubCategoriesBasedOnCategory(categoryId)
      .subscribe({
        next: (results) => {
          console.log(results);
          this.subCategories = results.data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          // console.log('completed !');
        },
      });
  }
}
