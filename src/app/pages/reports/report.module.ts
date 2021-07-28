import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { DlcAnalysisComponent } from './dlc-analysis/dlc-analysis.component';
import { CompanyRegionPlatformComponent } from './company-region-platform/company-region-platform.component';

@NgModule({
  declarations: [
    DlcAnalysisComponent, 
    CompanyRegionPlatformComponent
  ],
  imports: [
    SharedModule,
    AngularMultiSelectModule
  ]
})
export class ReportModule { }
