import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'review-grade-element',
  templateUrl: './review-grade-element.component.html',
  styleUrls: ['./review-grade-element.component.scss']
})
export class ReviewGradeElementComponent implements OnInit {
  @Output() changeGrade = new EventEmitter();
  @Input() grade;

  constructor() { }

  ngOnInit(): void {
    console.log(this.grade);
    console.log(this.grade.value)
  }

  change() {
    this.changeGrade.emit(this.grade);
  }
}
