import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
@Injectable()
export class PlatformService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {
  }

  savePlatform(platform) {
    if(platform.id != null){
    } else {
      console.log("Platform service: ", platform);
    }
  }
}
