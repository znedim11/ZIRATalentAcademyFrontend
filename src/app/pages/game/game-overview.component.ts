import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../character/shared/character.model';
import { GameApi } from '../game/shared/game-api.constant';
import { Concept } from '../concept/shared/concept.model';
import { Person } from '../person/shared/person.model';
import { RestApiService } from '../shared/rest-api.service';
import { Game } from './shared/game.model';

@Component({
    selector: 'game-overview',
    templateUrl: './game-overview.component.html',
    styleUrls: ['./game-overview.component.scss']
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

    constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        const id = +this.route.snapshot.paramMap.get('id');

        this.api.get(GameApi.GET_GAME_OVERVIEW.replace('#', id.toString()))
            .subscribe(game => {
                if (game) {
                    this.game = game["payload"];
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

}
