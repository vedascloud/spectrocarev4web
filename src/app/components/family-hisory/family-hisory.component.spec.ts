import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyHisoryComponent } from './family-hisory.component';

describe('FamilyHisoryComponent', () => {
  let component: FamilyHisoryComponent;
  let fixture: ComponentFixture<FamilyHisoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyHisoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyHisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
