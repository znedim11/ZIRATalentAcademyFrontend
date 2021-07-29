import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../../material.module';
import { LinkMapAddFormComponent } from '../link-map/link-map-add-form/link-map-add-form.component';
import { ReleaseAddFormComponent } from '../release/release-add-form/release-add-form.component';


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
    LinkMapAddFormComponent,
    ReleaseAddFormComponent
  ]

})
export class SharedModule { }