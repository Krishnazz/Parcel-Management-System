import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingServicePageComponent } from './user-booking-service-page.component';

describe('UserBookingServicePageComponent', () => {
  let component: UserBookingServicePageComponent;
  let fixture: ComponentFixture<UserBookingServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBookingServicePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookingServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
