import { NgModule } from '@angular/core';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ReleaseAddFormComponent } from './release-add-form/release-add-form.component';
import { ReleaseItemComponent } from './release-overview/release-item/release-item.component';
import { ReleaseOverviewComponent } from './release-overview/release-overview.component';



@NgModule({
    imports: [
        SharedModule,
        QuillModule.forRoot(),
        AngularMultiSelectModule
    ],
    exports: [],
    declarations: [
        ReleaseOverviewComponent,
        ReleaseItemComponent,
        ReleaseAddFormComponent
    ],
    providers: [
    ],
})
export class ReleaseModule { }