import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResume } from "./resume";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ResumeService {
  public array: any;
  constructor(private http: HttpClient) {}
  setArray(item: any) {
    this.array = item;
  }
  getArray() {
    return this.array;
  }
  getResume(code: string, lang: string): Observable<IResume> {
    return this.http.get<IResume>(
      "/assets/jsonFiles/" + code + "json/" + lang + "resume." + code + ".json",
    );
  }
}
