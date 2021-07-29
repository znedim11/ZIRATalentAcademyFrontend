import { Routes } from '@angular/router'
import { CharacterAddEditComponent } from './pages/character/character-add-edit/character-add-edit.component'
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
import { GameSearchComponent } from './pages/game/game-search/game-search.component'
import { HomeComponent } from './pages/home/home.component'
import { CompanyRegionPlatformComponent } from './pages/reports/company-region-platform/company-region-platform.component'
import { ReleaseOverviewComponent } from './pages/release/release-overview/release-overview.component'
import { FranchiseOverviewComponent } from './pages/franchise/franchise-overview/franchise-overview.component'
import { PlatformSearchComponent } from './pages/platform/platform-search/platform-search.component'
import { PlatformOverviewComponent } from './pages/platform/platform-overview/platform-overview.component'
import { LinkMapAddFormComponent } from './pages/link-map/link-map-add-form/link-map-add-form.component'
import { GameAddEditFormComponent } from './pages/game/game-add-edit-form/game-add-edit-form.component'
import { ReviewAddEditFormComponent } from './pages/review/review-add-edit-form/review-add-edit-form.component'
import { ReviewOverviewComponent } from './pages/review/review-overview/review-overview.component'
import { ReviewComponent } from './pages/review/review.component'
import { DlcAnalysisComponent } from './pages/reports/dlc-analysis/dlc-analysis.component'
import { ReleaseAddFormComponent } from './pages/release/release-add-form/release-add-form.component'

export const appRoutes: Routes = [
    { path: 'character/:id/overview', component: CharacterOverviewComponent },
    { path: 'character/search', component: CharacterSearchComponent },
    { path: 'add-character', component: CharacterAddEditComponent },
    { path: 'character/:id/edit', component: CharacterAddEditComponent },
    { path: 'concept/:id/overview', component: ConceptOverviewComponent },
    { path: 'add-concept', component: ConceptAddEditFormComponent },
    { path: 'concept/:id/edit', component: ConceptAddEditFormComponent },
    { path: 'concept/search', component: ConceptSearchComponent },
    { path: 'game/:id/overview', component: GameOverviewComponent },
    { path: 'game/search', component: GameSearchComponent },
    { path: 'game/:gameId/review/add', component: ReviewAddEditFormComponent },
    { path: 'game/:gameId/review/:id', component: ReviewOverviewComponent },
    { path: 'game/:gameId/review/:id/edit', component: ReviewAddEditFormComponent },
    { path: 'add-formula', component: FormulaAddEditFormComponent },
    { path: 'formula/:id/edit', component: FormulaAddEditFormComponent },
    { path: 'review-formula/preview', component: FormulaListComponent },
    { path: 'franchise', component: FranchiseComponent },
    { path: 'franchise/:id/overview', component: FranchiseOverviewComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'company/:id/edit', component: CompanyCreateComponent },
    { path: 'company-add', component: CompanyCreateComponent },
    { path: 'reviews', component: ReviewComponent },
    { path: 'reviews/external', component: ReviewComponent },
    { path: 'reviews/internal', component: ReviewComponent },
    { path: 'platform/search', component: PlatformSearchComponent },
    { path: 'platform/:id', component: PlatformOverviewComponent },
    { path: 'reports/dlc-analysis', component: DlcAnalysisComponent },
    { path: 'reports/company-region-platform', component: CompanyRegionPlatformComponent },
    { path: 'platform/:id/overview', component: PlatformOverviewComponent },
    { path: ':type/:id/link', component: LinkMapAddFormComponent},
    { path: 'add-game', component: GameAddEditFormComponent},
    { path: 'game/:id/edit', component: GameAddEditFormComponent},
    { path: 'home', component: HomeComponent},
    { path: 'release', component: ReleaseOverviewComponent},
    { path: 'release/add', component: ReleaseAddFormComponent}
]
