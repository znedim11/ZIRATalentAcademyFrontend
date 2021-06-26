import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ConceptGridComponent } from './pages/concept/concept-grid/concept-grid.component';
import { ConceptOverviewComponent } from './pages/concept/concept-overview/concept-overview.component';
import { FranchiseFormComponent } from './pages/franchise/franchise-form/franchise-form.component';
import { FranchiseComponent } from './pages/franchise/franchise.component';
import { FranchisesListComponent } from './pages/franchise/franchises-list/franchises-list.component';
import { FranchiseService } from './pages/franchise/shared/franchise.service';
import { GameGridComponent } from './pages/game/game-grid/game-grid.component';
import { GameOverviewComponent } from './pages/game/game-overview.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuItemComponent } from './pages/menu/menu-item/menu-item.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RestApiService } from './pages/shared/rest-api.service';
import { appRoutes } from './routes';
import { ConceptSearchComponent } from './pages/concept/concept-search/concept-search.component';
import { ConceptSearchFormComponent } from './pages/concept/concept-search/concept-search-form/concept-search-form.component';
import { ConceptListComponent } from './pages/concept/concept-search/concept-list/concept-list.component';
import { ConceptListElementComponent } from './pages/concept/concept-search/concept-list/concept-list-element/concept-list-element.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
    FranchiseComponent,
    HomeComponent,
    FranchisesListComponent,
    FranchiseFormComponent,
    ConceptOverviewComponent,
    ConceptGridComponent,
    GameOverviewComponent,
    GameGridComponent,
    ConceptSearchComponent,
    ConceptSearchComponent,
    ConceptSearchFormComponent,
    ConceptListComponent,
    ConceptListElementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AgGridModule.withComponents([]),
    ToastrModule.forRoot(),
    HttpClientModule,
    AgGridModule.withComponents([]),
    MatTabsModule
  ],
  providers: [FranchiseService, RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
