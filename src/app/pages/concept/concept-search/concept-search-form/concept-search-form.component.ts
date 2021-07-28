import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MultiselectHelper } from 'src/app/pages/shared/multiselect-helper.model';
import { ObjectType } from 'src/app/pages/shared/object-type.constant';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { SelectItem } from 'src/app/pages/shared/select-item.model';
import { SharedApi } from 'src/app/pages/shared/shared-api.constat';

@Component({
  selector: 'concept-search-form',
  templateUrl: './concept-search-form.component.html',
  styleUrls: ['./concept-search-form.component.scss']
})
export class ConceptSearchFormComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();

  searchObject = {
    name: "",
    games: [],
    characters: [],
    sortBy: ""
  }

  filter: string;

  character: MultiselectHelper = new MultiselectHelper();
  game: MultiselectHelper = new MultiselectHelper();
  sort: MultiselectHelper = new MultiselectHelper();

  settings = new Map<ObjectType, {}>([
    [ObjectType.CHARACTER, {
      text: "Select characters",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false,
      badgeShowLimit: 1
    }],
    [ObjectType.GAME, {
      text: "Select games",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      lazyLoading: true,
      maxHeight: 150,
      labelKey: 'item_text',
      primaryKey: 'item_id',
      autoPosition: false,
      badgeShowLimit: 1
    }],
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
    this.sort.dropdownList.push({ item_id: 1, item_text: "Most games" }, { item_id: 1, item_text: "Last edit" }, { item_id: 1, item_text: "Alphabetical" });
    this.sort.selectedItems = [];

    this.character.dropdownList = [];
    this.character.selectedItems = [];
    this.game.dropdownList = [];
    this.game.selectedItems = [];

    let nextPage = (this.game.dropdownList.length / this.pageSize) + 1;
    var gameParams = new HttpParams();
    gameParams = gameParams.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
    var gameOptions = { params: gameParams };

    this.api.get(SharedApi.GET_GAMES, gameOptions).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        var payload = response['payload'];
        if (payload != null && payload.length > 0) {
          helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
        }
        this.game.dropdownList = helperList;
      }
    });

    this.api.get(SharedApi.GET_CHARACTERS)
      .subscribe((response) => {
        if (response) {
          var helperList: SelectItem[] = [];
          var payload = response['payload'];
          if (payload != null && payload.length > 0) {
            helperList = payload.map(function (item) { return { item_id: item.id, item_text: item.name }; });
          }
          this.character.dropdownList = this.character.dropdownList.concat(helperList);
        }
      });
  }

  search() {
    this.searchObject.games = this.game.selectedItems.map(i => i.item_id);
    this.searchObject.characters = this.character.selectedItems.map(i => i.item_id);

    this.searchObject.sortBy = this.sort.selectedItems.length != 0 ? this.sort.selectedItems[0].item_text : null;

    this.searchEmitter.emit({ ...this.searchObject });
  }

  cancel() {
    this.ngOnInit()
    this.search();
  }

  fetchMore(event: any) {
    if (event.endIndex > 0 && event.endIndex === this.game.dropdownList.length - 1) {
      let nextPage = (this.game.dropdownList.length / this.pageSize) + 1;
      var gameParams = new HttpParams();
      gameParams = gameParams.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
      var gameOptions = { params: gameParams };

      this.api.get(SharedApi.GET_GAMES, gameOptions).subscribe((response) => {
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

  onSearch(event: any) {
    if (this.filter.length > 3) {
      var gameParams = new HttpParams();
      gameParams = gameParams.set('filter', JSON.stringify([{ attribute: "fullName", filterOperation: "BEGINS_WITH", expressionValue: this.filter }]));
      var gameOptions = { params: gameParams };


      this.api.get(SharedApi.GET_GAMES, gameOptions).subscribe((response) => {
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
