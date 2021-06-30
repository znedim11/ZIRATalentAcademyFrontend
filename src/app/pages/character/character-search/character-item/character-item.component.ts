import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss']
})
export class CharacterItemComponent {
  @Input() character;

  constructor(private router: Router) {
  }

  showCharacter(characterId){
    this.router.navigate(['/character/'+characterId]);
  }
}