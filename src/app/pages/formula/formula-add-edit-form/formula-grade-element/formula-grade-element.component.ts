import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'formula-grade-element',
  templateUrl: './formula-grade-element.component.html',
  styleUrls: ['./formula-grade-element.component.scss']
})
export class FormulaGradeElementComponent implements OnInit {
  @Output() removeGrade = new EventEmitter();
  @Input() grade;

  constructor() { }

  ngOnInit(): void {
  }

  remove() {
    console.log("button");
    this.removeGrade.emit(this.grade);
  }
}
