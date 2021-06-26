import { Routes } from '@angular/router'
import { ConceptOverviewComponent } from './pages/concept/concept-overview/concept-overview.component'
import { ConceptListComponent } from './pages/concept/concept-search/concept-list/concept-list.component'
import { ConceptSearchComponent } from './pages/concept/concept-search/concept-search.component'
import { FranchiseComponent } from './pages/franchise/franchise.component'
import { GameOverviewComponent } from './pages/game/game-overview.component'
import { HomeComponent } from './pages/home/home.component'

export const appRoutes : Routes = [
    { path: 'concept/:id/overview', component: ConceptOverviewComponent },
    { path: 'concept/search', component: ConceptSearchComponent },
    { path: 'game/:id/information', component: GameOverviewComponent },
    { path: 'franchise', component: FranchiseComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]