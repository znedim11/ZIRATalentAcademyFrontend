import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FranchiseComponent } from './franchise.component';
import { FranchiseFormComponent } from './franchise-form/franchise-form.component';
import { FranchisesListComponent } from './franchises-list/franchises-list.component';


@NgModule({
  declarations: [
      FranchiseComponent,
      FranchiseFormComponent,
      FranchisesListComponent
  ],
  imports: [
    SharedModule
  ],
  exports: []
})
export class FranchiseModule { }
