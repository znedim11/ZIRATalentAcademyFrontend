import { Component, Input } from '@angular/core';

@Component({
    selector: 'game-grid',
    template: `<ag-grid-angular style="height: 160px" class="ag-theme-alpine" [columnDefs]="columns" [rowData]="rows"></ag-grid-angular>`
})

export class GameGridComponent{
    @Input() rows;
    @Input() columns;
}