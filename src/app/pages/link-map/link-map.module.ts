import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';
import { LinkMapAddFormComponent } from './link-map-add-form/link-map-add-form.component';

@NgModule({
    imports: [
        SharedModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    exports: [],
    declarations: [
        LinkMapAddFormComponent
    ],
    providers: [],
})
export class LinkMapModule { }
