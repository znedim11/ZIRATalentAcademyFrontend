import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectExtendedComponent } from './project-extended.component';

describe('ProjectExtendedComponent', () => {
  let component: ProjectExtendedComponent;
  let fixture: ComponentFixture<ProjectExtendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectExtendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
