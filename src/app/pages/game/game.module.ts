import { NgModule } from '@angular/core';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { GameAddEditFormComponent } from './game-add-edit-form/game-add-edit-form.component';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GameOverviewComponent } from './game-overview.component';
import { GameListElementComponent } from './game-search/game-list/game-list-element/game-list-element.component';
import { GameListComponent } from './game-search/game-list/game-list.component';
import { GameSearchFormComponent } from './game-search/game-search-form/game-search-form.component';
import { GameSearchComponent } from './game-search/game-search.component';

@NgModule({
    imports: [
        SharedModule,
        QuillModule.forRoot(),
        AngularMultiSelectModule
    ],
    exports: [],
    declarations: [
        GameOverviewComponent,
        GameGridComponent,
        GameAddEditFormComponent,
        GameListComponent,
        GameListElementComponent,
        GameSearchFormComponent,
        GameSearchComponent
    ],
    providers: [],
})
export class GameModule { }
