import { HttpParams } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { MultiSearchResponse } from './shared/multisearch.model';
import { SearchApi } from './shared/search-api.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  keyword = 'objectName';
  items :  MultiSearchResponse[];

  constructor(private api: RestApiService, private router:Router) {};

  ngOnInit(){
    this.items = new Array;
    this.items.push({objectId: 1, objectName: 'Test', objectType:'Test', imageUrl: '', numberOfReleases :0})
  }

  selectEvent(item : MultiSearchResponse) {
    console.log(item.objectType.toLowerCase()+'/'+item.objectId+'/overview');
    this.router.navigateByUrl(item.objectType.toLowerCase()+'/'+item.objectId+'/overview');
  }

  onChangeSearch(val: string) {
    if(val.length > 3) {
      var params = new HttpParams();
      params = val ? params.set('searchTerm', val) : params;
      params = params.set('pagination', '{ "entitiesPerPage": 10, "page": 1 }');
      var options = {params: params};
      this.api.get(SearchApi.BY_NAME, options)
        .subscribe((concepts) => {
          this.items = [];
          this.items = concepts['payload'];
        });
    }
  }
  
  onFocused(e){
    // do something when input is focused
  }
}
