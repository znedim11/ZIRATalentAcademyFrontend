import { RestApiService } from '../../../shared/rest-api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedApi } from 'src/app/pages/shared/shared-api.constat';

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

    this.api.get(SharedApi.GET_REGIONS).subscribe((results) => {
      this.regions = results.payload;
    })

    this.api.get(SharedApi.GET_COMAPNIES).subscribe((results) => {
      this.developers = results.payload;
    })

    this.api.get(SharedApi.GET_COMAPNIES).subscribe((results) => {
      this.publishers = results.payload;
    })
  }

  searchPlatforms() {
    console.log(this.searchQuery);
    this.searchPlatformsEmmiter.emit({ ...this.searchQuery });
  }
}