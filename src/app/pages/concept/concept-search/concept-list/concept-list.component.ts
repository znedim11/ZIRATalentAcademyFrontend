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
        for (const gId in searchObject.games) {
          params = params.append("gameIds", gId);
        }
      }

      if (searchObject.characters) {
        for (const cId in searchObject.characters) {
          params = params.append("characterIds", cId);
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