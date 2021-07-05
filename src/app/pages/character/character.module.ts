import { NgModule } from '@angular/core';


import { SharedModule } from '../shared/shared.module';
import { CharacterGameGridComponent } from './character-overview/character-grid/character-game-grid/character-game-grid.component';
import { CharacterOverviewComponent } from './character-overview/character-overview.component';
import { CharacterItemComponent } from './character-search/character-item/character-item.component';
import { CharacterListComponent } from './character-search/character-list/character-list.component';
import { CharacterSearchFormComponent } from './character-search/character-search-form/character-search-form.component';
import { CharacterSearchComponent } from './character-search/character-search.component';

@NgModule({
  declarations: [
    CharacterGameGridComponent,
    CharacterOverviewComponent,
    CharacterItemComponent,
    CharacterListComponent,
    CharacterSearchComponent,
    CharacterSearchFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CharacterGameGridComponent,
    CharacterOverviewComponent,
    CharacterItemComponent,
    CharacterListComponent,
    CharacterSearchComponent,
    CharacterSearchFormComponent
  ]
})
export class CharacterModule { }
