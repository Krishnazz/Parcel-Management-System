import { TestBed } from '@angular/core/testing';

import { OfficerBookingHistoryService } from './officer-booking-history.service';

describe('OfficerBookingHistoryService', () => {
  let service: OfficerBookingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficerBookingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
