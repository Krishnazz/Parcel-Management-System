import { TestBed } from '@angular/core/testing';

import { OfficerBookingServiceService } from './officer-booking-service.service';

describe('OfficerBookingServiceService', () => {
  let service: OfficerBookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficerBookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
