import { NgModule } from '@angular/core';

import { PlatformCreateComponent } from './platform-create/platform-create.component';
import { SharedModule } from '../shared/shared.module';
import { PlatformOverviewComponent } from './platform-overview/platform-overview.component';
import { PlatformSearchComponent } from './platform-search/platform-search.component';
import { PlatformItemComponent } from './platform-search/platform-item/platform-item.component';
import { PlatformListComponent } from './platform-search/platform-list/platform-list.component';
import { PlatformSearchFormComponent } from './platform-search/platform-search-form/platform-search-form.component';


@NgModule({
  declarations: [
    PlatformCreateComponent,
    PlatformOverviewComponent,
    PlatformSearchComponent,
    PlatformItemComponent,
    PlatformListComponent,
    PlatformSearchFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    PlatformCreateComponent
  ]
})
export class PlatformModule { }
