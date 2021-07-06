import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { FormulaApi } from '../shared/formula-api.constant';
import { Formula } from '../shared/formula.model';

@Component({
  selector: 'formula-list',
  templateUrl: './formula-list.component.html',
  styleUrls: ['./formula-list.component.scss']
})
export class FormulaListComponent implements OnInit {
  formulaList: Formula[] = [];

  constructor(private api: RestApiService, private router: Router) {
    this.api.get(FormulaApi.GET_FORMULAS)
      .subscribe((formulas) => {
        if (formulas) {
          this.formulaList = formulas['payload'];
        }
      }, () => { }, () => {
        for (const formula of this.formulaList) {
          this.api.get(FormulaApi.GET_REVIEWCOUNT_BY_FORMULA.replace('#', formula.id.toString()))
            .subscribe((reviewCount) => {
              formula.reviewCount = reviewCount['payload'];
            });
        }
      });

  }

  ngOnInit(): void {

  }

  handleClick() {
    this.router.navigateByUrl('/add-formula')
  }
}