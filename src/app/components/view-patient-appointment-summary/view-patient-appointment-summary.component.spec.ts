import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientAppointmentSummaryComponent } from './view-patient-appointment-summary.component';

describe('ViewPatientAppointmentSummaryComponent', () => {
  let component: ViewPatientAppointmentSummaryComponent;
  let fixture: ComponentFixture<ViewPatientAppointmentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPatientAppointmentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientAppointmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
