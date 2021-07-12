import { PlatformApi } from '../../shared/platform-api.constant';
import { RestApiService } from '../../../shared/rest-api.service';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core'
import { Platform } from '../../shared/platform.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.scss']
})
export class PlatformListComponent implements OnChanges {
  @Input() searchQuery: any;

  public platformList: Platform[];

  constructor(private api: RestApiService) {

  }

  ngOnChanges(changes: SimpleChanges) {

    const currentSearchQuery: SimpleChange = changes.searchQuery;
    if (!currentSearchQuery.firstChange) {
      this.searchQuery = currentSearchQuery.currentValue;

      let params = new HttpParams();

      params = this.searchQuery.name ? params.set('fullName', this.searchQuery.name) : params;
      params = this.searchQuery.genre ? params.set('regionIds', this.searchQuery.regionIds) : params;
      params = this.searchQuery.startDate ? params.set('startDate', this.searchQuery.startDate) : params;
      params = this.searchQuery.endDate ? params.set('endDate', this.searchQuery.endDate) : params;
      params = this.searchQuery.developer ? params.set('developerIds', this.searchQuery.developerIds) : params;
      params = this.searchQuery.publisher ? params.set('publisherIds', this.searchQuery.publisherIds) : params;
      let options = { params : params };
      this.api.get(PlatformApi.SEARCH_PLATFORMS, options).subscribe(response => {
        this.platformList = response['payload'];
      });

    }
  }

}