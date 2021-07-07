import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ReviewAddEditFormComponent } from './review-add-edit-form/review-add-edit-form.component';
import { ReviewGradeElementComponent } from './review-add-edit-form/review-grade-element/review-grade-element.component';


@NgModule({
    imports: [
        SharedModule,
        QuillModule.forRoot()
    ],
    exports: [],
    declarations: [
        ReviewGradeElementComponent,
        ReviewAddEditFormComponent
    ],
    providers: [],
})
export class ReviewModule { }
