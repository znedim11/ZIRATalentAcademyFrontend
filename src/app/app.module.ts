import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module'
import { RouterModule } from '@angular/router'
import { MenuComponent } from './menu/menu.component'
import { AppComponent } from './app.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component'
import { FranchiseComponent } from './franchise/franchise.component'
import { appRoutes } from './routes'
import { HomeComponent } from './home/home.component'
import { AgGridModule } from 'ag-grid-angular'
import { FranchisesListComponent } from './franchise/franchises-list/franchises-list.component'
import { FranchiseFormComponent } from './franchise/franchise-form/franchise-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FranchiseService } from './franchise/shared/franchise.service'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
    FranchiseComponent,
    HomeComponent,
    FranchisesListComponent,
    FranchiseFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AgGridModule.withComponents([])
  ],
  providers: [FranchiseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
