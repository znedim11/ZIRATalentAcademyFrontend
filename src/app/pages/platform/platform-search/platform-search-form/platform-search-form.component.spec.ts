import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformSearchFormComponent } from './platform-search-form.component';

describe('PlatformSearchFormComponent', () => {
  let component: PlatformSearchFormComponent;
  let fixture: ComponentFixture<PlatformSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
