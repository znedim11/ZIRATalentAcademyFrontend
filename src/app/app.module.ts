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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
    FranchiseComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
