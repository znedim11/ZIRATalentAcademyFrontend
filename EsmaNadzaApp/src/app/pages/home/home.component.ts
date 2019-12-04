import { Component, OnInit, NgModule } from "@angular/core";
import { OneuserService } from "src/app/oneuser.service";
import { ResumeService } from "src/app/resume.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IUser } from "src/app/user";
import { IResume } from "src/app/resume";
import { TranslateService } from "src/app/translate.service";
import { IEn } from "src/app/en";

@Component({
  selector: "home-page",
  templateUrl: "./home.component.html",
})
@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeComponent implements OnInit {
  public users: IUser[];
  public user: IUser;
  public code: string;
  public resume: IResume;
  public followLabel: any;
  public aboutLabel: any;
  public lang: string;
  public data: any;
  constructor(
    private _userService: OneuserService,
    private _resumeService: ResumeService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.code = params.code;
      this.lang = params.lang;
      this._userService.getUser(this.code,this.lang).subscribe(r => {
        this.user = r;
      });
      this._resumeService
        .getResume(this.code, this.lang)
        .subscribe(data => (this.resume = data));
    });
    this._userService.getUser(this.code,this.lang).subscribe(r => {
      this.user = r;
    });
    this._resumeService
      .getResume(this.code, this.lang)
      .subscribe(data => (this.resume = data));
    this.translate.use(this.lang).then(r => {
      this.data = r;
      this.followLabel = "FOLLOWME";
      this.aboutLabel = "ABOUT";
    });
  }
  refresh() {
    this.ngOnInit();
  }
}
