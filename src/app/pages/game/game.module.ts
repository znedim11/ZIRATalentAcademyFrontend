import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { GameAddEditFormComponent } from './game-add-edit-form/game-add-edit-form.component';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GameOverviewComponent } from './game-overview.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        QuillModule.forRoot(),
        FormsModule
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
