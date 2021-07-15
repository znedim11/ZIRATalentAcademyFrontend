import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImageRequest } from '../../shared/image-request.model';
import { RestApiService } from '../../shared/rest-api.service';
import { LinkMapApi } from '../shared/link-map-api.constant';
import { LinkMapCreate } from '../shared/link-map-create.model';

@Component({
  selector: 'link-map-add-form',
  templateUrl: './link-map-add-form.component.html',
  styleUrls: ['./link-map-add-form.component.scss']
})
export class LinkMapAddFormComponent implements OnInit {
  @Input() objectAType:string;
  @Input() objectAName:string;

  linkMap: LinkMapCreate;

  constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.linkMap = new LinkMapCreate();

    this.linkMap.objectAId = +this.route.snapshot.paramMap.get('id');
    this.linkMap.objectAType = this.route.snapshot.paramMap.get('type');
  }

  save() {
      console.log(this.linkMap);
      this.api.post(LinkMapApi.CREATE_MULTIPLE_LINK, this.linkMap).subscribe((response) => {
        if (response && response['payload']) {
          this.toastr.success("LinkMap created!");
          this.router.navigateByUrl(`/${this.linkMap.objectAType}/${this.linkMap.objectAId}`);
        }
      })
    
  }

  clear() {
    this.ngOnInit();
  }
}
