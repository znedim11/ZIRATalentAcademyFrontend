import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Grade } from 'src/app/pages/formula/shared/grade.model';

@Component({
  selector: 'review-grade-element',
  templateUrl: './review-grade-element.component.html',
  styleUrls: ['./review-grade-element.component.scss']
})
export class ReviewGradeElementComponent implements OnInit {
  @Output() changeGrade = new EventEmitter();
  @Input() grade:Grade;

  constructor() { }

  ngOnInit(): void {
  }

  change() {
    this.changeGrade.emit(this.grade);
  }
}
