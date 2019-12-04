import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IEn } from "./en";

@Injectable({
  providedIn: "root",
})
export class TranslateService {
  public data: any;
  constructor(private http: HttpClient) {}

  use(lang: string): Promise<IEn> {
    return new Promise<IEn>((resolve, reject) => {
      const langPath = `assets/i18n/${lang || "en"}.json`;

      this.http.get<IEn>(langPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation);
          resolve(this.data);
        },
        error => {
          this.data = {};
          resolve(this.data);
        },
      );
    });
  }
}
