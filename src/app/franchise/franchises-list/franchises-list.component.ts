import { Component } from '@angular/core';

@Component({
  selector: 'franchises-list',
  templateUrl: './franchises-list.component.html',
  styleUrls: ['./franchises-list.component.scss']
})
export class FranchisesListComponent {

    private gridApi;

    onGridReady(params) {
        this.gridApi = params.api;
        this.sizeToFit();
    }

    sizeToFit(){
        this.gridApi.sizeColumnsToFit();
    }

    defaultColDef = { 
        resizable: true,
        cellStyle: {color: '#1a3469'}
     }

    columnDefs = [
        { headerName:"Name", field:"name" },
        { headerName:"Created", field:"created" },
        { headerName:"CreatedBy", field:"createdBy" },
        { headerName:"First Appearance", field:"firstAppearance" },
        { headerName:"Outline", field:"outlineText" },
        { headerName:"Games", field:"games" },
        { headerName:"Aliases", field:"aliases" }
    ]

    rowData = [
        {name:"Super Mario", created: "22-01-2021", createdBy:"emsta", firstAppearance:"01-02-1981 (Donkey Kong)", outlineText:"It's a me!", games:"Donkey Kong,SMB,...", aliases:"Mario,SMB"},
        {name:"Metroid", created: "22-01-2021", createdBy:"emsta", firstAppearance:"01-06-1984 (Metroid)", outlineText:"Samus Aran shoots thigs", games:"Metroid,Metroid 2,...", aliases:"Metroidvania"},
    ]
}
