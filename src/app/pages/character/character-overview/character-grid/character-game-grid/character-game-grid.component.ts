import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'character-game-grid',
  templateUrl: './character-game-grid.component.html',
  styleUrls: ['./character-game-grid.component.scss']
})
export class CharacterGameGridComponent {
  @Input() characterGames;

  columnDefs = [
    { headerName:"Game", field:"gameName", flex: 1.5, initialSort: 'desc', sortable: true, cellStyle: {color: 'blue', 'text-decoration': 'underline'} },
    { headerName:"Release Date", field:"releaseDate", flex: 1.5 },
    { headerName:"Platform", field:"platformCode", flex: 1 },
  ]

  constructor(private router : Router) {
  }

  onCellClicked(event){
    if(event.colDef.field === 'gameName'){
      this.router.navigate(['/game/'+event.data.gameId]);
    }
  }

}