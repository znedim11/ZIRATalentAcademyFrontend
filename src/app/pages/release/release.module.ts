import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ReleaseOverviewComponent } from './release-overview/release-overview.component';
import { ReleaseItemComponent } from './release-overview/release-item/release-item.component';



@NgModule({
    imports: [
        SharedModule,
        QuillModule.forRoot()
    ],
    exports: [],
    declarations: [
        ReleaseOverviewComponent,
        ReleaseItemComponent
    ],
    providers: [],
})
export class ReleaseModule { }