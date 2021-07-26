import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'concept-search',
  templateUrl: './concept-search.component.html',
  styleUrls: ['./concept-search.component.scss']
})
export class ConceptSearchComponent {

  searchObject;

  submit(searchObject) {
    this.searchObject = searchObject;

    if (searchObject.name === '')
      this.searchObject.name = null;
    if (this.searchObject.sortBy === 'any')
      this.searchObject.sortBy = null;
    if (searchObject.games && (searchObject.games.length <= 0 || this.searchObject.games.indexOf('any') > -1))
      this.searchObject.games = null;
    if (searchObject.characters && (searchObject.characters.length <= 0 || this.searchObject.characters.indexOf('any') > -1))
      this.searchObject.characters = null;
  }
}
