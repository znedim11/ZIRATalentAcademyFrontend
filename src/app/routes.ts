import { Routes } from '@angular/router'
import { ConceptOverviewComponent } from './pages/concept/concept-overwiev.component'
import { FranchiseComponent } from './pages/franchise/franchise.component'
import { HomeComponent } from './pages/home/home.component'

export const appRoutes : Routes = [
    { path: 'concept/:id/overview', component: ConceptOverviewComponent },
    { path: 'franchise', component: FranchiseComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]