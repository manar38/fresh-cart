/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthorizedUserDataService } from './AuthorizedUserData.service';

describe('Service: AuthorizedUserData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizedUserDataService]
    });
  });

  it('should ...', inject([AuthorizedUserDataService], (service: AuthorizedUserDataService) => {
    expect(service).toBeTruthy();
  }));
});
