import { RestApiService } from '../../../shared/rest-api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { GameApi } from 'src/app/pages/game/shared/game-api.constant';

@Component({
  selector: 'platform-search-form',
  templateUrl: './platform-search-form.component.html',
  styleUrls: ['./platform-search-form.component.scss']
})
export class PlatformSearchFormComponent implements OnInit {

  @Output() searchPlatformsEmmiter = new EventEmitter();

  searchQuery = {
    name: "",
    startDate: "",
    endDate: "",
    developerIds: [],
    publisherIds: [],
    regionIds: []
  }

  genres = [];
  regions: any;
  features: any;
  developers: any;
  publishers: any;

  constructor(private api: RestApiService) {

  }

  ngOnInit() {

    this.api.get(GameApi.GET_REGION_NAMES).subscribe((results) => {
      this.regions = results.payload;
    })

    this.api.get(GameApi.GET_COMPANY_NAMES).subscribe((results) => {
      this.developers = results.payload;
    })

    this.api.get(GameApi.GET_COMPANY_NAMES).subscribe((results) => {
      this.publishers = results.payload;
    })
  }

  searchPlatforms() {
    console.log(this.searchQuery);
    this.searchPlatformsEmmiter.emit({ ...this.searchQuery });
  }
}