import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RouterModule, RouteReuseStrategy } from "@angular/router";

import { StartComponent } from "./pages/start/start.component";
import { LayoutComponent } from "./pages/layout/layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { ResumeComponent } from "./pages/resume/resume.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { ProjectComponent } from "./pages/project/project.component";

import { HeaderComponent } from "./pages/layout/components/header/header.component";
import { FooterComponent } from "./pages/layout/components/footer/footer.component";



import {UsersService} from './users.service';
import {ProjectsService} from './projects.service';
import {HttpClientModule} from '@angular/common/http';
import {ResumeService} from './resume.service';
import {ContactService} from './contact.service';
import {ResumeExtendedComponent } from './pages/resume/resume-extended/resume-extended.component';
import {ProjectExtendedComponent} from './pages/project/project-extended/project-extended.component';


import {ReadmoreService} from './readmore.service';
import {TranslateService} from './translate.service';
import { TranslatePipe } from './translate.pipe'


import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    HomeComponent,
    LayoutComponent,
    ResumeComponent,
    ContactComponent,
    ProjectComponent,
    HeaderComponent,
    FooterComponent,
    ResumeExtendedComponent,
    ProjectExtendedComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    PDFExportModule,
    BrowserAnimationsModule
    
  ],
  providers: [UsersService,
             ResumeService,
             ProjectsService,
             ContactService,
             ReadmoreService,
             TranslateService,{
              provide: APP_INITIALIZER,
              useFactory: setupTranslateFactory,
              deps: [ TranslateService ],
              multi: true
            }],
  bootstrap: [AppComponent]
})
export class AppModule {}
