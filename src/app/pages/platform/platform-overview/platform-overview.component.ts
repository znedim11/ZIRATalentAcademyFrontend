
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';
import { PlatformApi } from '../shared/platform-api.constant';
import { Platform } from '../shared/platform.model';
import { ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReleaseAddFormComponent } from '../../release/release-add-form/release-add-form.component';
import { ObjectType } from '../../shared/object-type.constant';

@Component({
  selector: 'platform-overview',
  templateUrl: './platform-overview.component.html',
  styleUrls: ['./platform-overview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlatformOverviewComponent implements OnInit {

  public platform: Platform;

  constructor(
    private route: ActivatedRoute,
    private api: RestApiService, 
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.api.get(PlatformApi.GET_PLATFORM + "/" + id).subscribe(platform => {
      if (platform) {
        this.platform = platform["payload"];
      }
    });
  }

  addRelease(){
    const dialogConfigReview = new MatDialogConfig();
    dialogConfigReview.disableClose = true;
    dialogConfigReview.id = "release-add-form-component";
    dialogConfigReview.width = "900px";
    dialogConfigReview.data = { objectId: this.platform.id, objectType: ObjectType.PLATFORM.toUpperCase()}
    this.matDialog.open(ReleaseAddFormComponent, dialogConfigReview);
}
}
