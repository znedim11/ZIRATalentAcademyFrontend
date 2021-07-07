import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormulaApi } from '../../formula/shared/formula-api.constant';
import { Grade } from '../../formula/shared/grade.model';
import { RestApiService } from '../../shared/rest-api.service';
import { ReviewApi } from '../shared/review-api.constant';
import { ReviewCreate } from '../shared/review-create.model';
import { Review } from '../shared/review.model';

@Component({
  selector: 'review-add-edit-form',
  templateUrl: './review-add-edit-form.component.html',
  styleUrls: ['./review-add-edit-form.component.scss']
})
export class ReviewAddEditFormComponent implements OnInit {
  review: ReviewCreate = new ReviewCreate();
  isEdit = false;
  formula: string;
  gameId: number;
  id: number;
  valid: boolean = false;
  value: number;
  valueFormula: string;
  formulaSelect = [];
  grades: Grade[];

  constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.api.get(FormulaApi.GET_FORMULA_LOV)
      .subscribe((response) => {
        this.formulaSelect = response['payload'];
      });

      this.review.gameId = +this.route.snapshot.paramMap.get('gameId');
      this.id = +this.route.snapshot.paramMap.get('id');

      if(this.id != 0){
        this.isEdit = true;
        this.api.get(ReviewApi.GET_REVIEW_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
          if (response) {
            var helper: Review = response['payload'];
  
            this.review.title = helper.title;
            this.review.text = helper.text;
            this.review.formulaId = helper.formulaId;
            this.review.totalRating = helper.totalRating;
  
            if (helper.grades) {
              for (const grade of helper.grades) {
                this.grades.push(new Grade(grade));
              }
            }
          }
      })
    }
  }

  save() {
    this.validate();

    if (this.valid) {

      if (this.isEdit) {
        this.api.put(ReviewApi.EDIT_REVIEW.replace('#', this.id.toString()), this.review).subscribe(() => {
          this.toastr.success("Review edited!");
          this.router.navigateByUrl('');
        })
      }
      else {
        console.log(this.grades);
        for(const grade of this.grades){
          console.log(grade);
          this.review.grades.set(grade.type, grade.grade);
          console.log(this.review.grades)
        }
        this.api.post(ReviewApi.CREATE_REVIEW.replace('#', this.id.toString()), this.review).subscribe((response) => {
          if (response && response['payload']) {
            this.toastr.success("Review created!");
            this.router.navigateByUrl('');
          }
        })
      }
    }
  }

  cancel() {
    this.router.navigateByUrl('');
  }

  formulaChange() {
    this.api.get(FormulaApi.GET_FORMULA_BY_ID.replace('#', this.review.formulaId.toString())).subscribe((response) => {
      if (response) {
        this.formula = response['payload']['formula'];
        this.valueFormula = this.formula;
      }
    })

    this.grades = [];

    this.api.get(FormulaApi.GET_GRADES_BY_FORMULA.replace('#', this.review.formulaId.toString())).subscribe((response) => {
      if (response) {
        var grades = response['payload'];
        for (const grade of grades) {
          this.grades.push(new Grade(grade));
        }
      }
    })
  }

  changeGrade(event) {
    this.evalGrade();
  }

  evalGrade() {
    this.value = null;
    this.valueFormula = this.formula;

    for (let grade of this.grades) {
      if (grade.grade === null) {
        this.valid = false;
        return;
      }
    }

    this.valueFormula = this.formula;

    for (let grade of this.grades) {
      let gradeRegex = new RegExp(`${grade.type}\\b`, "ig");
      this.valueFormula = this.valueFormula.replace(gradeRegex, grade.grade.toString());
    }

    this.review.totalRating = Math.round(Function(`"use strict";return (${this.valueFormula})`)() * 100) / 100;
    this.valid = true;
  }


  validate() {
    if (this.review.title === null || this.review.title === '' || !this.review.title?.trim().length) {
      this.toastr.warning("Title is required!");
      this.valid = false;
      return;
    }

    if (this.review.formulaId == null) {
      this.toastr.warning("Formula is required!");
      this.valid = false;
      return;
    }

    for (let grade of this.grades) {
      if (grade.grade === null) {
        this.toastr.warning("Every grade is required to have value!");
        this.valid = false;
        return;
      }
    }

    this.valid = true;
  }

}