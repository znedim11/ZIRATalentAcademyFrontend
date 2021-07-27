import { NgModule } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';


@NgModule({
    imports: [
        SharedModule,
        AutocompleteLibModule
    ],
    exports: [],
    declarations: [
        HomeComponent
    ],
    providers: [],
})
export class HomeModule { }
