import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageRequest } from '../../shared/image-request.model';
import { RestApiService } from '../../shared/rest-api.service';
import { CharacterApi } from '../shared/character-api.constant';
import { CharacterCreate } from '../shared/character-create.model';
import { Character } from '../shared/character.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { SharedApi } from '../../shared/shared-api.constat';

@Component({
  selector: 'app-character-add-edit',
  templateUrl: './character-add-edit.component.html',
  styleUrls: ['./character-add-edit.component.scss']
})
export class CharacterAddEditComponent implements OnInit {
  character: CharacterCreate;
  isEdit = false;
  id:number;

  characterGames = [];
  characterGender: ListSelectItem;
  gamesList = [];
  dropdownSettings = {};

  constructor(private route: ActivatedRoute, 
              private api: RestApiService, 
              private router: Router, 
              private toastr: ToastrService) 
  { }

  ngOnInit(): void {
    this.character = new CharacterCreate();

    this.id = +this.route.snapshot.paramMap.get('id');

    this.api.get(SharedApi.GET_GAMES)
    .subscribe((games) => {
      this.gamesList = games['payload'];
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    if (this.id != 0) {
      this.isEdit = true;
      this.api.get(CharacterApi.GET_CHARACTER_BY_ID + this.id.toString()).subscribe((response) => {
        if (response) {
          var helper:Character = response['payload'];

          this.character.name = helper.name;
          this.character.realName = helper.realName;
          this.character.aliases = helper.aliases;
          this.character.gender = helper.gender;
          this.character.dob = helper.dob ? moment(helper.dob).format('YYYY-MM-DD') : null;
          this.character.dod = helper.dod ? moment(helper.dod).format('YYYY-MM-DD') : null;
          this.character.information = helper.information;
          this.character.outlineText = helper.outlineText;
          this.character.imageCreateRequest = new ImageRequest();

          if (helper.imageUrl){
            this.character.imageCreateRequest.imageData = helper.imageUrl;
          }

          this.api.get(CharacterApi.GET_GAMES_FOR_CHARACTER.replace('#', this.id.toString())).subscribe(games => {
            if(games) {
              this.characterGames = games["payload"];
              var temp: ListSelectItem[] = new Array(this.characterGames.length);

              for(var i  = 0; i < this.characterGames.length; i++){
                temp[i] = new ListSelectItem(this.characterGames[i].id, this.characterGames[i].name);
              }
              this.characterGames = temp;
            }
          });

        }
      }, (error) => {
        this.router.navigate(['character/search']);
      })
    }
    
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.character.imageCreateRequest.imageName = event.target.files[0].name;
      reader.onload = (event) => {
        this.character.imageCreateRequest.imageData = event.target.result;
      }
    }
  }

  save() {
    this.character.gamesIds = new Array(this.characterGames.length);
    for(var i = 0; i < this.characterGames.length; i++){
      this.character.gamesIds[i] = this.characterGames[i].id;
    }

    if (this.isEdit) {
      console.log(this.character);
      this.api.put(CharacterApi.EDIT_CHARACTER + this.id.toString(), this.character).subscribe(() => {
        this.toastr.success("Character edited!");
        this.router.navigate(['/character/'+ this.id + '/overview']);
      })
    }
    else {
      console.log(this.character);
      this.api.post(CharacterApi.CREATE_CHARACTER, this.character).subscribe((response) => {
        if (response && response['payload']) {
          this.toastr.success("Character created!");
          this.router.navigate(['/character/search']);
        }
      })
    }
  }

  cancel(){
    if (this.isEdit)
      this.router.navigate(['/character/'+ this.id + '/overview']);
    else
      this.router.navigate(['character/search']);
  }
}

class ListSelectItem{
  id;   // value
  name; // Displayed text

  constructor(id, name){
    this.id = id;
    this.name = name;
  }
}
