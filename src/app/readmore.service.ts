import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReadmoreService {
  private item;
  private items;
  private title;
  private titles;
  private index;
  constructor() {}

  public get(): Observable<any> {
    return of(this.item);
  }

  set(item: any) {
    this.item = item;
  }
  setIndeks(index: number){
     this.index = index;
  }
  getIndeks(){
    return of(this.index);
 }
  public getItems(): Observable<any> {
    return of(this.items);
  }

  setItems(items: any) {
    this.items = items;
  }
  setTitles(items: any) {
    this.titles = items;
  }
  getTitles() {
    return of(this.titles);
  }

  public gettitle(): Observable<string> {
    return of(this.title);
  }

  settitle(title: string) {
    this.title = title;
  }
}
