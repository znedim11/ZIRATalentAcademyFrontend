import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../../shared/game.model';

@Component({
  selector: 'game-list-element',
  templateUrl: './game-list-element.component.html',
  styleUrls: ['./game-list-element.component.scss']
})
export class GameListElementComponent {
  @Input() game: Game;

  constructor(private router: Router) { }

  handleClick() {
    this.router.navigateByUrl("/game/" + this.game.id + "/overview");
  }

}
