import { TestBed } from '@angular/core/testing';

import { UserBookingHistoryService } from './user-booking-history.service';

describe('UserBookingHistoryService', () => {
  let service: UserBookingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBookingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
