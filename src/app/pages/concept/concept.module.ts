import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { ConceptGridComponent } from './concept-grid/concept-grid.component';
import { ConceptOverviewComponent } from './concept-overview/concept-overview.component';
import { ConceptListElementComponent } from './concept-search/concept-list/concept-list-element/concept-list-element.component';
import { ConceptListComponent } from './concept-search/concept-list/concept-list.component';
import { ConceptSearchFormComponent } from './concept-search/concept-search-form/concept-search-form.component';
import { ConceptSearchComponent } from './concept-search/concept-search.component';


@NgModule({
    imports: [
        AgGridModule.withComponents([]),
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [],
    declarations: [
        ConceptOverviewComponent,
        ConceptGridComponent,
        ConceptSearchComponent,
        ConceptSearchComponent,
        ConceptSearchFormComponent,
        ConceptListComponent,
        ConceptListElementComponent
    ],
    providers: [],
})
export class ConceptModule { }
