import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImageRequest } from '../../shared/image-request.model';
import { RestApiService } from '../../shared/rest-api.service';
import { ConceptApi } from '../shared/concept-api.constant';
import { ConceptCreate } from '../shared/concept-create.model';
import { Concept } from '../shared/concept.model';

@Component({
  selector: 'app-concept-add-edit-form',
  templateUrl: './concept-add-edit-form.component.html',
  styleUrls: ['./concept-add-edit-form.component.scss']
})
export class ConceptAddEditFormComponent implements OnInit {
  concept: ConceptCreate;
  isEdit = false;
  id: number;

  constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.concept = new ConceptCreate();

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
            this.concept.imageCreateRequest.imageData = helper.imageUrl;
          }
        }
      }, (error) => {
        this.router.navigateByUrl('/concept/search');
      })
    }
  }

  save() {
    if (this.isEdit) {
      console.log(this.concept);
      this.api.put(ConceptApi.EDIT_CONCEPT.replace('#', this.id.toString()), this.concept).subscribe(() => {
        this.toastr.success("Concept edited!");
        this.router.navigateByUrl(`/concept/${this.id}/overview`);
      })
    }
    else {
      console.log(this.concept);
      this.api.post(ConceptApi.CREATE_CONCEPT.replace('#', this.id.toString()), this.concept).subscribe((response) => {
        if (response && response['payload']) {
          this.toastr.success("Concept created!");
          this.router.navigateByUrl('/concept/search');
        }
      })
    }
  }

  clear() {
    this.ngOnInit();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.concept.imageCreateRequest.imageName = event.target.files[0].name;
      reader.onload = (event) => {
        this.concept.imageCreateRequest.imageData = event.target.result;
      }
    }
  }
}
