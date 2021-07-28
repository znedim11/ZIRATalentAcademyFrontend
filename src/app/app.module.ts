import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CharacterModule } from './pages/character/character.module';
import { CompanyModule } from './pages/company/company.module';
import { FormulaModule } from './pages/formula/formula.module';
import { ReleaseModule } from './pages/release/release.module';
import { GameModule } from './pages/game/game.module';
import { ReviewModule } from './pages/review/review.module';
import { DateFormatterService } from './pages/shared/date-formatter.service';
import { FormValidatorService } from './pages/shared/form-validator.service';
import { appRoutes } from './routes';
import { RestApiService } from './pages/shared/rest-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ConceptModule } from './pages/concept/concept.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReportModule } from './pages/reports/report.module'
import { PlatformModule } from './pages/platform/platform.module';
import { FranchiseModule } from './pages/franchise/franchise.module';
import { MenuModule } from './pages/menu/menu.module';
import { LinkMapModule } from './pages/link-map/link-map.module';
import { HomeModule } from './pages/home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    AgGridModule,
    HttpClientModule,
    MatTabsModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    GameModule,
    CharacterModule,
    FormulaModule,
    ReleaseModule,
    NgMultiSelectDropDownModule.forRoot(),
    CompanyModule,
    ReviewModule,
    PlatformModule,
    FormulaModule,
    FranchiseModule,
    ConceptModule,
    MenuModule,
    LinkMapModule,
    FranchiseModule,
    MatSelectModule,
    MatInputModule,
    QuillModule.forRoot(),
    MenuModule, 
    AngularMultiSelectModule,
    ReportModule,
    HomeModule
  ],
  providers: [
    DateFormatterService,
    RestApiService,
    FormValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
