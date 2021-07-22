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
  constructor(
    private route: ActivatedRoute,
    private api: RestApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFranchise();
  }

  getFranchise() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.api.get(FranchiseApi.GET_FRANCHISES.replace('#', id.toString())).subscribe(franchise => {
      if (franchise) {
        this.franchise = franchise["payload"];
        console.log(franchise);
      }
    });

    this.api.get(GameApi.GET_GAME_BY_ID.replace('#', id.toString())).subscribe(game => {
      if (game) {
        this.game = game["payload"];
        console.log(game);
        this.api.get(GameApi.GET_RELEASECOUNT_BY_GAME.replace('#', id.toString()))
                        .subscribe(releasecount => {
                            if (releasecount)
                                this.game.numberOfReleases = releasecount["payload"];
                        });
      }
    });
  } 
}
