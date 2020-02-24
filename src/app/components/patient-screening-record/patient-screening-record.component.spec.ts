import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientScreeningRecordComponent } from './patient-screening-record.component';

describe('PatientScreeningRecordComponent', () => {
  let component: PatientScreeningRecordComponent;
  let fixture: ComponentFixture<PatientScreeningRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientScreeningRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientScreeningRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
