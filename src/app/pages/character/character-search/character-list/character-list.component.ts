import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {RestApiService} from '../../../shared/rest-api.service';
import {CharacterApi} from '../../shared/character-api.constant';


@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnChanges, OnInit {
  @Input() searchQuery;

  characterList: [];
  params;

  constructor(private api: RestApiService, private router:Router){}

  ngOnInit() {
    this.api.get(CharacterApi.SEARCH_CHARACTERS).subscribe(data => {
      this.characterList = data.payload;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentSearchQuery: SimpleChange = changes.searchQuery;
    if(!currentSearchQuery.firstChange){

      let searchQuery = currentSearchQuery.currentValue;

      this.params = new HttpParams();

      this.params = searchQuery.name ? this.params.set('name', searchQuery.name) : this.params;
      this.params = searchQuery.gender ? this.params.set('gender', searchQuery.gender) : this.params;
      this.params = searchQuery.dob ? this.params.set('dob', searchQuery.dob) : this.params;
      this.params = searchQuery.dobCondition ? this.params.set('dobCondition', searchQuery.dobCondition) : this.params;
      this.params = searchQuery.sortBy ? this.params.set('sortBy', searchQuery.sortBy) : this.params;

      let options = { params : this.params };

      this.api.get(CharacterApi.SEARCH_CHARACTERS, options).subscribe(data => {
        this.characterList = data.payload;
      });

    }
  }

  newCharacter(){
    this.router.navigateByUrl('/add-character')
  }
}