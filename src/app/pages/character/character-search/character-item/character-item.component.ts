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
    this.router.navigate(['/character/'+ characterId + '/overview']);
  }

  checkTextLength(text : String, length): Boolean{
    if(text){
      return text.length <= length;
    }
    return true;
  }

  correctTextLength(text : String, length): String{
    if(text){
      return text.substr(0, length-3) + '...';
    }
    return text;
  }
}