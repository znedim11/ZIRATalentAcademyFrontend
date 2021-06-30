import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { ConceptApi } from '../../shared/concept-api.constant';
import { Concept } from '../../shared/concept.model';

@Component({
  selector: 'concept-list',
  templateUrl: './concept-list.component.html',
  styleUrls: ['./concept-list.component.scss']
})
export class ConceptListComponent implements OnInit, OnChanges {
  @Input() searchObject;

  conceptList: Concept[] = [];

  constructor(private api: RestApiService) { }
  
  ngOnInit(): void {
    this.api.get(ConceptApi.SEARCH_CONCEPTS)
      .subscribe((concepts) => {
        this.conceptList = concepts['payload'];
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    var currentObject = changes.searchObject;

    if (!currentObject.firstChange) {
      var searchObject = currentObject.currentValue;

      var params = new HttpParams();
      params = searchObject.name ? params.set('name', searchObject.name) : params;
      params = searchObject.sortBy ? params.set('sortBy', searchObject.sortBy) : params;

      if (searchObject.games) {
        for (let i = 0; i < searchObject.games.length; i++) {
          params = params.append("gameIds", searchObject.games[i]);
        }
      }

      if (searchObject.characters) {
        for (let i = 0; i < searchObject.characters.length; i++) {
          params = params.append("characterIds", searchObject.characters[i]);
          
        }
      }

      var options = {params: params};
      this.api.get(ConceptApi.SEARCH_CONCEPTS, options)
        .subscribe((concepts) => {
          this.conceptList = concepts['payload'];
        });
    }
  }
}