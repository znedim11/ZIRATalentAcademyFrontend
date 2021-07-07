import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RestApiService} from '../../shared/rest-api.service';
import {ToastrService} from 'ngx-toastr';
import {CompanyApi} from '../shared/company-api.constant';
import {CompanyCreateRequest} from '../shared/company.model';
import {FormValidatorService} from '../../shared/form-validator.service';
import { ImageRequest } from '../../shared/image-request.model';
@Component({
  selector: 'company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit{
  @Input() company: any;
  companyCreateRequest : CompanyCreateRequest;
  validName: boolean;
  id: number;
  isEdit: boolean;
  constructor(private route: ActivatedRoute,private api: RestApiService, private toastr: ToastrService,private router: Router, private formValidator: FormValidatorService) {
    this.companyCreateRequest = new CompanyCreateRequest();
    this.clearValidation();
  }

  ngOnInit(): void {
    this.companyCreateRequest = new CompanyCreateRequest();

    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id != 0) {
      this.isEdit = true;
      this.api.get(CompanyApi.GET_COMPANY_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
        if (response) {
          var helper:CompanyCreateRequest = response['payload'];

          this.companyCreateRequest.name = helper.name;
          this.companyCreateRequest.country = helper.country;
          this.companyCreateRequest.information = helper.information;
          this.companyCreateRequest.city = helper.city;
          this.companyCreateRequest.address = helper.address;
          this.companyCreateRequest.city = helper.city;
          this.companyCreateRequest.website = helper.website;
          this.companyCreateRequest.outlineText = helper.outlineText;
          this.companyCreateRequest.telNumber = helper.telNumber;
          this.companyCreateRequest.email = helper.email;
          this.companyCreateRequest.startDate = helper.startDate;
          this.companyCreateRequest.endDate = helper.endDate;
          this.companyCreateRequest.imageCreateRequest = new ImageRequest();

          if (helper.imageUrl){
            this.companyCreateRequest.imageCreateRequest.imageName = helper.imageUrl;
          }
        }
      }, (error) => {
        this.router.navigateByUrl('/home');
      })
    }
  }
  
  saveCompany() {
    if (this.isEdit) {
      if(this.validateFields()){
      this.api.put(CompanyApi.GET_COMPANY_BY_ID.replace('#', this.id.toString()), this.companyCreateRequest).subscribe(() => {
        this.toastr.success("Company edited!");
        this.router.navigateByUrl(`/home`);
      })
    }
    }
    else {
    if (this.validateFields()) {
      console.log(this.companyCreateRequest);
      this.api.post(CompanyApi.CREATE_COMPANY, this.companyCreateRequest).subscribe(response => {
        if (response && response['payload']) {
          this.toastr.success('Company successfully added!');
          this.clearValidation();
        }
      });
      this.companyCreateRequest = new CompanyCreateRequest();
    }
  }
  }
  cancel(){
    this.companyCreateRequest = new CompanyCreateRequest();
    this.toastr.info('Add cancelled!');
    this.clearValidation();
  }
  validateFields(){
    if(this.companyCreateRequest.name === null || this.companyCreateRequest.name === '' ) {
      this.toastr.warning('Please fill required fields.', 'Form is not valid!');
      this.validName = false;
      return false;
    }
    if (this.companyCreateRequest.email !== null && this.companyCreateRequest.email !== '' && this.companyCreateRequest.email!==undefined){
      if (!this.formValidator.validateEmail(this.companyCreateRequest.email)){
        this.toastr.warning('Please enter valid email.', 'Form is not valid!');
        return false;
      }
    }
    if (this.companyCreateRequest.startDate && this.companyCreateRequest.endDate){
      let startDate = new Date(this.companyCreateRequest.startDate);
      let endDate = new Date(this.companyCreateRequest.endDate);
      if (startDate >= endDate){
        this.toastr.warning('End date must come after start date.', 'Form is not valid!');
        return false;
      }
    }
    return true;
  }
  clearValidation(){
    this.validName = true;
  }

  onSelectFile(event) { 
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.companyCreateRequest.imageCreateRequest.imageName = event.target.files[0].name;
      reader.onload = (event) => { 
        this.companyCreateRequest.imageCreateRequest.imageData = event.target.result;
      }
    }
  }
}