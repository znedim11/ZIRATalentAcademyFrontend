import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConceptApi } from 'src/app/pages/concept/shared/concept-api.constant';
import { FranchiseApi } from 'src/app/pages/franchise/shared/franchise-api.constant';
import { ImageRequest } from 'src/app/pages/shared/image-request.model';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { GameApi } from '../../shared/game-api.constant';
import { GameCreate } from '../../shared/game-create';
import { Game } from '../../shared/game.model';

@Component({
  selector: 'app-game-add-edit-form',
  templateUrl: './game-add-edit-form.component.html',
  styleUrls: ['./game-add-edit-form.component.scss']
})
export class GameAddEditFormComponent implements OnInit {
  game: GameCreate;
  franchiseResponse=[];
  gameResponse=[];
  isEdit = false;
  id: number;
  isChecked : boolean = false;
  hideDlc;
  showDlc;
  validDlc;
  

  constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService) { 
  
  }

  ngOnInit(): void {
    this.game = new GameCreate();

    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id != 0) {
      this.isEdit=true;
      this.api.get(GameApi.GET_GAME_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
        if (response) {
          var helper: Game = response['payload'];
          this.game.fullName = helper.fullName;
          this.game.abbriviation=helper.abbriviation;
          this.game.dlc=helper.dlc;
          this.game.franchiseId=helper.franchiseId;
          this.game.genre=helper.genre;
          this.game.information=helper.information;
          this.game.outlineText=helper.outlineText;
          this.game.parentGameId=helper.parentGameId;

          if(this.game.dlc=='1'){    
            this.hideDlc = false;
            this.showDlc = true;
          }
          else{
            this.hideDlc = true;
            this.showDlc = false;
          }
          this.validDlc = true

          if (helper.imageUrl) {
            this.game.imageCreateRequest.imageData = helper.imageUrl;
          }
        }
      }, (error) => {
        this.router.navigateByUrl('/home');
      })
    }

    this.api.get(FranchiseApi.GET_FRANCHISES)
    .subscribe((franchises) => {
      this.franchiseResponse = franchises['payload'];
    });
    this.api.get(GameApi.GET_MAIN_GAMES)
    .subscribe((games) => {
      this.gameResponse = games['payload'];
    });


    
        
  }
  save() {
    if (this.isEdit) {
      this.api.put(GameApi.EDIT_GAME.replace('#', this.id.toString()), this.game).subscribe(() => {
        this.toastr.success("Game edited!");
        this.router.navigateByUrl(`/game/${this.id}/information`);
      })
    }
    else {
      this.api.post(GameApi.CREATE_GAME.replace('#', this.id.toString()), this.game).subscribe((response) => {
        if (response && response['payload']) {
          this.toastr.success("Game created!");
          this.router.navigateByUrl('/home');
        }
      })
    }
  }

  clear() {
    this.ngOnInit();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.game.imageCreateRequest.imageName = event.target.files[0].name;
      reader.onload = (event) => {
        this.game.imageCreateRequest.imageData = event.target.result;
      }
    }
  }

  showDlcChecked() {
    this.hideDlc = !this.hideDlc;
    this.showDlc = !this.showDlc;
}

}
