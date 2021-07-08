import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormulaApi } from '../../formula/shared/formula-api.constant';
import { Formula } from '../../formula/shared/formula.model';
import { Grade } from '../../formula/shared/grade.model';
import { RestApiService } from '../../shared/rest-api.service';
import { SharedApi } from '../../shared/shared-api.constat';
import { ReviewApi } from '../shared/review-api.constant';
import { Review } from '../shared/review.model';

@Component({
    selector: 'review-overview',
    templateUrl: './review-overview.component.html',
    styleUrls: ['./review-overview.component.scss']
})
export class ReviewOverviewComponent implements OnInit {
    review: Review = new Review();
    grades: Grade[] = []
    formula: Formula = new Formula();
    isReviewer: boolean = false;

    columnDefsGrades = [
        { headerName: "Grade Type", field: "type", flex: 1 },
        { headerName: "Grade", field: "grade", flex: 1, initialSort: 'desc' }
    ]
    loggedUser = '';

    constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        const id = +this.route.snapshot.paramMap.get('id');

        this.api.get(ReviewApi.GET_REVIEW_BY_ID.replace('#', id.toString()))
            .subscribe(
                (response) => {
                    if (response) {
                        var helper: Review = response['payload'];

                        this.review = helper
                        this.isReviewer = this.loggedUser == this.review.reviewerId;

                        this.api.get(FormulaApi.GET_FORMULA_BY_ID.replace('#', this.review.formulaId.toString())).subscribe((response) => {
                            if (response) {
                                this.formula = response['payload'];
                            }
                        })

                        this.review.grades = helper.grades;
                    }

                },
                error => { this.router.navigateByUrl('/review/search'); }
            );

        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('Access-Control-Allow-Origin', '*');

        this.api.get(SharedApi.GET_LOGGED_USER, headers).subscribe((response) => {
            this.loggedUser = response['code'];
            this.isReviewer = this.loggedUser == this.review.reviewerId;
        })

    }

    editReview() {
        this.router.navigateByUrl(`/review/${this.review.id}/edit`);
    }

    /* deleteReview() {
        if (confirm(`Are you sure to delete review ${this.review.name}?`)) {
            this.api.delete(ReviewApi.DELETE_CONCEPT.replace('#', this.review.id.toString())).subscribe(() => {
                this.toastr.success("Review deleted successfully!");
                this.router.navigateByUrl('/review/search');
            })
        }
    } */

    formulaOverview() {
        console.log(this.formula.id);
    }
}
