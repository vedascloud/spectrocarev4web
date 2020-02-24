import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyIndexComponent } from './body-index.component';

describe('BodyIndexComponent', () => {
  let component: BodyIndexComponent;
  let fixture: ComponentFixture<BodyIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
