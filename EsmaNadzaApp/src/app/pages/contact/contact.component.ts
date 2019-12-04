import { Component, OnInit } from '@angular/core';
import {ContactService} from 'src/app/contact.service';
import { OneuserService } from 'src/app/oneuser.service';
import { ActivatedRoute } from "@angular/router";
import { IContact } from 'src/app/contact';
import { IUser } from 'src/app/user';
import { TranslateService } from 'src/app/translate.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'contact-page',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  public code: string;
  public contact: IContact;
  public user: IUser;
  public maintitle: string;
  public lang: string;
  public data: any;
  public holderName: any;
  public holderEmail: any;
  public holderSubject: any;
  public holderMessage: any;
  public contactHello: any;
  public contactText: any;
  public contactInformation: any;
  public send:any;
  
  constructor( private _userService: OneuserService, private _contactService: ContactService, private route: ActivatedRoute,private translate: TranslateService,private http: HttpClient) {

  }

  ngOnInit(){

    this.route.parent.params.subscribe((params:any) => {
      this.code = params.code;
      this.lang = params.lang;
  
    this._userService.getUser(this.code,this.lang).subscribe((r)=> {
        this.user = r;
      });
      
        this._contactService.getContact(this.code,this.lang).subscribe((data)=> this.contact = data);
    });

    this._userService.getUser(this.code,this.lang).subscribe((r)=> {
      this.user = r;
    });
     
   
   this._contactService.getContact(this.code,this.lang).subscribe((data)=> this.contact = data);
   this.translate.use(this.lang).then((r)=>{
    this.data = r;
    this.maintitle = "CONTACTTITLE";
    this.holderName = "HOLDERNAME";
    this.holderEmail = "HOLDEREMAIL";
    this.holderSubject = "HOLDERSUBJECT";
    this.holderMessage = "HOLDERMESSAGE";  
    this.contactText = "CONTACTTEXT"; 
    this.contactHello = "CONTACTHELLO";
    this.contactInformation = "CONTACTINFORMATION";
    this.send = "SEND";
});
   
  }
  function() {
    var obj = {};
    function toJSONString( form ) {
  
      var elements = form.querySelectorAll( "input, select, textarea" );
      for( var i = 0; i < elements.length; ++i ) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;
        if( name ) {
          obj[ name ] = value;
        }
      }
      return JSON.stringify( obj );
    }
          
      var form = document.getElementById( "inputs" );
      form.addEventListener( "submit", function( e ) {
        e.preventDefault();
        var json = toJSONString( this );
        console.log(json);
  
      }, false);
  
      var body = "name=" + obj["name"] + "&email=" + obj["email"] + "&subject=" + obj["subject"] + "&message="+obj["message"];
      console.log(body);
    // this.http.post("http://localhost:4200/de/layout/esma/contact", body).subscribe((data) => {}); 
  
  };
}
