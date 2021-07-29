import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../character/shared/character.model';
import { GameApi } from '../game/shared/game-api.constant';
import { Concept } from '../concept/shared/concept.model';
import { Person } from '../person/shared/person.model';
import { RestApiService } from '../shared/rest-api.service';
import { Game } from './shared/game.model';
import { ObjectType } from '../shared/object-type.constant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageRequest } from '../shared/image-request.model';
import { LinkMapAddFormComponent } from '../link-map/link-map-add-form/link-map-add-form.component';
import { ReleaseAddFormComponent } from '../release/release-add-form/release-add-form.component';

@Component({
    selector: 'game-overview',
    templateUrl: './game-overview.component.html',
    styleUrls: ['./game-overview.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GameOverviewComponent implements OnInit {
    game: Game = new Game();
    concepts: Concept[] = [];
    persons: Person[] = [];
    objects: Object[] = [];
    characters: Character[] = [];
    locations: Location[] = [];

    columnDefsConcepts = [
        { headerName: "Concept", field: "name", flex: 1.5, initialSort: 'desc', sortable: true, cellRenderer: this.createLink.bind(this) }
    ]

    columnDefsPersons = [
        { headerName: "Person", field: "fullName", valueGetter(params) { return params.data.firstName + ' ' + params.data.lastName }, initialSort: 'desc', sortable: true, flex: 1, cellRenderer: this.createLink.bind(this) }
    ]

    columnDefsObjects = [
        { headerName: "Object", field: "name", initialSort: 'desc', sortable: true, flex: 1, cellRenderer: this.createLink.bind(this) }
    ]

    columnDefsCharacters = [
        { headerName: "Character", field: "name", initialSort: 'desc', sortable: true, flex: 1, cellRenderer: this.createLink.bind(this) }
    ]

    columnDefsLocations = [
        { headerName: "Location", field: "name", initialSort: 'desc', sortable: true, flex: 1, cellRenderer: this.createLink.bind(this) }
    ]

    constructor(
        private route: ActivatedRoute, 
        private api: RestApiService, 
        private router: Router, 
        private matDialog: MatDialog) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        const id = +this.route.snapshot.paramMap.get('id');

        this.api.get(GameApi.GET_GAME_OVERVIEW.replace('#', id.toString()))
            .subscribe(game => {
                if (game) {
                    var helper: Game = game['payload'];
                    this.game = helper;
                    this.game.imageRequest= new ImageRequest();
                    if (helper.imageUrl) {
                        this.game.imageRequest.imageData = helper.imageUrl;
                      }
                    this.api.get(GameApi.GET_RELEASECOUNT_BY_GAME.replace('#', id.toString()))
                        .subscribe(releasecount => {
                            if (releasecount)
                                this.game.numberOfReleases = releasecount["payload"];
                        });
                }

            });

        this.api.get(GameApi.GET_CONCEPTS_BY_GAME.replace('#', id.toString())).
            subscribe(concepts => {
                if (concepts)
                    this.concepts = concepts["payload"];
            });

        this.api.get(GameApi.GET_PERSONS_BY_GAME.replace('#', id.toString())).
            subscribe(persons => {
                if (persons)
                    this.persons = persons["payload"];
            });

        this.api.get(GameApi.GET_OBJECTS_BY_GAME.replace('#', id.toString())).
            subscribe(objects => {
                if (objects)
                    this.objects = objects["payload"];
            });

        this.api.get(GameApi.GET_CHARACTERS_BY_GAME.replace('#', id.toString())).
            subscribe(characters => {
                if (characters)
                    this.characters = characters["payload"];
            });

        this.api.get(GameApi.GET_LOCATIONS_BY_GAME.replace('#', id.toString())).
            subscribe(locations => {
                if (locations)
                    this.locations = locations["payload"];
            });
    }

    createLink(params) {
        var span = document.createElement('span');
        span.innerHTML = `<p> ${params.value} </p> `;
        span.addEventListener('click', () => {
            this.router.navigateByUrl('/' + params.colDef.headerName.toLowerCase() + '/' + params.data.id + '/overview');
        });
        return span;
    }

    addReview() {
        this.router.navigateByUrl(`game/${this.game.id}/review/add`);
    }

    linkGame(){
        const dialogConfigLink = new MatDialogConfig();
        dialogConfigLink.disableClose = true;
        dialogConfigLink.id = "link-map-add-form-component";
        dialogConfigLink.width = "900px";
        dialogConfigLink.data = { objectAId: this.game.id, objectAType: ObjectType.GAME, objectAName: this.game.fullName }
        this.matDialog.open(LinkMapAddFormComponent, dialogConfigLink);
    }

    addRelease(){
        const dialogConfigReview = new MatDialogConfig();
        dialogConfigReview.disableClose = true;
        dialogConfigReview.id = "release-add-form-component";
        dialogConfigReview.width = "900px";
        dialogConfigReview.data = { objectId: this.game.id, objectType: ObjectType.GAME.toUpperCase()}
        this.matDialog.open(ReleaseAddFormComponent, dialogConfigReview);
    }
}
