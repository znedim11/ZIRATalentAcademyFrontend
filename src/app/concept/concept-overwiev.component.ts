import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'concept-overview',
    templateUrl: './concept-overview.component.html',
    styleUrls: ['./concept-overview.component.scss']
})
export class ConceptOverviewComponent implements OnInit {
    concept: any;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get('http://localhost:8333/concept/20', { observe: 'body', responseType: 'json' }).subscribe((data: any) => {
            console.log(data);
            this.concept = data;
            console.log(this.concept);
        });
    }
}