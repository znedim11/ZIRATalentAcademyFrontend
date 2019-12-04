import { Component, OnInit } from "@angular/core";
import { ReadmoreService } from "src/app/readmore.service";
import { ResumeService } from "src/app/resume.service";
import { IResume } from "src/app/resume";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "src/app/translate.service";

@Component({
  selector: "app-resume-extended",
  templateUrl: "./resume-extended.component.html",
})
export class ResumeExtendedComponent implements OnInit {
  public detail: any = {};
  public resumeextended: IResume[];
  public caption: string;
  public captions: string;
  public increment: number = 0;
  public code: string;
  public lang: string;
  public resume;
  public niz = [];
  public names = [];
  public broj: number = 0;
  public index: number = 0;
  public image;
  public images;
  public incrementI: number = 0;
  public next: string;
  public before: string;
  constructor(
    private readmore: ReadmoreService,
    private _resumeService: ResumeService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.niz = [];
      this.names = [];
      this.broj = 0;
      this.code = params.code;
      this.lang = params.lang;
      
      this._resumeService.getResume(this.code, this.lang).subscribe(data => {
        this.resume = data;
        Object.keys(this.resume).forEach(key => {
          for (let i = 0; i < this.resume[key].children.length; i++) {
            this.names[this.broj] = this.resume[key].title;
            this.niz[this.broj] = this.resume[key].children[i];
            this.broj++;
          }
        });

      this.readmore.getIndeks().subscribe(data => {
        this.index = data;
      })
        this.readmore.setTitles(this.names);
        this.readmore.setItems(this.niz);
        for (let i = 0; i < this.niz.length; i++) {
          if (i == this.index) this.readmore.set(this.niz[i]);
        }
        this.readmore.get().subscribe(data => {
          this.detail = data;
         
        });

        this.readmore.gettitle().subscribe(data => {
          this.caption = data;
        });
        this.readmore.getTitles().subscribe(data => {
          this.captions = data;
        });
        this.readmore.getItems().subscribe(resumeextended => {
          this.resumeextended = resumeextended;
          this.readmore.get().subscribe(resumeextended => {
            this.detail = resumeextended;
            if (this.detail) {
              this.images = this.detail.images;
             this.image = this.images[0];
              this.shift(this.resumeextended.indexOf(this.detail));
            }
          });
        });
      });
    });
    this.translate.use(this.lang).then(r => {
  
      this.next = "NEXT";
      this.before = "BEFORE";
    });
  
  }
  shift(increment) {
    if (
      !this.resumeextended.length ||
      increment >= this.resumeextended.length ||
      increment < 0
    )
      return;
    this.detail = this.resumeextended[increment];
    this.caption = this.captions[increment];
    this.increment = increment;
    this.index = this.increment;
    this.readmore.setIndeks(this.index);
    this.images = this.detail.images;
    this.image = this.detail.images[0];
    this.incrementI = 0;
  }

  left() {
    this.shift(this.increment - 1);
  }
  right() {
    this.shift(this.increment + 1);
  }
  shiftImages(incrementI) {
    if (
      !this.images.length ||
      incrementI >= this.images.length ||
      incrementI < 0
    ) {
      console.log(this.images);
      console.log(incrementI);
      return;
    }
    this.image = this.images[incrementI];
    console.log("lala", incrementI);
    this.incrementI = incrementI;
  }
  leftI() {
    this.shiftImages(this.incrementI - 1);
  }
  rightI() {
    console.log("uslo",this.increment);
    this.shiftImages(this.incrementI + 1);
  }
}
