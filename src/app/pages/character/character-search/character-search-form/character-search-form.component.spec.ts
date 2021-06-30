import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSearchFormComponent } from './character-search-form.component';

describe('CharacterSearchFormComponent', () => {
  let component: CharacterSearchFormComponent;
  let fixture: ComponentFixture<CharacterSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
