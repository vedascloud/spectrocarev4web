import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedrecordComponent } from './addmedrecord.component';

describe('AddmedrecordComponent', () => {
  let component: AddmedrecordComponent;
  let fixture: ComponentFixture<AddmedrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmedrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmedrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
