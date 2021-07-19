import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddEditFormComponent } from './game-add-edit-form.component';

describe('GameAddEditFormComponent', () => {
  let component: GameAddEditFormComponent;
  let fixture: ComponentFixture<GameAddEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAddEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
