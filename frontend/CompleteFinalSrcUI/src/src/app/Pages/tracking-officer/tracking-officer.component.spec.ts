import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingOfficerComponent } from './tracking-officer.component';

describe('TrackingOfficerComponent', () => {
  let component: TrackingOfficerComponent;
  let fixture: ComponentFixture<TrackingOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingOfficerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
