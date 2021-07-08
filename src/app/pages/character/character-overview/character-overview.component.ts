import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestApiService} from '../../shared/rest-api.service';
import {CharacterApi} from '../shared/character-api.constant';
import * as moment from 'moment';

@Component({
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.scss']
})
export class CharacterOverviewComponent implements OnInit{

  character;
  characterGames = [];
  numOfGames = null;

  constructor(
    private route: ActivatedRoute,
    private api: RestApiService,
  ) {}

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.api.get(CharacterApi.GET_CHARACTER_BY_ID + id).subscribe(character => {
      if (character) {
        this.character = character["payload"];
        this.character.dob = this.character.dob ? moment(this.character.dob).format('DD.MM.YYYY') : null;
      }
    });
  
    this.api.get(CharacterApi.GET_GAMES_FOR_CHARACTER + id).subscribe(games => {
        if(games) {
          this.characterGames = games["payload"];
          this.characterGames.forEach(game => {
            game.releaseDate = game.releaseDate ? moment(game.releaseDate).format('DD.MM.YYYY') : null;
          });
     
          const filteredGames = Array.from(new Set(this.characterGames.map(game => game.gameId)))
            .map(gameId => {
              return this.characterGames.find(game => game.gameId === gameId)
            })
          this.numOfGames = filteredGames.length;
        }
    });

  }
  
}