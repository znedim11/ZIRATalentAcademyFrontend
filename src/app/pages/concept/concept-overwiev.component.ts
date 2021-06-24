import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../game/shared/game.model';
import { Person } from '../person/shared/person.model';
import { RestApiService } from '../shared/rest-api.service';
import { ConceptApi } from './shared/concept-api.constant';
import { Concept } from './shared/concept.model';

@Component({
    selector: 'concept-overview',
    templateUrl: './concept-overview.component.html',
    styleUrls: ['./concept-overview.component.scss']
})
export class ConceptOverviewComponent implements OnInit {
    concept: Concept = new Concept();
    games: Game[] = [];
    persons: Person[] = [];

    columnDefsGames = [
        { headerName: "Game", field: "fullName", flex: 1.5, initialSort: 'desc', sortable: true },
        { headerName: "Release Date", field: "releaseDate", flex: 1.5 },
        { headerName: "Platform", field: "platformCode", flex: 1 },
    ]

    columnDefsPersons = [
        { headerName: "Person", field: "firstName", initialSort: 'desc', sortable: true }
    ]

    columnDefsObjects = [
        { headerName: "Object", field: "name", initialSort: 'desc', sortable: true }
    ]

    columnDefsCharacters = [
        { headerName: "Character", field: "characterName", initialSort: 'desc', sortable: true }
    ]

    columnDefsLocations = [
        { headerName: "Location", field: "locationName", initialSort: 'desc', sortable: true }
    ]

    constructor(private route: ActivatedRoute, private api: RestApiService) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.api.get(ConceptApi.GET_CONCEPT_BY_ID + '/' + id)
            .subscribe(concept => {
                if (concept)
                    this.concept = concept["payload"];
            });

        this.api.get(ConceptApi.GET_BY_CONCEPT + '/' + id + '/games').
            subscribe(games => {
                if (games)
                    this.games = games["payload"];
            });

        this.api.get(ConceptApi.GET_BY_CONCEPT + '/' + id + '/persons').
            subscribe(persons => {
                if (persons)
                    this.persons = persons["payload"];
            });
    }
}