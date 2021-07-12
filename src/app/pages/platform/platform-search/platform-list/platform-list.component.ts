import { PlatformApi } from '../../shared/platform-api.constant';
import { RestApiService } from '../../../shared/rest-api.service';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core'

@Component({
    selector: 'platform-list',
    templateUrl: './platform-list.component.html',
    styleUrls: ['./platform-list.component.scss']
})
export class PlatformListComponent implements OnChanges{
    @Input() searchQuery;

    platformList;

    constructor(private api: RestApiService){

    }

    ngOnChanges(changes: SimpleChanges) {
        const currentSearchQuery: SimpleChange = changes.searchQuery;
        if(!currentSearchQuery.firstChange){

            let searchQuery = currentSearchQuery.currentValue;

            let params = new HttpParams();

            params = searchQuery.name ? params.set('name', searchQuery.name) : params;
            params = searchQuery.genre ? params.set('genre', searchQuery.genre) : params; 
            params = searchQuery.startDate ? params.set('releasedAfter', searchQuery.startDate) : params;
            params = searchQuery.endDate ? params.set('releasedBefore', searchQuery.endDate) : params;
            params = searchQuery.developer ? params.set('developerId', searchQuery.developer) : params;
            params = searchQuery.publisher ? params.set('publisherId', searchQuery.publisher) : params;
            

            if(searchQuery.region){
                for(let r of searchQuery.region){
                    params = params.append("regionIds",r);
                }
            }

            if(searchQuery.features){
                for(let f of searchQuery.features){
                    params = params.append("featureIds",f);
                }
            }

            let options = { params : params };

            this.api.get(PlatformApi.SEARCH_PLATFORMS, options).subscribe( (result) => {
                this.platformList = result.payload;
            });
        }
      }
}