import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameApi } from '../../game/shared/game-api.constant';
import { RestApiService } from '../../shared/rest-api.service';
import { FranchiseApi } from '../shared/franchise-api.constant';

@Component({
  selector: 'franchise-overview',
  templateUrl: './franchise-overview.component.html',
  styleUrls: ['./franchise-overview.component.scss']
})
export class FranchiseOverviewComponent implements OnInit {
  franchise: any = [];
  game: any = [];
  distinctPlatforms: any = [];
  image: any = [];

  constructor(
    private route: ActivatedRoute,
    private api: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFranchise();
  }

  getFranchise() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.api.get(FranchiseApi.GET_FRANCHISES.replace('#', id.toString())).subscribe(franchise => {
      if (franchise) {
        this.franchise = franchise["payload"];
        this.distinctPlatformsAbb(franchise);
        this.selectImage(franchise);
        this.api.get(GameApi.GET_RELEASECOUNT_BY_GAME.replace('#', id.toString()))
                        .subscribe(releasecount => {
                            if (releasecount)
                                this.game.numberOfReleases = releasecount["payload"];
                        });
      }
    });
  }
  selectImage(franchise: any) {
    loop1: for (var i = 0; i < franchise.payload.games.length; i++) {
      var img = franchise.payload.games[i].imageUrl;
      if (img.startsWith("http")) {
        this.image.push(img);
      }
      else {
        continue loop1;
      }
    }

  }




  distinctPlatformsAbb(franchise: any) {
    loop2: for (var i = 0; i < franchise.payload.games.length; i++) {
      for (var j = 0; j < franchise.payload.games[i].platforms.length; j++) {
        var abb = franchise.payload.games[i].platforms[j];
        for (var k = 0; k < this.distinctPlatforms.length; k++) {
          if (this.distinctPlatforms[k] == abb) {
            continue loop2;
          }
        }
        this.distinctPlatforms.push(abb);
      }
    }
  }
}



