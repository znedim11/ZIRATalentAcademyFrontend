import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../character/shared/character.model';
import { Game } from '../../game/shared/game.model';
import { Person } from '../../person/shared/person.model';
import { Object } from '../../object/shared/object.model';
import { Concept } from '../shared/concept.model';
import { RestApiService } from '../../shared/rest-api.service';
import { ConceptApi } from '../shared/concept-api.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'concept-overview',
    templateUrl: './concept-overview.component.html',
    styleUrls: ['./concept-overview.component.scss']
})
export class ConceptOverviewComponent implements OnInit {
    concept: Concept = new Concept();
    games: Game[] = [];
    persons: Person[] = [];
    objects: Object[] = [];
    characters: Character[] = [];
    locations: Location[] = [];

    columnDefsGames = [
        { headerName: "Game", field: "fullName", flex: 1.5, initialSort: 'desc', sortable: true, cellRenderer: this.createLink.bind(this) },
        {
            headerName: "Release Date", field: "firstReleaseDate", flex: 1.5, cellRenderer: (data) => {
                return data.value ? (new Date(data.value)).toLocaleDateString('en-GB') : 'Not released';
            }
        },
        { headerName: "Platform", field: "platformName", flex: 1 },
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

    constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        const id = +this.route.snapshot.paramMap.get('id');

        this.api.get(ConceptApi.GET_CONCEPT_BY_ID.replace('#', id.toString()))
            .subscribe(concept => {
                if (concept) {
                    this.concept = concept["payload"];
                    this.api.get(ConceptApi.GET_OLDEST_RELEASE_DATE_BY_CONCEPT.replace('#', id.toString()))
                        .subscribe(releaseDate => {
                            if (releaseDate)
                                this.concept.releaseDate = releaseDate["payload"];
                        });

                    this.api.get(ConceptApi.GET_GAMECOUNT_BY_CONCEPT.replace('#', id.toString()))
                        .subscribe(gamecount => {
                            if (gamecount)
                                this.concept.numberOfGames = gamecount["payload"];
                        });

                    this.api.get(ConceptApi.GET_GAMES_BY_CONCEPT.replace('#', id.toString())).
                        subscribe(games => {
                            if (games)
                                this.games = games["payload"];
                        });

                    this.api.get(ConceptApi.GET_PERSONS_BY_CONCEPT.replace('#', id.toString())).
                        subscribe(persons => {
                            if (persons)
                                this.persons = persons["payload"];
                        });

                    this.api.get(ConceptApi.GET_OBJECTS_BY_CONCEPT.replace('#', id.toString())).
                        subscribe(objects => {
                            if (objects)
                                this.objects = objects["payload"];
                        });

                    this.api.get(ConceptApi.GET_CHARACTERS_BY_CONCEPT.replace('#', id.toString())).
                        subscribe(characters => {
                            if (characters)
                                this.characters = characters["payload"];
                        });

                    this.api.get(ConceptApi.GET_LOCATIONS_BY_CONCEPT.replace('#', id.toString())).
                        subscribe(locations => {
                            if (locations)
                                this.locations = locations["payload"];
                        });
                }
            },
            error => { this.router.navigateByUrl('/concept/search'); }

            )
    }

    createLink(params) {
        var span = document.createElement('span');
        span.innerHTML = `<p> ${params.value} </p> `;
        span.addEventListener('click', () => {
            this.router.navigateByUrl('/' + params.colDef.headerName.toLowerCase() + '/' + params.data.id + '/information');
        });
        return span;
    }
}