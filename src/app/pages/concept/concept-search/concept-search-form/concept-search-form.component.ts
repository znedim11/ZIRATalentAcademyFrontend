import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { ConceptApi } from '../../shared/concept-api.constant';

@Component({
  selector: 'concept-search-form',
  templateUrl: './concept-search-form.component.html',
  styleUrls: ['./concept-search-form.component.scss']
})
export class ConceptSearchFormComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();

  searchObject = {
    name: "",
    games: [],
    characters: [],
    sortBy: ""
  }

  sortSelect: String[] = [];
  gameSelect = [];
  characterSelect = [];

  constructor(private api: RestApiService) {
    this.sortSelect = [
      'Most games',
      'Last edit',
      'Alphabetical'
    ]
  }

  ngOnInit(): void {
    this.api.get(ConceptApi.GET_GAMES)
      .subscribe((games) => {
        this.gameSelect = games['payload'];
      });

    this.api.get(ConceptApi.GET_CHARACTERS)
      .subscribe((characters) => {
        this.characterSelect = characters['payload'];
      });
  }

  search(){
    console.log(this.searchObject);
    this.searchEmitter.emit({...this.searchObject});
  }
}
