import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../shared/rest-api.service';
import { FormulaApi } from '../shared/formula-api.constant';
import { Formula } from '../shared/formula.model';
import { FormulaCreate } from '../shared/formulaCreate.model';
import { Grade } from '../shared/grade.model';

@Component({
  selector: 'app-formula-add-edit-form',
  templateUrl: './formula-add-edit-form.component.html',
  styleUrls: ['./formula-add-edit-form.component.scss']
})
export class FormulaAddEditFormComponent implements OnInit {
  formula: FormulaCreate;
  isEdit = false;
  id: number;
  valid: boolean = false;
  value: number;
  valueFormula: string;


  constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formula = new FormulaCreate();

    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id != 0) {
      this.isEdit = true;
      this.api.get(FormulaApi.GET_FORMULA_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
        if (response) {
          var helper: Formula = response['payload'];

          this.formula.name = helper.name;
          this.formula.formula = helper.formula;

          if (helper.grades) {
            this.formula.grades = helper.grades;
          }
        }
      }, () => {
        this.router.navigateByUrl(`/concept/${this.id}/overview`);
      })
    }
  }

  addGrade() {
    this.formula.grades.push(new Grade());
  }

  removeGrade(grade) {
    console.log("function");
    this.formula.grades = this.formula.grades.filter(g => g != grade);
  }

  save() {
    this.validate();

    if (this.valid) {
      var gradeType: string[] = this.formula.grades.map(g => g.type);

      //API - BACKEND URADITI
    }
  }

  validate() {
    this.valueFormula = null;
    this.value = null;

    let emptyStringRegex = new RegExp("/\s/g", "ig");

    if (this.formula.formula === null || this.formula.formula === '' || !this.formula.formula.replace(emptyStringRegex, '').length) {
      this.toastr.warning("Formula is required!");
      this.valid = false;
    }

    if (this.formula.name === null || this.formula.name === '' || !this.formula.name.replace(emptyStringRegex, '').length) {
      this.toastr.warning("Name is required!");
      this.valid = false;
    }

    for (let grade of this.formula.grades) {
      if (grade.type === null || grade.type === '' || !grade.type.replace(emptyStringRegex, '').length || grade.grade === null) {
        this.toastr.warning("Every grade is required to have type and value!");
        this.valid = false;
        return;
      }
    }

    let formula = this.formula.formula;

    if (formula.toLowerCase().indexOf('TOTAL_GRADE'.toLowerCase()) > -1) {
      this.toastr.warning("Grade type can not be TOTAL_GRADE!");
      this.valid = false;
      return;
    }

    for (let grade of this.formula.grades) {
      let gradeRegex = new RegExp(grade.type, "ig");
      if (gradeRegex.test(formula)) {
        formula = formula.replace(gradeRegex, grade.grade.toString());
      }
      else {
        this.toastr.warning(`Type ${grade.type} doesn't exist in formula definition!`);
        this.valid = false;
        return;
      }
    }

    let letterRegex = new RegExp("[a-zA-Z]");
    if (letterRegex.test(formula)) {
      this.toastr.warning("All grade types used in formula have to be provided!");
      this.valid = false;
      return;
    }

    if (!this.checkParentheses(formula)) {
      this.toastr.warning("Missing parentheses!");
      this.valid = false;
      return;
    }

    if (!isFinite(Function(`"use strict";return (${formula})`)())) {
      this.toastr.warning('Final grade is not a number.');
      this.valid = false;
      this.value = null;
      this.valueFormula = null;
      return;
    }

    this.valueFormula = formula;
    this.value = Function(`"use strict";return (${formula})`)();
    this.valid = true;
  }

  checkParentheses(str) {
    const array = [];

    const open = {
      '{': '}',
      '[': ']',
      '(': ')'
    };

    const closed = {
      '}': true,
      ']': true,
      ')': true
    }

    for (let i = 0; i < str.length; i++) {
      let char = str[i];

      if (open[char]) {
        array.push(char);
      } else if (closed[char]) {
        if (open[array.pop()] !== char) {
          return false;
        }
      }
    }

    return array.length === 0;
  }
}
