import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/users.service";
import { IUser } from "src/app/user";
import { TranslateService } from "src/app/translate.service";

@Component({
  selector: "start-page",
  templateUrl: "./start.component.html",
})
export class StartComponent implements OnInit {
  public users = [];
  public language = "en";
 
  constructor(
    private _usersService: UsersService,
    private translate: TranslateService,
  ) {}
  ngOnInit() {
    this._usersService.getUsers().subscribe(r => (this.users = r));
  }
  setLang(lang: string) {
    this.translate.use(lang);
    this.language = lang;
  }
}
