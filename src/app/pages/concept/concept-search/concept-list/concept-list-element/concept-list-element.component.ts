import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameApi } from 'src/app/pages/game/shared/game-api.constant';
import { ConceptApi } from '../../../shared/concept-api.constant';
import { Concept } from '../../../shared/concept.model';

@Component({
  selector: 'concept-list-element',
  templateUrl: './concept-list-element.component.html',
  styleUrls: ['./concept-list-element.component.scss']
})
export class ConceptListElementComponent {
  @Input() concept: Concept;

  constructor(private router: Router) { }

  onClick() {
    this.router.navigateByUrl("/concept/" + this.concept.id + "/overview");
  }

}
