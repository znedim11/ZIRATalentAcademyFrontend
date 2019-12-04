import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeExtendedComponent } from './resume-extended.component';

describe('ResumeExtendedComponent', () => {
  let component: ResumeExtendedComponent;
  let fixture: ComponentFixture<ResumeExtendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeExtendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
