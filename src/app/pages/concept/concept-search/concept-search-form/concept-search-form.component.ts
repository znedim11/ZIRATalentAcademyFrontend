import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { SharedApi } from 'src/app/pages/shared/shared-api.constat';

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

  sortSelect: string[] = [];
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
    this.api.get(SharedApi.GET_GAMES)
      .subscribe((games) => {
        this.gameSelect = games['payload'];
      });

    this.api.get(SharedApi.GET_CHARACTERS)
      .subscribe((characters) => {
        this.characterSelect = characters['payload'];
      });
  }

  search() {
    this.searchEmitter.emit({ ...this.searchObject });
  }

  cancel() {
    this.ngOnInit()
    this.search();
  }
}
