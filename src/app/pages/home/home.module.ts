import { NgModule } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SharedModule } from '../shared/shared.module';
import HomeGridComponent from './home-grid/home-grid.component';
import { HomeComponent } from './home.component';


@NgModule({
    imports: [
        SharedModule,
        AutocompleteLibModule
    ],
    exports: [],
    declarations: [
        HomeComponent,
        HomeGridComponent
    ],
    providers: [],
})
export class HomeModule { }
