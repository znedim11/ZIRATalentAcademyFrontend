import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ReviewAddEditFormComponent } from './review-add-edit-form/review-add-edit-form.component';
import { ReviewGradeElementComponent } from './review-add-edit-form/review-grade-element/review-grade-element.component';
import { ReviewGridComponent } from './review-overview/review-grid/review-grid.component';
import { ReviewOverviewComponent } from './review-overview/review-overview.component';
import { ReviewComponent } from './review.component';


@NgModule({
    imports: [
        SharedModule
    ],
    exports: [],
    declarations: [
        ReviewGradeElementComponent,
        ReviewAddEditFormComponent,
        ReviewOverviewComponent,
        ReviewGridComponent,
        ReviewComponent
    ],
    providers: [],
})
export class ReviewModule { }
