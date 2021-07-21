import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformSearchComponent } from './platform-search.component';

describe('PlatformSearchComponent', () => {
  let component: PlatformSearchComponent;
  let fixture: ComponentFixture<PlatformSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
