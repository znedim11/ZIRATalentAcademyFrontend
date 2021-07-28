import { Component, Input } from '@angular/core';

@Component({
    selector: 'home-grid',
    template: `<ag-grid-angular style="height: 520px" class="ag-theme-alpine" [columnDefs]="columns" [rowData]="rows"></ag-grid-angular>`
})

export default class HomeGridComponent{
    @Input() rows:any;
    @Input() columns:any;
}