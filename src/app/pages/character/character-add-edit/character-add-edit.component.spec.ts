import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAddEditComponent } from './character-add-edit.component';

describe('CharacterAddEditComponent', () => {
  let component: CharacterAddEditComponent;
  let fixture: ComponentFixture<CharacterAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
