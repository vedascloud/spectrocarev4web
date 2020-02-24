import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientMedicalRecordComponent } from './view-patient-medical-record.component';

describe('ViewPatientMedicalRecordComponent', () => {
  let component: ViewPatientMedicalRecordComponent;
  let fixture: ComponentFixture<ViewPatientMedicalRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPatientMedicalRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
