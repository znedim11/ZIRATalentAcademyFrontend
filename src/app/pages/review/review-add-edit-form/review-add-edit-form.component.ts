import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormulaApi } from '../../formula/shared/formula-api.constant';
import { Grade } from '../../formula/shared/grade.model';
import { RestApiService } from '../../shared/rest-api.service';
import { SharedApi } from '../../shared/shared-api.constat';
import { ReviewApi } from '../shared/review-api.constant';
import { ReviewCreate } from '../shared/review-create.model';
import { ReviewUpdate } from '../shared/review-update.model';
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

  constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.api.get(SharedApi.GET_FORMULAS)
      .subscribe((response) => {
        this.formulaSelect = response['payload'];
      });

      this.review.gameId = +this.route.snapshot.paramMap.get('gameId');
      this.id = +this.route.snapshot.paramMap.get('id');

      if(this.id != 0){
        this.isEdit = true;
        this.api.get(ReviewApi.GET_REVIEW_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
          if (response) {
            this.review.grades = [];
            var helper: Review = response['payload'];
  
            this.review.title = helper.title;
            this.review.text = helper.text;
            this.review.formulaId = helper.formulaId;
            this.review.totalRating = helper.totalRating;
  
            this.api.get(FormulaApi.GET_FORMULA_BY_ID.replace('#', this.review.formulaId.toString())).subscribe((response) => {
              if (response) {
                this.formula = response['payload']['formula'];
                this.valueFormula = this.formula;
                this.evalGrade();
              }
            })

            if (helper.grades) {
              for (const grade of helper.grades) {
                this.review.grades.push(new Grade(grade.type, grade.grade));
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
        const review: ReviewUpdate = new ReviewUpdate();
        review.title = this.review.title;
        review.text = this.review.text;
        review.formulaId = this.review.formulaId;
        review.totalRating = this.review.totalRating;
        review.grades = this.review.grades;

        this.api.put(ReviewApi.EDIT_REVIEW.replace('#', this.id.toString()), review).subscribe(() => {
          this.toastr.success("Review edited!");
          this.router.navigateByUrl('');
        })
      }
      else {
        this.api.post(ReviewApi.CREATE_REVIEW.replace('#', this.id.toString()), this.review).subscribe((response) => {
          if (response && response['payload']) {
            this.toastr.success("Review created!");
            this.router.navigateByUrl('');
          }
        })
      }
    }
  }

  clear() {
    this.ngOnInit();
  }


  formulaChange() {
    this.api.get(FormulaApi.GET_FORMULA_BY_ID.replace('#', this.review.formulaId.toString())).subscribe((response) => {
      if (response) {
        this.formula = response['payload']['formula'];
        this.valueFormula = this.formula;
      }
    })

    this.review.grades = [];

    this.api.get(FormulaApi.GET_GRADES_BY_FORMULA.replace('#', this.review.formulaId.toString())).subscribe((response) => {
      if (response) {
        var grades = response['payload'];
        for (const grade of grades) {
          this.review.grades.push(new Grade(grade));
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

    for (let grade of this.review.grades) {
      if (grade.grade === null) {
        this.valid = false;
        return;
      }
    }

    for (let grade of this.review.grades) {
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

    for (let grade of this.review.grades) {
      if (grade.grade === null) {
        this.toastr.warning("Every grade is required to have value!");
        this.valid = false;
        return;
      }
    }

    this.valid = true;
  }

}