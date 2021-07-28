import { HttpParams } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ReleaseApi } from '../release/shared/release-api.constant';
import { Release, ReleaseDetail } from '../release/shared/release.model';
import { ReviewApi } from '../review/shared/review-api.constant';
import { RestApiService } from '../shared/rest-api.service';
import { MultiSearchResponse } from './shared/multisearch.model';
import { SearchApi } from './shared/search-api.model';
import { WikiStat } from './shared/wikistat.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  keyword = 'objectName';
  items: MultiSearchResponse[];
  reviews: any[];
  wikiStats: WikiStat[];
  release: Release = new Release();
  map: Map<string, ReleaseDetail[]>;
  startDate = "2016-01-15";
  endDate = "2016-01-31";

  columnDefsStatuses = [
    { headerName: "Type", field: "type", sortable: true, flex: 1, cellRenderer: this.createLinkSearch.bind(this) },
    { headerName: "Amount", field: "amount", initialSort: 'desc', sortable: true, flex: 2 },
  ]

  columnDefsReviews = [
    { headerName: "Game", field: "gameName", initialSort: 'desc', sortable: true, flex: 1 },
    { headerName: "Platform", field: "platform",  sortable: true, flex: 2 },
    { headerName: "Title", field: "title", sortable: true, flex: 3, cellRenderer: this.createLinkOverview.bind(this) },
    { headerName: "Reviewer", field: "reviewerName",  sortable: true, flex: 4 },
    { headerName: "Total Rating", field: "totalRating",  sortable: true, flex: 5 }
  ]


  createLinkSearch(params: any) {
    var span = document.createElement('span');
    span.innerHTML = `<p> ${params.value} </p> `;
    span.addEventListener('click', () => {
      
      this.router.navigateByUrl('/' + params.value.toLowerCase() + '/search');
    });
    return span;
  }
  createLinkOverview(params: any) {
    var span = document.createElement('span');
    span.innerHTML = `<p> ${params.value} </p> `;
    span.addEventListener('click', () => {
      this.router.navigateByUrl('/game/' + params.data.gameId + '/review/' + params.data.id);
    });
    return span;
  }

  constructor(private api: RestApiService, private router: Router) { };

  ngOnInit() {
    this.items = new Array;
    this.api.get(SearchApi.WIKI_STATS)
    .subscribe((wikiStats) => {
      this.wikiStats = [];
      this.wikiStats = wikiStats['payload'];
    });
    this.api.get(ReviewApi.SEARCH_REVIEWS)
    .subscribe((reviews) => {
      this.reviews = [];
      this.reviews = reviews['payload'];
    });
    let params = new HttpParams();
    params = params.append('startDate',this.startDate)
    params = params.append('endDate',this.endDate)
    params = params.append('timeSegment','week')
    params = params.append('releaseType','game');

     this.api.get(ReleaseApi.GET_RELEASES_BY_TIMETABLE, {params:params} )
     .subscribe((release) => {
     this.release = release['payload'];
     this.map = this.release.mapOfReleasesByIntervals;
   });
  }

  selectEvent(item: MultiSearchResponse) {
    console.log(item.objectType.toLowerCase() + '/' + item.objectId + '/overview');
    this.router.navigateByUrl(item.objectType.toLowerCase() + '/' + item.objectId + '/overview');
  }

  onChangeSearch(val: string) {
    if (val.length > 3) {
      var params = new HttpParams();
      params = val ? params.set('searchTerm', val) : params;
      params = params.set('pagination', '{ "entitiesPerPage": 10, "page": 1 }');
      var options = { params: params };
      this.api.get(SearchApi.BY_NAME, options)
        .subscribe((concepts) => {
          this.items = [];
          this.items = concepts['payload'];
        });
    }
  }

  onFocused(e: any) {
    // do something when input is focused
  }
}
