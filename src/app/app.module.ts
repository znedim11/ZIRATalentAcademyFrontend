import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CharacterModule } from './pages/character/character.module';
import { CompanyModule } from './pages/company/company.module';
import { ConceptModule } from './pages/concept/concept.module';
import { FormulaModule } from './pages/formula/formula.module';
import { FranchiseFormComponent } from './pages/franchise/franchise-form/franchise-form.component';
import { FranchiseComponent } from './pages/franchise/franchise.component';
import { FranchisesListComponent } from './pages/franchise/franchises-list/franchises-list.component';
import { FranchiseService } from './pages/franchise/shared/franchise.service';
import { GameModule } from './pages/game/game.module';
import { HomeComponent } from './pages/home/home.component';
import { MenuItemComponent } from './pages/menu/menu-item/menu-item.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ReviewModule } from './pages/review/review.module';
import { ReviewComponent } from './pages/review/review.component';
import { FormValidatorService } from './pages/shared/form-validator.service';
import { RestApiService } from './pages/shared/rest-api.service';
import { appRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
    FranchiseComponent,
    HomeComponent,
    FranchisesListComponent,
    FranchiseFormComponent,
    ReviewComponent,
  ],
  imports: [
    CharacterModule,
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
    MatTabsModule,
    ConceptModule,
    GameModule,
    FormulaModule,
    CompanyModule,
    ReviewModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    FranchiseService, 
    RestApiService,
    FormValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
