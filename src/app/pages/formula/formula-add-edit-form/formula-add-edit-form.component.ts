import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router) { }

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

  save(){
    console.log("Save");
  }
}
