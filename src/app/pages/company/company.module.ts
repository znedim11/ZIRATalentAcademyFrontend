import { NgModule } from '@angular/core';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { SharedModule } from '../shared/shared.module';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [
    CompanyCreateComponent
  ],
  imports: [
    SharedModule,
    QuillModule.forRoot()
  ],
  exports: [
    CompanyCreateComponent
  ]
})
export class CompanyModule { }
