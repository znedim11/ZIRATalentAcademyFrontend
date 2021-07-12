import { PlatformApi } from '../../shared/platform-api.constant';
import { RestApiService } from '../../../shared/rest-api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { GameApi } from 'src/app/pages/game/shared/game-api.constant';

@Component({
    selector: 'platform-search-form',
    templateUrl: './platform-search-form.component.html',
    styleUrls: ['./platform-search-form.component.scss']
})
export class PlatformSearchFormComponent implements OnInit{
    
    @Output() searchPlatformsEmmiter = new EventEmitter();

    searchQuery = {
        name: "",
        genre: "",
        startDate: "",
        endDate: "",
        region: [],
        features: [],
        developer: "",
        publisher: "",
    }

    genres = [];
    regions;
    features;
    developers;
    publishers;

    constructor(private api: RestApiService){

    }

    ngOnInit(){
        this.api.get(GameApi.GET_GENRES).subscribe( (results) => {
            for(let genre of results.payload) {
                let processedGenre = this.processGenre(genre);
                this.genres.push({enum:genre, value:processedGenre});
            }
        })

        this.api.get(GameApi.GET_REGION_NAMES).subscribe( (results) => {
            this.regions = results.payload;
        })

        this.api.get(GameApi.GET_FEATURE_NAMES).subscribe( (results) => {
            this.features = results.payload;
        })

        this.api.get(GameApi.GET_COMPANY_NAMES).subscribe( (results) => {
            this.developers = results.payload;
        })

        this.api.get(GameApi.GET_COMPANY_NAMES).subscribe( (results) => {
            this.publishers = results.payload;
        })
    }

    searchPlatforms(){
        this.searchPlatformsEmmiter.emit({...this.searchQuery});
    }

    processGenre(genre){
        let genreSplit = genre.split("_");
        let newGenreSplit = [];
        for(let word of genreSplit){
            word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            newGenreSplit.push(word);
        }

        return newGenreSplit.join(" ");
    }
}