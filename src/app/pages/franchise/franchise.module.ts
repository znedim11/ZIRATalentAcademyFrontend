import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FranchiseCreateComponent } from './franchise-form/franchise-form.component';
import { FranchiseOverviewComponent } from './franchise-overview/franchise-overview.component';
import { FranchiseComponent } from './franchise.component';
import { FranchisesListComponent } from './franchises-list/franchises-list.component';
import { FranchiseService } from './shared/franchise.service';


@NgModule({
    imports: [
        SharedModule
    ],
    exports: [],
    declarations: [
        FranchiseCreateComponent,
        FranchiseOverviewComponent,
        FranchisesListComponent,
        FranchiseComponent
    ],
    providers: [
        FranchiseService
    ],
})
export class FranchiseModule { }
