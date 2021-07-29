import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MultiselectHelper } from 'src/app/pages/shared/multiselect-helper.model';
import { ObjectType } from 'src/app/pages/shared/object-type.constant';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { SelectItem } from 'src/app/pages/shared/select-item.model';
import { SharedApi } from 'src/app/pages/shared/shared-api.constat';
import { GameApi } from '../../shared/game-api.constant';
import { GameSearch } from '../../shared/game-search.model';

@Component({
  selector: 'game-search-form',
  templateUrl: './game-search-form.component.html',
  styleUrls: ['./game-search-form.component.scss']
})
export class GameSearchFormComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();

  searchObject: GameSearch = new GameSearch();

  filterDev: string;
  filterPub: string;

  region: MultiselectHelper = new MultiselectHelper();
  feature: MultiselectHelper = new MultiselectHelper();
  developer: MultiselectHelper = new MultiselectHelper();
  publisher: MultiselectHelper = new MultiselectHelper();
  genre: MultiselectHelper = new MultiselectHelper();

  companySelectList: SelectItem[] = [];

  settings = new Map<ObjectType, {}>([
    [ObjectType.REGION, {
      text: "Select regions",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false,
      badgeShowLimit: 1
    }],
    [ObjectType.FEATURE, {
      text: "Select features",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false,
      badgeShowLimit: 1
    }],
    [ObjectType.DEVELOPER, {
      text: "Select developer",
      singleSelection: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false,
      enableSearchFilter: true,
      lazyLoading: true,
    }],
    [ObjectType.PUBLISHER, {
      text: "Select publisher",
      singleSelection: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false,
      enableSearchFilter: true,
      lazyLoading: true,
    }],
    [ObjectType.GENRE, {
      text: "Select genre",
      singleSelection: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false,
      enableSearchFilter: true,
      lazyLoading: true,
    }]
  ])

  sortSettings = {
    text: "Select sort",
    singleSelection: true,
    maxHeight: 150,
    labelKey: 'item_text',
    primaryKey: 'item_text',
    autoPosition: false
  };

  pageSize: number = 2000;

  constructor(private api: RestApiService, private toastr: ToastrService) {
  }

  ngOnInit(): void {

    let nextPage = (this.companySelectList.length / this.pageSize) + 1;
    var companyParams = new HttpParams();
    companyParams = companyParams.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
    var companyOptions = { params: companyParams };

    this.api.get(SharedApi.GET_COMPANIES, companyOptions)
      .subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.companySelectList = helperList;
          this.developer.dropdownList = helperList;
          this.publisher.dropdownList = helperList;

          this.developer.selectedItems = [];
          this.publisher.selectedItems = [];
        }
      });

    this.api.get(SharedApi.GET_REGIONS)
      .subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.region.dropdownList = helperList;
          this.region.selectedItems = [];
        }
      });

    this.api.get(SharedApi.GET_FEATURES)
      .subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.feature.dropdownList = helperList;
          this.feature.selectedItems = [];
        }
      });

    this.api.get(GameApi.GET_GENRES)
      .subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0) {
            helperList = payload.map(function (item) { return { item_id: item, item_text: item }; });
          }

          this.genre.dropdownList = helperList;
          this.genre.selectedItems = [];
        }
      });

  }

  search() {
    console.log(this.region);
    this.searchObject.regionIds = this.region.selectedItems.map(i => i.item_id);
    this.searchObject.featureIds = this.feature.selectedItems.map(i => i.item_id);

    this.searchObject.genre = this.genre.selectedItems.length > 0 ? this.genre.selectedItems[0].item_text : null;

    this.searchObject.developerId = this.developer.selectedItems.length != 0 ? this.developer.selectedItems[0].item_id : null;
    this.searchObject.publisherId = this.publisher.selectedItems.length != 0 ? this.publisher.selectedItems[0].item_id : null;

    console.log(this.searchObject);

    this.searchEmitter.emit({ ...this.searchObject });
  }

  cancel() {
    this.ngOnInit()
    this.search();
  }

  fetchMore(event: any) {
    if (event.endIndex > 0 && event.endIndex === this.companySelectList.length - 1) {
      let nextPage = (this.companySelectList.length / this.pageSize) + 1;
      var companyParams = new HttpParams();
      companyParams = companyParams.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
      var companyOptions = { params: companyParams };

      this.api.get(SharedApi.GET_COMPANIES, companyOptions).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];

          if (payload != null && payload.length > 0 && payload[payload.length -1].name != this.companySelectList[this.companySelectList.length - 1].item_text) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.companySelectList = this.companySelectList.concat(helperList);
          this.developer.dropdownList = this.developer.dropdownList.concat(helperList);
          this.publisher.dropdownList = this.publisher.dropdownList.concat(helperList);
        }
      });
    }
  }

  onSearchDev(event: any) {
    if (this.filterDev.length > 3) {
      var companyParams = new HttpParams();
      companyParams = companyParams.set('filter', JSON.stringify([{ attribute: "name", filterOperation: "BEGINS_WITH", expressionValue: this.filterDev }]));
      var companyOptions = { params: companyParams };


      this.api.get(SharedApi.GET_COMPANIES, companyOptions).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0)
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
          if (helperList.length == 0)
            this.toastr.warning("No data for search term!")

          this.developer.dropdownList = helperList;
        }
      });
    }
    else if (this.filterDev.length == 0) {
      this.developer.dropdownList = this.companySelectList;
    }
  }
  onSearchPub(event: any) {
    if (this.filterPub.length > 3) {
      var companyParams = new HttpParams();
      companyParams = companyParams.set('filter', JSON.stringify([{ attribute: "name", filterOperation: "BEGINS_WITH", expressionValue: this.filterPub }]));
      var companyOptions = { params: companyParams };


      this.api.get(SharedApi.GET_COMPANIES, companyOptions).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0)
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
          if (helperList.length == 0)
            this.toastr.warning("No data for search term!")

          this.publisher.dropdownList = helperList;
        }
      });
    }
    else if (this.filterPub.length == 0) {
      this.publisher.dropdownList = this.companySelectList;
    }
  }
}
