import { NgModule } from '@angular/core';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ConceptAddEditFormComponent } from './concept-add-edit-form/concept-add-edit-form.component';
import { ConceptGridComponent } from './concept-grid/concept-grid.component';
import { ConceptOverviewComponent } from './concept-overview/concept-overview.component';
import { ConceptListElementComponent } from './concept-search/concept-list/concept-list-element/concept-list-element.component';
import { ConceptListComponent } from './concept-search/concept-list/concept-list.component';
import { ConceptSearchFormComponent } from './concept-search/concept-search-form/concept-search-form.component';
import { ConceptSearchComponent } from './concept-search/concept-search.component';


@NgModule({
    imports: [
        SharedModule,
        AngularMultiSelectModule
    ],
    exports: [],
    declarations: [
        ConceptOverviewComponent,
        ConceptGridComponent,
        ConceptSearchComponent,
        ConceptSearchComponent,
        ConceptSearchFormComponent,
        ConceptListComponent,
        ConceptListElementComponent,
        ConceptAddEditFormComponent
    ],
    providers: [],
})
export class ConceptModule { }
