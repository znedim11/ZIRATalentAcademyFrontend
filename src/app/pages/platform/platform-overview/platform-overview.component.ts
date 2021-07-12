import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateFormatterService } from '../../shared/date-formatter.service';
import { RestApiService } from '../../shared/rest-api.service';
import { PlatformApi } from '../shared/platform-api.constant';

@Component({
  selector: 'platform-overview',
  templateUrl: './platform-overview.component.html',
  styleUrls: ['./platform-overview.component.scss']
})
export class PlatformOverviewComponent implements OnInit {

  public platform;
  private games;

  constructor(
    private route: ActivatedRoute,
    private api: RestApiService,
    private dateFormatter : DateFormatterService
  ) {}

  ngOnInit(): void {
  }

  getDetails() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.api.get(PlatformApi.GET_PLATFORM + id).subscribe(platform => {
      if (platform) {
        this.platform = platform["payload"];

        if(this.platform.firstReleaseDate){
          this.platform.firstReleaseDate = this.dateFormatter.formatDate(this.platform.firstReleaseDate);
        }else{
          this.platform.firstReleaseDate = "Not released"
        }

        this.games = "";

        if(this.platform.games && this.platform.games.length != 0){
          let i = 0;
          for(let platform of this.platform.platforms){
            
            this.games = this.games.concat(platform.abbriviation);

            if(i != this.platform.platforms.length -1 ){
              this.games = this.games.concat(", ");
            }
            i++;
          }
        }else{
          this.games = "No games were released";
        }
        

        if(!this.platform.developer){
          this.platform.developer = {name:"Not released"}
        }

        if(!this.platform.publisher){
          this.platform.publisher = {name:"Not released"}
        }

      }
    });
  }
}
