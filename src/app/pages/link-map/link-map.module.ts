import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LinkMapAddFormComponent } from './link-map-add-form/link-map-add-form.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [],
    declarations: [
        LinkMapAddFormComponent
    ],
    providers: [],
})
export class LinkMapModule { }
