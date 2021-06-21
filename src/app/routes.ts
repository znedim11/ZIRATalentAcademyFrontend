import { Routes } from '@angular/router'
import { FranchiseComponent } from './franchise/franchise.component'
import { HomeComponent } from './home/home.component'
import { ConceptOverviewComponent } from './concept/concept-overwiev.component'

export const appRoutes : Routes = [
    { path: 'concept/:id', component: ConceptOverviewComponent },
    { path: 'franchise', component: FranchiseComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
]