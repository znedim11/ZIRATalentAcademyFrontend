import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ValueCache } from 'ag-grid-community';
import { ConceptApi } from '../concept/shared/concept-api.constant';
import { PlatformApi } from '../platform/shared/platform-api.constant';
import { RestApiService } from '../shared/rest-api.service';
import { SharedApi } from '../shared/shared-api.constat';
import { ReviewApi } from './shared/review-api.constant';
import { ReviewFilter } from './shared/review-filter';
import { ReviewType } from './shared/review-type.enum';

@Component({
  selector: 'app-reviews',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();
  gameResponse = [];
  platformResponse = [];
  reviewerResponse = [];
  reviewResponse = [];
  statsResponse;
  params = new Object();
  reviewsFilter: ReviewFilter;

  constructor(private router: Router, private api: RestApiService) {
    this.reviewsFilter = new ReviewFilter();
    if (this.router.url.endsWith('reviews/external')) {
      this.reviewsFilter.type = ReviewType.EXTERNAL;
    }
    else if (this.router.url.endsWith('reviews/internal')) {
      this.reviewsFilter.type = ReviewType.INTERNAL;
    }
    else {
      this.reviewsFilter.type = ReviewType.BOTH;
    }

    this.ngOnInit();
  }

  ngOnInit(): void {
    this.params = new Object();
    this.setParameters(this.reviewsFilter);
    const esc = encodeURIComponent;
    const query = Object.keys(this.params).map(k => esc(k) + '=' + esc(this.params[k])).join('&');
    this.api.get(ReviewApi.SEARCH_REVIEWS + "?" +query )
      .subscribe((reviews) => {
        this.reviewResponse = reviews['payload'];
      });
    this.api.get(ReviewApi.GET_STATS + "?" +query)
      .subscribe((stats) => {
        this.statsResponse = stats['payload'];
        this.statsResponse.averageGrade=this.statsResponse.averageGrade.toFixed(2);
      });

    this.api.get(SharedApi.GET_GAMES)
      .subscribe((game) => {
        this.gameResponse = game['payload'];
      });
    this.api.get(SharedApi.GET_PLATFORMS)
      .subscribe((platform) => {
        this.platformResponse = platform['payload'];
      });
    this.api.get(ReviewApi.GET_REVIEWERS)
      .subscribe((reviewer) => {
        this.reviewerResponse = reviewer['payload'];
      });
  }

  onSubmit(){
    this.ngOnInit();
  }

  onReset(){
    this.reviewsFilter.gameId=null;
    this.reviewsFilter.platformId=null;
    this.reviewsFilter.reviewerId=null;
    this.reviewsFilter.highestRating=null;
    this.reviewsFilter.lowestRating=null;
    this.ngOnInit();
  }

  setParameters(data) {
    if (data.gameId) {
      this.params['gameId'] = data.gameId;
    }

    if (data.platformId) {
      this.params['platformId'] = data.platformId;
    }

    if (data.reviewerId) {
      this.params['reviewerId'] = data.reviewerId;
    }

    if (data.lowestRating) {
      this.params['lowestRating'] = data.lowestRating;
    }

    if (data.highestRating) {
      this.params['highestRating'] = data.highestRating;
    }

    this.params['type'] = data.type;
  }

  openReview(gameId, id)
  {
    if (gameId && id) {
      this.router.navigateByUrl('/game/'+gameId+'/review/'+id);
    }
  }
}

