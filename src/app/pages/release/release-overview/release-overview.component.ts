import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReleaseApi } from '../shared/release-api.constant';
import { Release, ReleaseDetail } from '../shared/release.model';
import { HttpParams, HttpClient } from '@angular/common/http';



@Component({
   selector: 'release',
   templateUrl: './release-overview.component.html',
   styleUrls: ['./release-overview.component.scss'],
   providers: [DatePipe]
})

export class ReleaseOverviewComponent implements OnInit {


   title = 'New Releases';
   release: Release = new Release();
   map: Map<string, ReleaseDetail[]>;
   startDate = "2016-01-15";
   endDate = "2016-03-15";
   //currentDate = new Date();


   constructor(private api: RestApiService, private router: Router, private datePipe: DatePipe, private httpClient: HttpClient) {
      //this.dateString = this.datePipe.transform(this.currentDate,'dd.MM.YYYY');
   }





   ngOnInit(): void {

      let params = new HttpParams();
      params = params.append('startDate', this.startDate)
      params = params.append('endDate', this.endDate)
      params = params.append('timeSegment', 'week')
      params = params.append('releaseType', 'game');

      this.api.get(ReleaseApi.GET_RELEASES_BY_TIMETABLE, { params: params })
         .subscribe((release) => {
            this.release = release['payload'];
            this.map = this.release.mapOfReleasesByIntervals;
         });



   }




}