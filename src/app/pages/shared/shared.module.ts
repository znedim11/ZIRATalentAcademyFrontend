import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { ToastrModule } from 'ngx-toastr';
import { LinkMapAddFormComponent } from '../link-map/link-map-add-form/link-map-add-form.component';
import {MatDialogModule} from '@angular/material/dialog'


@NgModule({
  declarations: [],
  imports: [
    MatTabsModule,
    MatDialogModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AgGridModule,
    MatTabsModule,
    ToastrModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatListModule
  ],
  entryComponents:[
    LinkMapAddFormComponent
  ]

})
export class SharedModule { }