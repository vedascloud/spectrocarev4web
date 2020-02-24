import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPatientProfileComponent } from './show-patient-profile.component';

describe('ShowPatientProfileComponent', () => {
  let component: ShowPatientProfileComponent;
  let fixture: ComponentFixture<ShowPatientProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPatientProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPatientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
