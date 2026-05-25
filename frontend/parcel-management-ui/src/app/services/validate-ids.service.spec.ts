import { TestBed } from '@angular/core/testing';

import { ValidateIdsService } from './validate-ids.service';

describe('ValidateIdsService', () => {
  let service: ValidateIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
