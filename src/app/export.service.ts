import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private selection;
  private user;

  constructor() { }

public getitem(): Observable<any>{
  return of(this.selection);
}

exportitem(selection: any){
  this.selection = selection;
 
}


//Exporting users



exportuser(user: any){
  this.user=user;
}

public getuser(): Observable<any>{
  
  return of(this.user);
  
}


}
