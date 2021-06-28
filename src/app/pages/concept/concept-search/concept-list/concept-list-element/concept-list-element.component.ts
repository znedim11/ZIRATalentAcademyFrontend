import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Concept } from '../../../shared/concept.model';

@Component({
  selector: 'concept-list-element',
  templateUrl: './concept-list-element.component.html',
  styleUrls: ['./concept-list-element.component.scss']
})
export class ConceptListElementComponent {
  @Input() concept: Concept;

  constructor(private router: Router) { }

  handleClick() {
    this.router.navigateByUrl("/concept/" + this.concept.id + "/overview");
  }

}
