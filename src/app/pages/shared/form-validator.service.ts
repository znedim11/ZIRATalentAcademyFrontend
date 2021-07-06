import {Injectable} from '@angular/core';
@Injectable()
export class FormValidatorService {
  validateEmail(email:string){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
  validatePhoneNumber(phone:string){
    const re2 = /\+?(387)?0?(((60)|(61)|(62)|(63)|(64)|(65))|(([0](60))|([0](61))|([0](62))|([0](63))|([0](64))|([0](65))))\/([0-9]{3})-([0-9]{3})/;
    return re2.test(phone);
  }
}