import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MultiselectHelper } from '../../shared/multiselect-helper.model';
import { ObjectType } from '../../shared/object-type.constant';
import { RestApiService } from '../../shared/rest-api.service';
import { SelectItem } from '../../shared/select-item.model';
import { SharedApi } from '../../shared/shared-api.constat';
import { ReleaseApi } from '../shared/release-api.constant';
import { ReleaseCreate } from '../shared/release-create.model';

@Component({
  selector: 'release-add-form',
  templateUrl: './release-add-form.component.html',
  styleUrls: ['./release-add-form.component.scss']
})
export class ReleaseAddFormComponent implements OnInit {
  objectAName: string;
  filter: string;

  release: ReleaseCreate;

  pageSize: number = 2000;

  filterDev: string = "";
  filterPub: string = "";
  filterGame: string = "";
  filterPlatform: string = "";

  settings = new Map<ObjectType, {}>([
    [ObjectType.PLATFORM, {
      text: "Select platform",
      singleSelection: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false,
      enableSearchFilter: true,
      lazyLoading: true,
    }],
    [ObjectType.GAME, {
      text: "Select game",
      singleSelection: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false,
      enableSearchFilter: true,
      lazyLoading: true,
    }],
    [ObjectType.REGION, {
      text: "Select region",
      singleSelection: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false,
      enableSearchFilter: true,
      lazyLoading: true,
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
    }]
  ])

  showSelect = new Map<ObjectType, boolean>([
    [ObjectType.PLATFORM, true],
    [ObjectType.GAME, true],
  ])

  platform: MultiselectHelper = new MultiselectHelper();
  game: MultiselectHelper = new MultiselectHelper();
  region: MultiselectHelper = new MultiselectHelper();
  developer: MultiselectHelper = new MultiselectHelper();
  publisher: MultiselectHelper = new MultiselectHelper();

  companySelectList: SelectItem[] = [];

  constructor(
    private api: RestApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ReleaseAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.release = new ReleaseCreate();

    console.log(this.data);
    this.release.type = this.data.objectType;

    if (this.release.type == ObjectType.PLATFORM.toUpperCase()) {
      this.showSelect.set(ObjectType.GAME, false);
      this.showSelect.set(ObjectType.PLATFORM, false);

      this.release.platformId = this.data.objectId;
    }

    if (this.release.type == ObjectType.GAME.toUpperCase()) {
      this.showSelect.set(ObjectType.GAME, false);

      this.release.gameId = +this.data.objectId;
    }

console.log(this.release);
    if (this.showSelect.get(ObjectType.PLATFORM)) {
      let nextPage = (this.platform.dropdownList.length / this.pageSize) + 1;
      let params = new HttpParams();
      params = params
        .set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
      let options = { params: params };

      this.api.get(SharedApi.GET_PLATFORMS, options).subscribe((response) => {
        if (response) {
          let helperList: SelectItem[] = [];
          let payload = response['payload'];
          if (payload != null && payload.length > 0) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.platform.dropdownList = this.platform.dropdownList.concat(helperList);
        }
      });
      this.platform.selectedItems = [];
    }

    if (this.showSelect.get(ObjectType.GAME)) {
      let nextPage = (this.platform.dropdownList.length / this.pageSize) + 1;
      let params = new HttpParams();
      params = params
        .set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
      let options = { params: params };

      this.api.get(SharedApi.GET_GAMES, options).subscribe((response) => {
        if (response) {
          let helperList: SelectItem[] = [];
          let payload = response['payload'];
          if (payload != null && payload.length > 0) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.game.dropdownList = this.game.dropdownList.concat(helperList);
        }
      });
      this.game.selectedItems = [];
    }


    {
      let nextPage = (this.companySelectList.length / this.pageSize) + 1;
      let params = new HttpParams();
      params = params.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
      let options = { params: params };

      this.api.get(SharedApi.GET_COMPANIES, options)
        .subscribe((response) => {
          if (response) {
            let helperList: SelectItem[] = [];
            let payload = response['payload'];
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
    }

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
  }


  save() {
    if (
      (this.region.selectedItems == null || this.region.selectedItems.length == 0) || this.release.releaseDate == null) {
      this.toastr.error("Region and date are mandatory!");
      return;
    }

    if(this.release.type == ObjectType.GAME.toUpperCase()){
      this.release.platformId = this.platform.selectedItems.length != 0 ? this.platform.selectedItems[0].item_id : null;
    }

    this.release.regionId = this.region.selectedItems[0].item_id;
 
    this.release.developerId = this.developer.selectedItems.length != 0 ? this.developer.selectedItems[0].item_id : null;
    this.release.publisherId = this.publisher.selectedItems.length != 0 ? this.publisher.selectedItems[0].item_id : null;

    console.log(this.release);
    console.log(this.release.platformId);
    this.api.post(ReleaseApi.ADD_RELEASE, this.release).subscribe((response) => {
      if (response && response['payload']) {
        this.closeModal();
        this.toastr.success("Release created!");
        if (this.release.type == ObjectType.PLATFORM.toUpperCase())
          this.router.navigateByUrl(`/${ObjectType.PLATFORM}/${this.release.platformId}/overview`);
        else
          this.router.navigateByUrl(`/${ObjectType.GAME}/${this.release.gameId}/overview`);
      }
    })
  }

  clear() {
    this.ngOnInit();
  }

  closeModal() {
    this.dialogRef.close();
  }

  fetchMoreCompanies(event: any) {
    if (event.endIndex > 0 && event.endIndex === this.companySelectList.length - 1) {
      let nextPage = (this.companySelectList.length / this.pageSize) + 1;
      var companyParams = new HttpParams();
      companyParams = companyParams.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
      var companyOptions = { params: companyParams };

      this.api.get(SharedApi.GET_COMPANIES, companyOptions).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];

          if (payload != null && payload.length > 0 && payload[payload.length - 1].name != this.companySelectList[this.companySelectList.length - 1].item_text) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.companySelectList = this.companySelectList.concat(helperList);
          this.developer.dropdownList = this.developer.dropdownList.concat(helperList);
          this.publisher.dropdownList = this.publisher.dropdownList.concat(helperList);
        }
      });
    }
  }

  fetchMoreGames(event: any) {
    if (event.endIndex > 0 && event.endIndex === this.game.dropdownList.length - 1) {
      let nextPage = (this.game.dropdownList.length / this.pageSize) + 1;
      var params = new HttpParams();
      params = params.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
      var options = { params: params };

      this.api.get(SharedApi.GET_GAMES, options).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];

          if (payload != null && payload.length > 0 && (this.game.dropdownList.length == 0 || payload[payload.length - 1].name != this.game.dropdownList[this.game.dropdownList.length - 1].item_text)) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.game.dropdownList = this.game.dropdownList.concat(helperList);
        }
      });
    }
  }

  fetchMorePlatforms(event: any) {
    if (event.endIndex > 0 && event.endIndex === this.platform.dropdownList.length - 1) {
      let nextPage = (this.platform.dropdownList.length / this.pageSize) + 1;
      var params = new HttpParams();
      params = params.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
      var options = { params: params };

      this.api.get(SharedApi.GET_PLATFORMS, options).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];

          if (payload != null && payload.length > 0 && (this.platform.dropdownList.length == 0 || payload[payload.length - 1].name != this.platform.dropdownList[this.platform.dropdownList.length - 1].item_text)) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.platform.dropdownList = this.platform.dropdownList.concat(helperList);
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

  onSearchGame(event: any) {
    if (this.filterGame.length > 3) {
      var params = new HttpParams();
      params = params.set('filter', JSON.stringify([{ attribute: "fullName", filterOperation: "BEGINS_WITH", expressionValue: this.filterGame }]));
      var options = { params: params };


      this.api.get(SharedApi.GET_GAMES, options).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0)
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
          if (helperList.length == 0)
            this.toastr.warning("No data for search term!")

          this.game.dropdownList = helperList;
        }
      });
    }
    else if (this.filterGame.length == 0) {
      this.game.dropdownList = [];
    }
  }

  onSearchPlatform(event: any) {
    if (this.filterPlatform.length > 3) {
      var params = new HttpParams();
      params = params.set('filter', JSON.stringify([{ attribute: "fullName", filterOperation: "BEGINS_WITH", expressionValue: this.filterPlatform }]));
      var options = { params: params };


      this.api.get(SharedApi.GET_PLATFORMS, options).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0)
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
          if (helperList.length == 0)
            this.toastr.warning("No data for search term!")

          this.platform.dropdownList = helperList;
        }
      });
    }
    else if (this.filterPlatform.length == 0) {
      this.platform.dropdownList = [];

      let nextPage = (this.platform.dropdownList.length / this.pageSize) + 1;
      let params = new HttpParams();
      params = params
        .set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
      let options = { params: params };

      this.api.get(SharedApi.GET_PLATFORMS, options).subscribe((response) => {
        if (response) {
          let helperList: SelectItem[] = [];
          let payload = response['payload'];
          if (payload != null && payload.length > 0) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.platform.dropdownList = this.platform.dropdownList.concat(helperList);
        }
      });
      this.platform.selectedItems = [];
    }
  }
 

}
