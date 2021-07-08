import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'review-grid',
    template: `<ag-grid-angular style="height: 300px" class="ag-theme-alpine" [columnDefs]="columns" [rowData]="rows"></ag-grid-angular>`
})

export class ReviewGridComponent{
    @Input() rows;
    @Input() columns;
}