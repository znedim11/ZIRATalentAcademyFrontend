import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'character-search-form',
  templateUrl: './character-search-form.component.html',
  styleUrls: ['./character-search-form.component.scss'],
})
export class CharacterSearchFormComponent implements OnInit {

  @Output() searchCharactersEmitter = new EventEmitter();

  searchQuery = {
    name: "",
    gender: "",
    dob: null,
    dobCondition: "",
    sortBy: ""
  };

  bornOptions;
  sortOptions;
  curDate = new Date();

  constructor(){    
    this.bornOptions = [
      "Before",
      "Equal",
      "After"
    ];

    this.sortOptions = [
      "Most appearances",
      "Last edit",
      "Alphabetical order"
    ];
  }

  ngOnInit() {
  }

  searchCharacters() {
    this.searchCharactersEmitter.emit({...this.searchQuery});
  }
}
