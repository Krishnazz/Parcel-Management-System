import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingCustomerComponent } from './tracking-customer.component';

describe('TrackingCustomerComponent', () => {
  let component: TrackingCustomerComponent;
  let fixture: ComponentFixture<TrackingCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
