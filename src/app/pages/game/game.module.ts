import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GameOverviewComponent } from './game-overview.component';
import { GameAddEditFormComponent } from './game-add-edit-form/game-add-edit-form.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
    imports: [
        SharedModule,
        QuillModule.forRoot()
    ],
    exports: [],
    declarations: [
        GameOverviewComponent,
        GameGridComponent,
        GameAddEditFormComponent,
    ],
    providers: [],
})
export class GameModule { }
