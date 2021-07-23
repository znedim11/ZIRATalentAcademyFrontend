import { HttpParams } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObjectType } from '../../shared/object-type.constant';
import { RestApiService } from '../../shared/rest-api.service';
import { LinkMapApi } from '../shared/link-map-api.constant';
import { LinkMapCreate } from '../shared/link-map-create.model';

interface SelectItem {
  item_id: number;
  item_text: string;
}

class MultiSelectHelper {
  dropdownList: SelectItem[];
  selectedItems: SelectItem[];

  constructor() {
    this.dropdownList = [];
    this.selectedItems = [];
  };
}

@Component({
  selector: 'link-map-add-form',
  templateUrl: './link-map-add-form.component.html',
  styleUrls: ['./link-map-add-form.component.scss']
})
export class LinkMapAddFormComponent implements OnInit {
  objectAName: string;

  linkMap: LinkMapCreate;

  gamesLoading: boolean = false;
  pageSize: number = 100;

  showSelect = new Map<ObjectType, boolean>([
    [ObjectType.CHARACTER, true],
    [ObjectType.CONCEPT, true],
    [ObjectType.GAME, true],
    [ObjectType.LOCATION, true],
    [ObjectType.OBJECT, true],
    [ObjectType.PERSON, true]
  ])

  dropdownSettings = {};

  character: MultiSelectHelper = new MultiSelectHelper();
  concept: MultiSelectHelper = new MultiSelectHelper();
  game: MultiSelectHelper = new MultiSelectHelper();
  location: MultiSelectHelper = new MultiSelectHelper();
  object: MultiSelectHelper = new MultiSelectHelper();
  person: MultiSelectHelper = new MultiSelectHelper();

  constructor(private api: RestApiService, private router: Router, private toastr: ToastrService, private dialogRef: MatDialogRef<LinkMapAddFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.linkMap = new LinkMapCreate();

    this.linkMap.objectAId = this.data.objectAId;//+this.route.snapshot.paramMap.get('id');
    this.linkMap.objectAType = this.data.objectAType;//this.route.snapshot.paramMap.get('type');
    this.objectAName = this.data.objectAName;

    var params = new HttpParams();
    params = params.set('id', this.linkMap.objectAId.toString());
    params = params.set('type', this.linkMap.objectAType.toString());
    var options = { params: params };

    this.api.get(LinkMapApi.GET_CHARACTERS, options).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.character.dropdownList = helperList;
        this.character.selectedItems = [];
      }
    })

    this.api.get(LinkMapApi.GET_CONCEPTS, options).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.concept.dropdownList = helperList;
        this.concept.selectedItems = [];
      }
    })

    var gameParams = new HttpParams();
    gameParams = gameParams.set('id', this.linkMap.objectAId.toString())
      .set('type', this.linkMap.objectAType.toString())
      .set('pagination', JSON.stringify({entitesPerPage: this.pageSize, page: this.game.dropdownList.length / 2 + 1}));
    var gameOptions = { params: gameParams };

    console.log(encodeURIComponent(gameParams.get('pagination')));
    this.api.get(LinkMapApi.GET_GAMES, gameOptions).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        console.log(payload);
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.game.dropdownList = helperList;
        this.game.selectedItems = [];
      }
    })

    this.api.get(LinkMapApi.GET_LOCATIONS, options).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.location.dropdownList = helperList;
        this.location.selectedItems = [];
      }
    })

    this.api.get(LinkMapApi.GET_OBJECTS, options).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.object.dropdownList = helperList;
        this.object.selectedItems = [];
      }
    })

    this.api.get(LinkMapApi.GET_PERSONS, options).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.person.dropdownList = helperList;
        this.person.selectedItems = [];
      }
    })

    this.showSelect.set(this.linkMap.objectAType, false);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      maxHeight: 50,
      lazyLoading: true
    };
  }

  save() {
    if (this.character.selectedItems != null && this.character.selectedItems.length > 0)
      for (var item of this.character.selectedItems) {
        this.linkMap.objectBMap[`${item.item_id}#${ObjectType.CHARACTER}`] = item.item_id;
      }

    if (this.concept.selectedItems != null && this.concept.selectedItems.length > 0)
      for (var item of this.concept.selectedItems) {
        this.linkMap.objectBMap[`${item.item_id}#${ObjectType.CONCEPT}`] = item.item_id;
      }

    if (this.game.selectedItems != null && this.game.selectedItems.length > 0)
      for (var item of this.game.selectedItems) {
        this.linkMap.objectBMap[`${item.item_id}#${ObjectType.GAME}`] = item.item_id;
      }

    if (this.location.selectedItems != null && this.location.selectedItems.length > 0)
      for (var item of this.location.selectedItems) {
        this.linkMap.objectBMap[`${item.item_id}#${ObjectType.LOCATION}`] = item.item_id;
      }

    if (this.object.selectedItems != null && this.object.selectedItems.length > 0)
      for (var item of this.object.selectedItems) {
        this.linkMap.objectBMap[`${item.item_id}#${ObjectType.OBJECT}`] = item.item_id;
      }

    if (this.person.selectedItems != null && this.person.selectedItems.length > 0)
      for (var item of this.person.selectedItems) {
        this.linkMap.objectBMap[`${item.item_id}#${ObjectType.PERSON}`] = item.item_id;
      }

    this.api.post(LinkMapApi.CREATE_MULTIPLE_LINK, this.linkMap).subscribe((response) => {
      if (response && response['payload']) {
        this.closeModal();
        this.toastr.success("LinkMap created!");
        this.router.navigateByUrl(`/${this.linkMap.objectAType}/${this.linkMap.objectAId}/overview`);
      }
    })

  }

  clear() {
    this.ngOnInit();
  }

  closeModal() {
    this.dialogRef.close();
  }

  fetchMore(event: any) {
    if (event.end === this.game.dropdownList.length - 1) {
      this.gamesLoading = true;

      var gameParams = new HttpParams();
      gameParams = gameParams.set('id', this.linkMap.objectAId.toString())
        .set('type', this.linkMap.objectAType.toString())
        .set('pagination', `{'entitiesPerPage': ${this.pageSize}, 'page': ${this.game.dropdownList.length / 2 + 1} }`);
      var gameOptions = { params: gameParams };

      this.api.get(LinkMapApi.GET_GAMES, gameOptions).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          console.log(payload);
          if (payload != null && payload.length > 0)
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
          this.game.dropdownList = this.game.dropdownList.concat(helperList);
          this.game.selectedItems = [];
        }

        this.gamesLoading = false;
      }, () => this.gamesLoading = false);
    }
  }
}
