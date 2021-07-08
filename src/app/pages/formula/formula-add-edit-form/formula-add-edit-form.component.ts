import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../shared/rest-api.service';
import { FormulaApi } from '../shared/formula-api.constant';
import { FormulaCreate } from '../shared/formula-create.model';
import { Formula } from '../shared/formula.model';
import { Grade } from '../shared/grade.model';

@Component({
  selector: 'formula-add-edit-form',
  templateUrl: './formula-add-edit-form.component.html',
  styleUrls: ['./formula-add-edit-form.component.scss']
})
export class FormulaAddEditFormComponent implements OnInit {
  formula: FormulaCreate;
  grades: Grade[] = [];
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
          this.grades = [];
          this.formula.name = helper.name;
          this.formula.formula = helper.formula;

          if (helper.grades) {
            for (const grade of helper.grades) {
              this.grades.push(new Grade(grade));
            }
          }
        }
      }, () => {
        this.router.navigateByUrl(``);
      })
    }
  }

  addGrade() {
    this.grades.push(new Grade());
  }

  removeGrade(grade) {
    this.grades = this.grades.filter(g => g != grade);
  }

  save() {
    this.validate();
    if (this.valid) {
      this.formula.grades = this.grades.map(g => g.type);

      if (this.isEdit) {
        this.api.put(FormulaApi.EDIT_FORMULA.replace('#', this.id.toString()), this.formula).subscribe(() => {
          this.toastr.success("Formula edited!");
          this.router.navigateByUrl('review-formula/preview');
        })
      }
      else {
        this.api.post(FormulaApi.CREATE_FORMULA.replace('#', this.id.toString()), this.formula).subscribe((response) => {
          if (response && response['payload']) {
            this.toastr.success("Formula created!");
            this.router.navigateByUrl('review-formula/preview');
          }
        })
      }
    }
  }

  clear() {
    this.ngOnInit();
  }

  validate() {
    this.valueFormula = null;
    this.value = null;

    if (this.formula.name === null || this.formula.name === '' || !this.formula.name?.trim().length) {
      this.toastr.warning("Name is required!");
      this.valid = false;
    }

    if (this.formula.formula === null || this.formula.formula === '' || !this.formula.formula?.trim().length) {
      this.toastr.warning("Formula is required!");
      this.valid = false;
      return;
    }

    var gradeTypes = this.grades.map(g => g.type);
    let duplicates = new Set(gradeTypes.filter((item, index) => gradeTypes.indexOf(item) != index));

    if(duplicates.size> 0){
      this.toastr.warning(`Found duplicate grades: ${Array.from(duplicates).join(' ')}!`);
        this.valid = false;
        return;
    }


    for (let grade of this.grades) {
      if (grade.type === null || grade.type === '' || !grade.type?.trim().length || grade.grade === null) {
        this.toastr.warning("Every grade is required to have type and value!");
        this.valid = false;
        return;
      }
    }

    let formula = this.formula.formula;

    if (formula?.toLowerCase().indexOf('TOTAL_GRADE'.toLowerCase()) > -1) {
      this.toastr.warning("Grade type can not be TOTAL_GRADE!");
      this.valid = false;
      return;
    }

    for (let grade of this.grades) {
      let gradeRegex = new RegExp(`${grade.type}\\b`, "ig");

      
      if (gradeRegex.exec(formula)?.length > 0) {
        formula = formula.replace(gradeRegex, grade.grade.toString());
      }
      else {
        this.toastr.warning(`Type ${grade.type} doesn't exist in formula definition!`);
        this.valid = false;
        return;
      }
    }

    let letterRegex = new RegExp("[a-zA-Z]");
    if (formula != null && letterRegex.test(formula)) {
      this.toastr.warning("All grade types used in formula have to be provided!");
      this.valid = false;
      return;
    }

    if (formula != null && !this.checkParentheses(formula)) {
      this.toastr.warning("Missing parentheses!");
      this.valid = false;
      return;
    }

    try {
      if (!isFinite(Function(`"use strict";return (${formula})`)())) {
        this.toastr.warning("Final grade is not a number!");
        this.valid = false;
        this.value = null;
        this.valueFormula = null;
        return;
      }
    } catch (err) {
      this.toastr.warning("Formula is not valid!");
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
