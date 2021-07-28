import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RestApiService} from '../../shared/rest-api.service';
import {CharacterApi} from '../shared/character-api.constant';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Character } from '../shared/character.model';
import { Concept } from '../../concept/shared/concept.model';
import { Object } from '../../object/shared/object.model';
import { Person } from '../../person/shared/person.model';
import { Location } from '../../location/shared/location.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ObjectType } from '../../shared/object-type.constant';
import { LinkMapAddFormComponent } from '../../link-map/link-map-add-form/link-map-add-form.component';

@Component({
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.scss']
})
export class CharacterOverviewComponent implements OnInit{

  character: Character = new Character();
  games = [];
  concepts: Concept[] = [];
  persons: Person[] = [];
  objects: Object[] = [];
  locations: Location[] = [];
  numOfGames = null;

//#region Grid Column Defs
  columnDefsGames = [
    { headerName:"Game", field:"name", flex: 1.5, initialSort: 'desc', sortable: true, cellStyle: {color: 'blue', 'text-decoration': 'underline'}, cellRenderer: this.createLink.bind(this) },
    { headerName:"Release Date", field:"releaseDate", flex: 1.5 },
    { headerName:"Platform", field:"platformCode", flex: 1 },
  ]

  columnDefsConcepts = [
    { headerName: "Concepts", field: "name", initialSort: 'desc', sortable: true, flex: 1, cellStyle: {color: 'blue', 'text-decoration': 'underline'}, cellRenderer: this.createLink.bind(this) },
    { headerName: "Outline", field: "outline", flex: 1.5 }
  ]

  columnDefsLocations = [
    { headerName: "Location", field: "name", initialSort: 'desc', sortable: true, flex: 1, cellStyle: {color: 'blue', 'text-decoration': 'underline'}, cellRenderer: this.createLink.bind(this) },
    { headerName: "Aliases", field: "aliases", flex: 1.5 }
  ]

  columnDefsObjects = [
    { headerName: "Object", field: "name", initialSort: 'desc', sortable: true, flex: 1, cellStyle: {color: 'blue', 'text-decoration': 'underline'}, cellRenderer: this.createLink.bind(this) }
  ]

  columnDefsPersons = [
    { headerName: "Person", field: "fullName", valueGetter(params) { return params.data.firstName + ' ' + params.data.lastName }, initialSort: 'desc', sortable: true, flex: 1, cellStyle: {color: 'blue', 'text-decoration': 'underline'}, cellRenderer: this.createLink.bind(this) }
  ]
  //#endregion

  constructor(
    private route: ActivatedRoute,
    private api: RestApiService,
    private router: Router,
    private toastr: ToastrService, private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.api.get(CharacterApi.GET_CHARACTER_BY_ID + id).subscribe(character => {
      if (character) {
        this.character = character["payload"];
        this.character.dob = this.character.dob ? moment(this.character.dob).format('DD.MM.YYYY') : null;
      }
    });
  
    this.api.get(CharacterApi.GET_GAMES_FOR_CHARACTER.replace('#', id.toString())).subscribe(games => {
        if(games) {
          this.games = games["payload"];
          this.games.forEach(game => {
            game.releaseDate = game.releaseDate ? moment(game.releaseDate).format('DD.MM.YYYY') : "Not released";
          }); 
        }
    });

    this.api.get(CharacterApi.GET_CONCEPTS_FOR_CHARACTER.replace('#', id.toString())).subscribe(concepts => {
      if(concepts) {
        this.concepts = concepts["payload"];
      }
    });

    this.api.get(CharacterApi.GET_PERSONS_FOR_CHARACTER.replace('#', id.toString())).subscribe(persons => {
      if(persons) {
        this.persons = persons["payload"];
      }
    });

    this.api.get(CharacterApi.GET_OBJECTS_FOR_CHARACTER.replace('#', id.toString())).subscribe(objects => {
      if(objects) {
        this.objects = objects["payload"];
      }
    });

    this.api.get(CharacterApi.GET_LOCATIONS_FOR_CHARACTER.replace('#', id.toString())).subscribe(locations => {
      if(locations) {
        this.locations = locations["payload"];
      }
    });
  }

  createLink(params) {
    var span = document.createElement('span');
    span.innerHTML = `<p> ${params.value} </p>`;
    span.addEventListener('click', () => {
        this.router.navigateByUrl('/' + params.colDef.headerName.toLowerCase() + '/' + params.data.id + '/information');
    });
    return span;
}
  
  editcharacter() {
    this.router.navigate(['/character/'+ this.character.id + '/edit']);
  }

  deletecharacter() {
    if (confirm('Are you sure you want to delete character: ' + this.character.name + ' ?')) {
      this.api.delete(CharacterApi.DELETE_CHARACTER + this.character.id ).subscribe(() => {
        this.toastr.success("Character Deleted!");
        this.router.navigate(['/character/search']);
      })
    }
  }

  linkCharacter(){
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = "modal-component";
        dialogConfig.width = "900px";
        dialogConfig.data = { objectAId: this.character.id, objectAType: ObjectType.CHARACTER, objectAName: this.character.name }
        this.matDialog.open(LinkMapAddFormComponent, dialogConfig);
}
}
