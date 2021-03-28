import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module'

import { MenuComponent } from './menu/menu.component'
import { AppComponent } from './app.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
