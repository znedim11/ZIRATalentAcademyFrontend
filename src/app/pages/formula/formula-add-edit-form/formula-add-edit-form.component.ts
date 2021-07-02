import { Component, OnInit } from '@angular/core';
import { Formula } from '../shared/formula.model';
import { FormulaCreate } from '../shared/formulaCreate.model';

@Component({
  selector: 'app-formula-add-edit-form',
  templateUrl: './formula-add-edit-form.component.html',
  styleUrls: ['./formula-add-edit-form.component.scss']
})
export class FormulaAddEditFormComponent implements OnInit {
  formula: FormulaCreate;
  isEdit = false;
  id: number;

  constructor() { }

  ngOnInit(): void {
    this.formula = new FormulaCreate();

    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id != 0) {
      this.isEdit = true;
      this.api.get(ConceptApi.GET_CONCEPT_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
        if (response) {
          var helper: Concept = response['payload'];

          this.concept.name = helper.name;
          this.concept.aliases = helper.aliases;
          this.concept.information = helper.information;
          this.concept.outline = helper.outline;
          this.concept.imageCreateRequest = new ImageRequest();

          if (helper.imageUrl) {
            this.concept.imageCreateRequest.imageName = helper.imageUrl;
          }
        }
      }, (error) => {
        this.router.navigateByUrl('/concept/search');
      })
    }
  }

  addGrade() {
    this.formula.grades.push();
  }
}
