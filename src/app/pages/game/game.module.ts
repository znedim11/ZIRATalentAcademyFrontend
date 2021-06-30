import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GameOverviewComponent } from './game-overview.component';

@NgModule({
    imports: [
        AgGridModule.withComponents([]),
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        GameOverviewComponent,
        GameGridComponent
    ],
    providers: [],
})
export class GameModule { }
