import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { FormulaAddEditFormComponent } from './formula-add-edit-form/formula-add-edit-form.component';
import { FormulaGradeElementComponent } from './formula-add-edit-form/formula-grade-element/formula-grade-element.component';
import { FormulaListElementComponent } from './formula-list/formula-list-element/formula-list-element.component';
import { FormulaListComponent } from './formula-list/formula-list.component';


@NgModule({
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [],
    declarations: [
        FormulaAddEditFormComponent,
        FormulaGradeElementComponent,
        FormulaListComponent,
        FormulaListElementComponent
    ],
    providers: [],
})
export class FormulaModule { }
