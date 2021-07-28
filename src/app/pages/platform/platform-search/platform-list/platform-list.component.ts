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
      let searchQuery = currentSearchQuery.currentValue;

      let params = new HttpParams();

      params = searchQuery.name ? params.set('fullName', searchQuery.name) : params;
      params = searchQuery.genre ? params.set('regionIds', searchQuery.regionIds) : params;
      params = searchQuery.startDate ? params.set('startDate', searchQuery.startDate) : params;
      params = searchQuery.endDate ? params.set('endDate', searchQuery.endDate) : params;
      params = searchQuery.developer ? params.set('developerIds', searchQuery.developerIds) : params;
      params = searchQuery.publisher ? params.set('publisherIds', searchQuery.publisherIds) : params;
      let options = { params : params };
      console.log(searchQuery);
      this.api.get(PlatformApi.SEARCH_PLATFORMS, options).subscribe(response => {
        this.platformList = response['payload'];
      });

    }
  }

}