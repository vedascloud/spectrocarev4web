import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileFormComponent } from './patient-profile-form.component';

describe('PatientProfileFormComponent', () => {
  let component: PatientProfileFormComponent;
  let fixture: ComponentFixture<PatientProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientProfileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
