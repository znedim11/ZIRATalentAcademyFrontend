import { Routes } from '@angular/router';

import { CharacterSearchComponent } from './pages/character/character-search/character-search.component';
import { FranchiseComponent } from './pages/franchise/franchise.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Routes = [
    { path: 'character/search', component: CharacterSearchComponent },
    { path: 'franchise', component: FranchiseComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]