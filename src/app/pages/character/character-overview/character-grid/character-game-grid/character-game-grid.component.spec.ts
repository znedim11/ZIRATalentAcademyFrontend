import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterGameGridComponent } from './character-game-grid.component';

describe('CharacterGameGridComponent', () => {
  let component: CharacterGameGridComponent;
  let fixture: ComponentFixture<CharacterGameGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterGameGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterGameGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
