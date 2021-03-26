import { Component } from '@angular/core';
import data from './../../assets/config/menu.json'

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isMenuOpened = true
  menuList = data.payload.children

  toggleSidenav() {
    if(this.isMenuOpened){
      this.isMenuOpened = false
    }else{
      this.isMenuOpened = true
    }

    console.log(this.isMenuOpened)
  }
}
