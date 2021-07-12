import { Component } from '@angular/core'

@Component({
    selector: 'platform-search',
    templateUrl: './platform-search.component.html',
    styleUrls: ['./platform-search.component.scss']
})
export class PlatformSearchComponent {
    
    searchQuery;

    searchSubmitted(searchQuery){
        this.searchQuery = searchQuery;
        if(this.searchQuery.name == ""){
            this.searchQuery.name = null;
        }
        if(this.searchQuery.genre == "" || this.searchQuery.genre == "any"){
            this.searchQuery.genre = null;
        }
        if(this.searchQuery.startDate == ""){
            this.searchQuery.startDate = null;
        }
        if(this.searchQuery.endDate == ""){
            this.searchQuery.endDate = null;
        }
        if(this.searchQuery.developer == "" || this.searchQuery.developer == "any"){
            this.searchQuery.developer = null;
        }
        if(this.searchQuery.publisher == "" || this.searchQuery.publisher == "any"){
            this.searchQuery.publisher = null;
        }
        if(this.searchQuery.region != null && this.searchQuery.region.length == 0){
            this.searchQuery.region = null;
        }
        if(this.searchQuery.features != null && this.searchQuery.features.length == 0){
            this.searchQuery.features = null;
        }
    }
}