import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MultiselectHelper } from '../../shared/multiselect-helper.model';
import { ObjectType } from '../../shared/object-type.constant';
import { RestApiService } from '../../shared/rest-api.service';
import { SelectItem } from '../../shared/select-item.model';
import { LinkMapApi } from '../shared/link-map-api.constant';
import { LinkMapCreate } from '../shared/link-map-create.model';

@Component({
  selector: 'link-map-add-form',
  templateUrl: './link-map-add-form.component.html',
  styleUrls: ['./link-map-add-form.component.scss']
})
export class LinkMapAddFormComponent implements OnInit {
  objectAName: string;
  filter: string;

  linkMap: LinkMapCreate;

  pageSize: number = 2000;

  settings = new Map<ObjectType, {}>([
    [ObjectType.CHARACTER, {
      text: "Characters",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false
    }],
    [ObjectType.CONCEPT, {
      text: "Concepts",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false
    }],
    [ObjectType.GAME, {
      text: "Games",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      lazyLoading: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false
    }],
    [ObjectType.LOCATION, {
      text: "Locations",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false
    }],
    [ObjectType.OBJECT, {
      text: "Objects",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false
    }],
    [ObjectType.PERSON, {
      text: "Persons",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false
    }]
  ])

  showSelect = new Map<ObjectType, boolean>([
    [ObjectType.CHARACTER, true],
    [ObjectType.CONCEPT, true],
    [ObjectType.GAME, true],
    [ObjectType.LOCATION, true],
    [ObjectType.OBJECT, true],
    [ObjectType.PERSON, true]
  ])

  character: MultiselectHelper = new MultiselectHelper();
  concept: MultiselectHelper = new MultiselectHelper();
  game: MultiselectHelper = new MultiselectHelper();
  location: MultiselectHelper = new MultiselectHelper();
  object: MultiselectHelper = new MultiselectHelper();
  person: MultiselectHelper = new MultiselectHelper();

  constructor(
    private api: RestApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<LinkMapAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.linkMap = new LinkMapCreate();

    this.linkMap.objectAId = this.data.objectAId;
    this.linkMap.objectAType = this.data.objectAType;
    this.objectAName = this.data.objectAName;

    this.showSelect.set(this.linkMap.objectAType, false);

    var params = new HttpParams();
    params = params.set('id', this.linkMap.objectAId.toString());
    params = params.set('type', this.linkMap.objectAType.toString());
    var options = { params: params };

    if (this.showSelect.get(ObjectType.CHARACTER)) {
      this.getCharacters(options);
    }

    if (this.showSelect.get(ObjectType.CONCEPT)) {
      this.getConcepts(options);
    }

    if (this.showSelect.get(ObjectType.GAME)) {
      let nextPage = (this.game.dropdownList.length / this.pageSize) + 1;

      var gameParams = new HttpParams();
      gameParams = gameParams.set('id', this.linkMap.objectAId.toString())
        .set('type', this.linkMap.objectAType.toString())
        .set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
      var gameOptions = { params: gameParams };

      this.api.get(LinkMapApi.GET_GAMES, gameOptions).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.game.dropdownList = this.game.dropdownList.concat(helperList);
        }
      });
      this.game.selectedItems = [];
    }

    if (this.showSelect.get(ObjectType.LOCATION)) {
      this.getLocations(options);
    }

    if (this.showSelect.get(ObjectType.OBJECT)) {
      this.getObjects(options);
    }

    if (this.showSelect.get(ObjectType.PERSON)) {
      this.getPersons(options);
    }
  }

  private getPersons(options: { params: HttpParams; }) {
    this.api.get(LinkMapApi.GET_PERSONS, options).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
        this.person.dropdownList = helperList;
        this.person.selectedItems = [];
      }
    });
  }

  private getObjects(options: { params: HttpParams; }) {
    this.api.get(LinkMapApi.GET_OBJECTS, options).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
        this.object.dropdownList = helperList;
        this.object.selectedItems = [];
      }
    });
  }

  private getLocations(options: { params: HttpParams; }) {
    this.api.get(LinkMapApi.GET_LOCATIONS, options).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
        this.location.dropdownList = helperList;
        this.location.selectedItems = [];
      }
    });
  }

  private getConcepts(options: { params: HttpParams; }) {
    this.api.get(LinkMapApi.GET_CONCEPTS, options).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
        this.concept.dropdownList = helperList;
        this.concept.selectedItems = [];
      }
    });
  }

  private getCharacters(options: { params: HttpParams; }) {
    this.api.get(LinkMapApi.GET_CHARACTERS, options).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0)
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
        this.character.dropdownList = helperList;
        this.character.selectedItems = [];
      }
    });
  }

  save() {
    if ((this.character.selectedItems == null || this.character.selectedItems.length == 0) &&
      (this.concept.selectedItems == null || this.concept.selectedItems.length == 0) &&
      (this.game.selectedItems == null || this.game.selectedItems.length == 0) &&
      (this.location.selectedItems == null || this.location.selectedItems.length == 0) &&
      (this.object.selectedItems == null || this.object.selectedItems.length == 0) &&
      (this.person.selectedItems == null || this.person.selectedItems.length == 0)) {
      this.toastr.error("Can not link to nothing! Select at least one item!");
      return;
    }

    if (this.character.selectedItems != null && this.character.selectedItems.length > 0)
      for (var characterItem of this.character.selectedItems) {
        this.linkMap.objectBMap[`${characterItem.item_id}#${ObjectType.CHARACTER}`] = characterItem.item_id;
      }

    if (this.concept.selectedItems != null && this.concept.selectedItems.length > 0)
      for (var conceptItem of this.concept.selectedItems) {
        this.linkMap.objectBMap[`${conceptItem.item_id}#${ObjectType.CONCEPT}`] = conceptItem.item_id;
      }

    if (this.game.selectedItems != null && this.game.selectedItems.length > 0)
      for (var gameItem of this.game.selectedItems) {
        this.linkMap.objectBMap[`${gameItem.item_id}#${ObjectType.GAME}`] = gameItem.item_id;
      }

    if (this.location.selectedItems != null && this.location.selectedItems.length > 0)
      for (var locationItem of this.location.selectedItems) {
        this.linkMap.objectBMap[`${locationItem.item_id}#${ObjectType.LOCATION}`] = locationItem.item_id;
      }

    if (this.object.selectedItems != null && this.object.selectedItems.length > 0)
      for (var objectItem of this.object.selectedItems) {
        this.linkMap.objectBMap[`${objectItem.item_id}#${ObjectType.OBJECT}`] = objectItem.item_id;
      }

    if (this.person.selectedItems != null && this.person.selectedItems.length > 0)
      for (var persontem of this.person.selectedItems) {
        this.linkMap.objectBMap[`${persontem.item_id}#${ObjectType.PERSON}`] = persontem.item_id;
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
    if (this.showSelect.get(ObjectType.GAME)) {
      if (event.endIndex > 0 && event.endIndex === this.game.dropdownList.length - 1) {
        let nextPage = (this.game.dropdownList.length / this.pageSize) + 1;

    var gameParams = new HttpParams();
    gameParams = gameParams.set('id', this.linkMap.objectAId.toString())
      .set('type', this.linkMap.objectAType.toString())
      .set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
    var gameOptions = { params: gameParams };

    this.api.get(LinkMapApi.GET_GAMES, gameOptions).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0 && payload[payload.length -1].name != this.game.dropdownList[this.game.dropdownList.length - 1].item_text) {
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
        }
        this.game.dropdownList = this.game.dropdownList.concat(helperList);
      }
    });
      }
    }
  }

  onSearch(event: any) {
    if (this.filter.length > 3) {
      var gameParams = new HttpParams();
      gameParams = gameParams.set('id', this.linkMap.objectAId.toString())
        .set('type', this.linkMap.objectAType.toString())
        .set('filter', JSON.stringify([{ attribute: "fullName", filterOperation: "BEGINS_WITH", expressionValue: this.filter }]));
      var gameOptions = { params: gameParams };


      this.api.get(LinkMapApi.GET_GAMES, gameOptions).subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0)
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
          if (helperList.length == 0)
            this.toastr.warning("No data for search term!")

          this.game.dropdownList = helperList;
          this.game.selectedItems = [];
        }
      });
    }
    else if (this.filter.length == 0) {
      this.game.dropdownList = [];
    }
  }
}
