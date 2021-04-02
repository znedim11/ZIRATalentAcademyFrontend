import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'

    
let FRANCHISES;

@Injectable()
export class FranchiseService {

    constructor(private httpClient: HttpClient){

    }

    getFranchises() {

        this.httpClient.get('http://localhost:8000/vigor/franchise/find')
            .pipe()
            .subscribe(
                result => {
                    FRANCHISES = result["payload"];
                }
            );

        return FRANCHISES;
    }

    addOrEditFranchise(franchise){
        console.log(franchise);
    }

    private handleError(operation='operation', result?: any){
        return (error: any): Observable<any> => {
            console.log(error);
            return of(result)
        }
    }
}