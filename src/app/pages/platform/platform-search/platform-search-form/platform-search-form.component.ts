import { RestApiService } from '../../../shared/rest-api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedApi } from 'src/app/pages/shared/shared-api.constat';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'platform-search-form',
  templateUrl: './platform-search-form.component.html',
  styleUrls: ['./platform-search-form.component.scss']
})
export class PlatformSearchFormComponent implements OnInit {

  @Output() searchPlatformsEmmiter = new EventEmitter();

  dropdownList = [];
  selectedItems = [];
  settings = {};

  itemList = [];
  loading = false;
  indices: any;
  readonly bufferSize: number = 100;

  searchQuery = {
    name: "",
    startDate: "",
    endDate: "",
    developerIds: [],
    publisherIds: [],
    regionIds: []
  }

  genres = [];
  regions: any = [];
  features: any = [];
  developers: any = [];
  publishers: any = [];

  constructor(private api: RestApiService) {

  }

  ngOnInit() {

    this.selectedItems = [];

    this.settings = {
      text: "Select Items",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      autoPosition: true,
      enableSearchFilter: true,
      lazyLoading: true,
      labelKey: 'name'
    };

    this.api.get(SharedApi.GET_REGIONS).subscribe((results) => {
      this.regions = results.payload;
    })

    this.api.get(SharedApi.GET_COMPANIES).subscribe((results) => {
      this.developers = results.payload;
    })

    this.api.get(SharedApi.GET_COMPANIES).subscribe((results) => {
      this.publishers = results.payload;
    })
  }

  searchPlatforms() {
    console.log(this.searchQuery);
    this.searchPlatformsEmmiter.emit({ ...this.searchQuery });
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
  onScroll(e: any) {
    console.log(e);
  }
  onOpen(e : any) {
    console.log(this.itemList);
  }
  fetchMore(event: any) {
    if (event.end === this.itemList.length - 1) {
      this.loading = true;
      let params = new HttpParams();
      let page = this.developers.length / this.bufferSize;
      let pageSize = this.bufferSize;
      params = page ? params.set('page', String(page)) : params;
      params = pageSize ? params.set('pageSize', String(pageSize)) : params;
      let options = { params: params };
      console.log(options);
      this.api.get(SharedApi.GET_COMPANIES, options).subscribe(results => {
        this.developers.push(results.payload);
        this.loading = false;
      }, () => this.loading = false);
    }
  }
  changeData() {
    this.selectedItems = [];
  }

  cancel() {
    this.ngOnInit()
    this.searchPlatforms();
  }
}