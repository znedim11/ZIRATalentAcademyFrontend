import { Component } from '@angular/core'
import { PlatformSearchRequest } from '../shared/platform.model';

@Component({
    selector: 'platform-search',
    templateUrl: './platform-search.component.html',
    styleUrls: ['./platform-search.component.scss']
})
export class PlatformSearchComponent {
    
    searchQuery: PlatformSearchRequest;

    searchSubmitted(searchQuery){
        this.searchQuery = searchQuery;
        if(this.searchQuery.fullName == ""){
            this.searchQuery.fullName = null;
        }
    }
}