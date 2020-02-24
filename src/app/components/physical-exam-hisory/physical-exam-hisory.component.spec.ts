import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalExamHisoryComponent } from './physical-exam-hisory.component';

describe('PhysicalExamHisoryComponent', () => {
  let component: PhysicalExamHisoryComponent;
  let fixture: ComponentFixture<PhysicalExamHisoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalExamHisoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalExamHisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
