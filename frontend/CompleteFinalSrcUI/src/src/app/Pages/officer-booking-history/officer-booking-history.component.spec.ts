import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerBookingHistoryComponent } from './officer-booking-history.component';

describe('OfficerBookingHistoryComponent', () => {
  let component: OfficerBookingHistoryComponent;
  let fixture: ComponentFixture<OfficerBookingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerBookingHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
