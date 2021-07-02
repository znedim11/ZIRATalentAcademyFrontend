import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GameOverviewComponent } from './game-overview.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [],
    declarations: [
        GameOverviewComponent,
        GameGridComponent
    ],
    providers: [],
})
export class GameModule { }
