import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/Services/Categories.service';

@Component({
  selector: 'app-Category',
  templateUrl: './Category.component.html',
  styleUrls: ['./Category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  constructor(private _CategoryService: CategoriesService) {}

  ngOnInit() {
    this._CategoryService.getCategories().subscribe({
      next: (results) => {
        this.categories = results.data;
        console.log(this.categories);
        
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
