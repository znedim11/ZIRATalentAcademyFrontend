import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObjectType } from '../../shared/object-type.constant';
import { RestApiService } from '../../shared/rest-api.service';
import { SharedApi } from '../../shared/shared-api.constat';
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
  @Input() objectAName: string;

  linkMap: LinkMapCreate;

  objectTypes = [ObjectType.CHARACTER, ObjectType.CONCEPT, ObjectType.GAME, ObjectType.LOCATION, ObjectType.OBJECT, ObjectType.PERSON]

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  character: MultiSelectHelper = new MultiSelectHelper();
  concept: MultiSelectHelper = new MultiSelectHelper();
  game: MultiSelectHelper = new MultiSelectHelper();
  location: MultiSelectHelper = new MultiSelectHelper();
  object: MultiSelectHelper = new MultiSelectHelper();
  person: MultiSelectHelper = new MultiSelectHelper();

  constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.linkMap = new LinkMapCreate();

    this.linkMap.objectAId = +this.route.snapshot.paramMap.get('id');
    this.linkMap.objectAType = this.route.snapshot.paramMap.get('type');

    var params = new HttpParams();
    params = params.set('ids', this.linkMap.objectAId.toString());

    var options = { params: params };
    this.api.get(`/vigor/${this.linkMap.objectAType}/lovs`, options).subscribe((response) => {
      if (response) {
        this.objectAName = response['payload'][0]['name'];
      }
    })

    this.api.get(SharedApi.GET_CHARACTERS).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.character.dropdownList = helperList;
      }
    })

    this.api.get(SharedApi.GET_CONCEPTS).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.concept.dropdownList = helperList;
      }
    })

    /* this.api.get(SharedApi.GET_GAMES).subscribe((response) => {
      if(response){
        var helperList:SelectItem[] = [];
        var payload = response['payload'];
        helperList = payload.map(function(item) {return {item_id: item.id, item_text: item.name }});
        this.game.dropdownList = helperList;
      }
    }) */

    this.api.get(SharedApi.GET_LOCATIONS).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.location.dropdownList = helperList;
      }
    })

    this.api.get(SharedApi.GET_OBJECTS).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.object.dropdownList = helperList;
      }
    })

    this.api.get(SharedApi.GET_PERSONS).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name } });
        this.person.dropdownList = helperList;
      }
    })

    this.objectTypes.splice(this.objectTypes.indexOf(this.linkMap.objectAType, 0), 1);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
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

    console.log(this.linkMap);
    this.api.post(LinkMapApi.CREATE_MULTIPLE_LINK, this.linkMap).subscribe((response) => {
      if (response && response['payload']) {
        this.toastr.success("LinkMap created!");
        //this.router.navigateByUrl(`/${this.linkMap.objectAType}/${this.linkMap.objectAId}`);
      }
    })

  }

  clear() {
    this.ngOnInit();
  }
}
