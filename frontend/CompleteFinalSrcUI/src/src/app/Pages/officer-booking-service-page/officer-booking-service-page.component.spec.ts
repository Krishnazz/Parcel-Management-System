import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerBookingServicePageComponent } from './officer-booking-service-page.component';

describe('OfficerBookingServicePageComponent', () => {
  let component: OfficerBookingServicePageComponent;
  let fixture: ComponentFixture<OfficerBookingServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerBookingServicePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerBookingServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
