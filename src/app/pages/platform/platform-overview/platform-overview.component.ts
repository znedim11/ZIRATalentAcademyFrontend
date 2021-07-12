
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateFormatterService } from '../../shared/date-formatter.service';
import { RestApiService } from '../../shared/rest-api.service';
import { PlatformApi } from '../shared/platform-api.constant';
import { Platform } from '../shared/platform.model';
import { ViewEncapsulation } from '@angular/core';

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
    private api: RestApiService
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
}
