import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/projects.service";
import { ActivatedRoute } from "@angular/router";
import { ReadmoreService } from "src/app/readmore.service";
import { TranslateService } from "src/app/translate.service";


@Component({
  selector: "project-page",
  templateUrl: "./project.component.html",
})
export class ProjectComponent {
  public code: string;
  public projects = [];
  public project;
  public maintitle: string;
  public data: any;
  public lang: string;
  public readmoreTitle: any;
  public index: number = 0;
  constructor(
    private _projectsService: ProjectsService,
    private route: ActivatedRoute,
    private readmore: ReadmoreService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe((params: any) => {
      this.code = params.code;
      this.lang = params.lang;
      this._projectsService
        .getProjects(this.code, this.lang)
        .subscribe(data => {
          this.readmore.setItems((this.projects = data));
        });
    });

    this._projectsService.getProjects(this.code,this.lang).subscribe((data) => {
      this.readmore.setItems(this.projects = data);
      
    });

    this.translate.use(this.lang).then(r => {
      this.data = r;
      this.maintitle = "PROJECTSTITLE";
      this.readmoreTitle = "READMORE";
    });
  }

  selected(item) {
    for(let i = 0; i<this.projects.length; i++){
      if(this.projects[i] == item){
        this.index = i;
      }
    }
    this.readmore.set(item);
    this.readmore.setIndeks(this.index);

  }
}
