import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../shared/rest-api.service';
import { FranchiseApi } from '../shared/franchise-api.constant';
import { FranchiseCreateRequest } from '../shared/franchise.model';
@Component({
  selector: 'franchise-form',
  templateUrl: './franchise-form.component.html',
  styleUrls: ['./franchise-form.component.scss']
})
export class FranchiseCreateComponent implements OnInit
{
  @Input() franchise:any;
  franchiseCreateRequest: FranchiseCreateRequest;
  validName:boolean;
  id: number;
  isEdit: boolean;

  searchObject = {
    games: []
  }
  gameSelect = [];

  constructor(private route: ActivatedRoute,private api: RestApiService, private toastr: ToastrService,private router: Router) {
    this.franchiseCreateRequest = new FranchiseCreateRequest();
    this.clearValidation();
  }
  clearValidation() {
    this.validName = true;
  }
  ngOnInit(): void {
    this.franchiseCreateRequest = new FranchiseCreateRequest();
  
      this.api.get(FranchiseApi.GAME_NAMES)
        .subscribe((games) => {
          this.gameSelect = games['payload'];
        });

    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id != 0) {
      this.isEdit = true;
      this.api.get(FranchiseApi.GET_FRANCHISE_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
        if (response) {
          var helper:FranchiseCreateRequest = response['payload'];

          this.franchiseCreateRequest.name = helper.name;
          this.franchiseCreateRequest.information = helper.information;
          this.franchiseCreateRequest.outlineText = helper.outlineText;
          this.franchiseCreateRequest.aliases = helper.aliases;
          this.franchiseCreateRequest.gamesIds=helper.gamesIds;
        }
      }, (error) => {
        this.router.navigateByUrl('/franchise');
      })
    }
  }
  saveFranchise() {
    if (this.isEdit) {
      if(this.validateFields()){
      this.api.put(FranchiseApi.GET_FRANCHISE_BY_ID.replace('#', this.id.toString()), this.franchiseCreateRequest).subscribe(() => {
        this.toastr.success("Franchise edited!");
        this.router.navigateByUrl(`/franchise`);
      })
    }
    }
    else {
    if (this.validateFields()) {
      console.log(this.franchiseCreateRequest);
      this.api.post(FranchiseApi.CREATE_FRANCHISE, this.franchiseCreateRequest).subscribe(response => {
        if (response && response['payload']) {
          this.toastr.success('Franchise successfully added!');
          this.clearValidation();
        }
      });
      this.franchiseCreateRequest = new FranchiseCreateRequest();
    }
  }
  }

  validateFields(){
    if(this.franchiseCreateRequest.name === null || this.franchiseCreateRequest.name === '' ) {
      this.toastr.warning('Please fill required fields.', 'Form is not valid!');
      this.validName = false;
      return false;
    }
    return true;
  }

  cancel(){
    this.franchiseCreateRequest = new FranchiseCreateRequest();
    this.toastr.info('Add cancelled!');
    this.clearValidation();
  }
}