import { HttpParams } from '@angular/common/http';
import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { GameApi } from '../../shared/game-api.constant';
import { GameSearch } from '../../shared/game-search.model';
import { Game } from '../../shared/game.model';

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnChanges {
  @Input() searchObject: GameSearch;

  gameList: Game[] = [];
  pageSize: number = 50;

  constructor(private api: RestApiService, private router: Router) { }

  ngOnInit(): void {
    var params = new HttpParams();
    params = params.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: this.gameList.length / this.pageSize + 1 }));
    var options = { params: params };

    this.api.get(GameApi.SEARCH_GAMES, options)
      .subscribe((games) => {
        if (games) {
          this.gameList = games['payload'];
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    var currentObject = changes.searchObject;

    if (!currentObject.firstChange) {
      this.gameList = [];

      this.searchObject = currentObject.currentValue;

      var params = new HttpParams();

      params = params.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: this.gameList.length / this.pageSize + 1 }));
      params = this.searchObject.name ? params.set('name', this.searchObject.name) : params;
      params = this.searchObject.genre ? params.set('genre', this.searchObject.genre) : params;
      params = this.searchObject.releasedBefore ? params.set('releasedBefore', this.searchObject.releasedBefore) : params;
      params = this.searchObject.releasedAfter ? params.set('releasedAfter', this.searchObject.releasedAfter) : params;
      params = this.searchObject.developerId ? params.set('developerId', this.searchObject.developerId.toString()) : params;
      params = this.searchObject.publisherId ? params.set('publisherId', this.searchObject.publisherId.toString()) : params;

      if (this.searchObject.regionIds) {
        for (let regionId of this.searchObject.regionIds)
          params = params.append("regionIds", regionId.toString());
      }

      if (this.searchObject.featureIds) {
        for (let featureId of this.searchObject.featureIds)
          params = params.append("featureIds", featureId.toString());
      }

      var options = { params: params };

      this.api.get(GameApi.SEARCH_GAMES, options)
        .subscribe((games) => {
          if (games) {
            this.gameList = games['payload'];
          }

        });
    }
  }

  handleClick() {
    this.router.navigateByUrl('/add-game')
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      var nextPage = Math.ceil(this.gameList.length / this.pageSize) + 1;
      var params = new HttpParams();

      params = params.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));

      if (this.searchObject != null) {
        params = this.searchObject.name ? params.set('name', this.searchObject.name) : params;
        params = this.searchObject.genre ? params.set('genre', this.searchObject.genre) : params;
        params = this.searchObject.releasedBefore ? params.set('releasedBefore', this.searchObject.releasedBefore) : params;
        params = this.searchObject.releasedAfter ? params.set('releasedAfter', this.searchObject.releasedAfter) : params;
        params = this.searchObject.developerId ? params.set('developerId', this.searchObject.developerId.toString()) : params;
        params = this.searchObject.publisherId ? params.set('publisherId', this.searchObject.publisherId.toString()) : params;

        if (this.searchObject.regionIds) {
          for (let regionId of this.searchObject.regionIds)
            params = params.append("regionIds", regionId.toString());
        }

        if (this.searchObject.featureIds) {
          for (let featureId of this.searchObject.featureIds)
            params = params.append("featureIds", featureId.toString());
        }
      }

      var options = { params: params };

      this.api.get(GameApi.SEARCH_GAMES, options)
        .subscribe((games) => {
          if (games && games.numberOfPages >= nextPage) {
            this.gameList = this.gameList.concat(games['payload']);
          }
        });
    }
  }
}
