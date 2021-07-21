import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { RestApiService } from '../../shared/rest-api.service';
import { PlatformApi } from '../shared/platform-api.constant';
import { PlatformCreateRequest } from '../shared/platform.model';


@Component({
  templateUrl: './platform-create.component.html',
  styleUrls: ['./platform-create.component.scss']
})
export class PlatformCreateComponent {
  @Input() platform: any;
  platformCreateRequest: PlatformCreateRequest;
  validName: boolean;
  validCode: boolean;

  constructor(private api: RestApiService, private toastr: ToastrService) {
    this.platformCreateRequest = new PlatformCreateRequest();
    this.clearValidation();
  }


  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.platformCreateRequest.imageCreateRequest.imageName = event.target.files[0].name;

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.platformCreateRequest.imageCreateRequest.imageData = event.target.result;
      }
    }
  }

  savePlatform() {
    if (!this.isValid()) {
      this.toastr.warning('Please fill required fields.', 'Form is not valid!');
    } else {
      this.api.post(PlatformApi.CREATE_PLATFORM, this.platformCreateRequest).subscribe(response => {
        if (response && response.payload) {
          this.toastr.success('Platform successfully added!');
          this.clearValidation();
        }
      });
      this.platformCreateRequest = new PlatformCreateRequest();
    }
  }

  isValid() {
    if (this.platformCreateRequest.fullName === null || this.platformCreateRequest.fullName === '') {
      this.validName = false;
      return false;
    } else if (this.platformCreateRequest.code === null || this.platformCreateRequest.code === '') {
      this.validName = true;
      this.validCode = false;
      return false;
    }
    this.clearValidation();
    return true;
  }

  cancel() {
    this.platformCreateRequest = new PlatformCreateRequest();
    this.clearValidation();
    this.toastr.info('Add cancelled!');
  }

  clearValidation() {
    this.validName = true;
    this.validCode = true;
  }
}
