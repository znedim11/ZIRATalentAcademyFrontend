import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formula-add-edit-form',
  templateUrl: './formula-add-edit-form.component.html',
  styleUrls: ['./formula-add-edit-form.component.scss']
})
export class FormulaAddEditFormComponent implements OnInit {

  grades:any[] = ['g1', 'g2'];

  constructor() { }

  ngOnInit(): void {
  }

  addGrade(){
    this.grades.push('');
  }
}
