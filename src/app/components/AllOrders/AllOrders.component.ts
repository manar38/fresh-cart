import { Component, OnInit } from '@angular/core';
import { AuthorizedUserDataService } from 'src/app/Services/AuthorizedUserData.service';
import { UserOrdersService } from 'src/app/Services/UserOrders.service';

@Component({
  selector: 'app-AllOrders',
  templateUrl: './AllOrders.component.html',
  styleUrls: ['./AllOrders.component.css'],
})
export class AllOrdersComponent implements OnInit {
  isLoading: boolean = true;
  userOrders: any[] = [];

  constructor(
    private _userOrdersService: UserOrdersService,
    private _AuthService: AuthorizedUserDataService
  ) {
    localStorage.setItem('token', this._AuthService.freshToken.getValue());
  }

  ngOnInit() {
    this.isLoading = true;
    this._userOrdersService
      .getAllUserOrders(this._AuthService.userID.getValue())
      .subscribe({
        next: (response) => {
          console.log(response);
          for(var i = 0; i < response.length; i++){
            this.userOrders.push(response[i]);
          }
          console.log(this.userOrders);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }
}
