import { Component, NgModule } from "@angular/core";
import { OneuserService } from "src/app/oneuser.service";
import { ResumeService } from "src/app/resume.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IUser } from "src/app/user";
import { IResume } from "src/app/resume";
import { TranslateService } from "src/app/translate.service";
import { IEn } from "src/app/en";
import { typeWithParameters } from "@angular/compiler/src/render3/util";
import { HomeComponent } from "src/app/pages/home/home.component";

@Component({
  providers: [HomeComponent],
  selector: "footer-layout",
  templateUrl: "./footer.component.html",
})
export class FooterComponent {
  public users: IUser[];
  public user: IUser;
  public resume: IResume;
  public code: string;
  public selected: any;
  public lang: string;
  public data: any;
  public contactLabel: string;
  public callLabel: string;
  public buttonValue: string;
  public path: string;
  public page: string;
  constructor(
    private _userService: OneuserService,
    private _resumeService: ResumeService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.code = params.code;
      this.lang = params.lang;
    });
    this._userService.getUser(this.code,this.lang).subscribe(r => {
      this.user = r;
    });
    this.translate.use(this.lang).then(r => {
      this.data = r;
      this.contactLabel = "CONTACTfooter";
      this.callLabel = "CALL";
      this.buttonValue = "BUTTONfooter";
    });
  }

  select(item) {
    this.selected = item;
  }

}
