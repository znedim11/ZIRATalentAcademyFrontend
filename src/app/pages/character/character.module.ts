import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CharacterItemComponent } from './character-search/character-item/character-item.component';
import { CharacterListComponent } from './character-search/character-list/character-list.component';
import { CharacterSearchFormComponent } from './character-search/character-search-form/character-search-form.component';
import { CharacterSearchComponent } from './character-search/character-search.component';

@NgModule({
  declarations: [
    CharacterItemComponent,
    CharacterListComponent,
    CharacterSearchComponent,
    CharacterSearchFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CharacterItemComponent,
    CharacterListComponent,
    CharacterSearchComponent,
    CharacterSearchFormComponent
  ]
})
export class CharacterModule { }
