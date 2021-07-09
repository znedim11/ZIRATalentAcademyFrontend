import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { CharacterOverviewComponent } from './character-overview/character-overview.component';
import { CharacterItemComponent } from './character-search/character-item/character-item.component';
import { CharacterListComponent } from './character-search/character-list/character-list.component';
import { CharacterSearchFormComponent } from './character-search/character-search-form/character-search-form.component';
import { CharacterSearchComponent } from './character-search/character-search.component';
import { CharacterAddEditComponent } from './character-add-edit/character-add-edit.component';
import { CharacterGridComponent } from './character-overview/character-grid/character-grid.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    CharacterOverviewComponent,
    CharacterItemComponent,
    CharacterListComponent,
    CharacterSearchComponent,
    CharacterSearchFormComponent,
    CharacterAddEditComponent,
    CharacterGridComponent
  ],
  imports: [
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    QuillModule.forRoot()
  ],
  exports: [
    CharacterOverviewComponent,
    CharacterItemComponent,
    CharacterListComponent,
    CharacterSearchComponent,
    CharacterSearchFormComponent
  ]
})
export class CharacterModule { }
