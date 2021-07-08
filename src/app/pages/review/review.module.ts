import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ReviewAddEditFormComponent } from './review-add-edit-form/review-add-edit-form.component';
import { ReviewGradeElementComponent } from './review-add-edit-form/review-grade-element/review-grade-element.component';
import { ReviewGridComponent } from './review-overview/review-grid/review-grid.component';
import { ReviewOverviewComponent } from './review-overview/review-overview.component';


@NgModule({
    imports: [
        SharedModule,
        QuillModule.forRoot()
    ],
    exports: [],
    declarations: [
        ReviewGradeElementComponent,
        ReviewAddEditFormComponent,
        ReviewOverviewComponent,
        ReviewGridComponent
    ],
    providers: [],
})
export class ReviewModule { }
