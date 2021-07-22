import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FranchiseService } from '../shared/franchise.service';

@Component({
    selector: 'franchises-list',
    templateUrl: './franchises-list.component.html',
    styleUrls: ['./franchises-list.component.scss']
})
export class FranchisesListComponent implements OnInit {

    private gridApi;
    rowData;

    defaultColDef = {
        resizable: true,
        cellStyle: { color: '#1a3469' }
    }

    columnDefs = [
        { headerName: "Name", field:"name", flex: 1.5, initialSort: 'desc', sortable: true, cellStyle: {color: 'blue', 'text-decoration': 'underline'}, cellRenderer: this.createLink.bind(this) },
        { headerName: "Created", field: "created" },
        { headerName: "CreatedBy", field: "createdBy" },
        { headerName: "Outline", field: "outlineText" },
        { headerName: "Aliases", field: "aliases" }
    ]

    constructor(private franchiseService: FranchiseService, private router:Router) {

    }

    ngOnInit() {
        this.rowData = this.franchiseService.getFranchises();
        this.franchiseService.getFranchises()
            .subscribe((data: any) => {
                if (data && data.payload) {
                    this.rowData = data.payload;
                } else {
                    console.log("No data returned");
                }
            }
            );

    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.sizeToFit();
    }

    sizeToFit() {
        this.gridApi.sizeColumnsToFit();
    }

    createLink(params) {
        var span = document.createElement('span');
        span.innerHTML = `<p> ${params.value} </p>`;
        span.addEventListener('click', () => {
            this.router.navigateByUrl('/franchise/' + params.data.id + '/overview');
        });
        return span;
    }
}
