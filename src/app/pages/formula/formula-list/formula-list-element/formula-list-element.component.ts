import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Formula } from '../../shared/formula.model';

@Component({
  selector: 'formula-list-element',
  templateUrl: './formula-list-element.component.html',
  styleUrls: ['./formula-list-element.component.scss']
})
export class FormulaListElementComponent {
  @Input() formula: Formula;

  constructor(private router: Router) {
   }

  handleClick() {
    this.router.navigateByUrl("/formula/" + this.formula.id + "/edit");
  }

}
