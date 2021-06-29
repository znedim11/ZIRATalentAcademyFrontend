import {Component} from '@angular/core';
import { CharacterSearchFormComponent } from './character-search-form/character-search-form.component';

@Component({
  selector: 'character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.scss']
})
export class CharacterSearchComponent {
  searchQuery;

  searchSubmitted(searchQuery){
    this.searchQuery = searchQuery;
    if(this.searchQuery.name == ""){
      this.searchQuery.name = null;
    }
    if(this.searchQuery.gender == "" || this.searchQuery.gender == "any"){
      this.searchQuery.gender = null;
    }
    if(this.searchQuery.dobCondition == "" || this.searchQuery.dobCondition == "any"){
      this.searchQuery.dobCondition = null;
    }
    if(this.searchQuery.dob == ""){
      this.searchQuery.dob = null;
    }
    if(this.searchQuery.sortBy == "" || this.searchQuery.sortBy == "any"){
      this.searchQuery.sortBy = null;
    }
  }
}