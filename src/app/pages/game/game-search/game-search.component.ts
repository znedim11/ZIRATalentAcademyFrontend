import { Component } from '@angular/core';

@Component({
  selector: 'game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss']
})
export class GameSearchComponent {
  searchObject;

  submit(searchObject) {
    this.searchObject = searchObject;

    if (this.searchObject.name === '')
      this.searchObject.name = null;
    if (this.searchObject.genre === '')
      this.searchObject.genre = null;
    if (this.searchObject.regions && this.searchObject.regions.length <= 0)
      this.searchObject.regions = null;
    if (this.searchObject.features && this.searchObject.features.length <= 0)
      this.searchObject.features = null;
  }
}
