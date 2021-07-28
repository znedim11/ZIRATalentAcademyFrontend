import { NgModule } from '@angular/core';

import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component'
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MenuComponent,
    MenuItemComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MenuComponent,
    MenuItemComponent
  ]

})

export class MenuModule { }