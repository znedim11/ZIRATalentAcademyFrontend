import { Routes } from '@angular/router'
import { CharacterOverviewComponent } from './pages/character/character-overview/character-overview.component'
import { CharacterSearchComponent } from './pages/character/character-search/character-search.component'
import { CompanyCreateComponent } from './pages/company/company-create/company-create.component'
import { ConceptAddEditFormComponent } from './pages/concept/concept-add-edit-form/concept-add-edit-form.component'
import { ConceptOverviewComponent } from './pages/concept/concept-overview/concept-overview.component'
import { ConceptSearchComponent } from './pages/concept/concept-search/concept-search.component'
import { FormulaAddEditFormComponent } from './pages/formula/formula-add-edit-form/formula-add-edit-form.component'
import { FormulaListComponent } from './pages/formula/formula-list/formula-list.component'
import { FranchiseComponent } from './pages/franchise/franchise.component'
import { GameOverviewComponent } from './pages/game/game-overview.component'
import { HomeComponent } from './pages/home/home.component'
import { ReviewAddEditFormComponent } from './pages/review/review-add-edit-form/review-add-edit-form.component'


export const appRoutes: Routes = [
    { path: 'character/:id/overview', component: CharacterOverviewComponent },
    { path: 'character/search', component: CharacterSearchComponent },
    { path: 'concept/:id/overview', component: ConceptOverviewComponent },
    { path: 'add-concept', component: ConceptAddEditFormComponent },
    { path: 'concept/:id/edit', component: ConceptAddEditFormComponent },
    { path: 'concept/search', component: ConceptSearchComponent },
    { path: 'game/:id/information', component: GameOverviewComponent },
    { path: 'game/:gameId/review/add', component: ReviewAddEditFormComponent },
    { path: 'game/:gameId/review/:id/edit', component: ReviewAddEditFormComponent },
    { path: 'add-formula', component: FormulaAddEditFormComponent },
    { path: 'formula/:id/edit', component: FormulaAddEditFormComponent },
    { path: 'review-formula/preview', component: FormulaListComponent },
    { path: 'franchise', component: FranchiseComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'company/:id/edit', component: CompanyCreateComponent },
    { path: 'company-add', component: CompanyCreateComponent }
]