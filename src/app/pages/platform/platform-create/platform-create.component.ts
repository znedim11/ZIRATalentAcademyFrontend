import {Component, Input, OnInit} from '@angular/core';
import { PlatformService } from '../platform.service';


@Component({
  templateUrl: './platform-create.component.html',
  styleUrls: ['./platform-create.component.scss']
})
export class PlatformCreateComponent implements OnInit{
  @Input() platform;

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.platform.imageData = event.target.result;
      }
    }
  }

  constructor(private platformService: PlatformService) {
  }

  ngOnInit(){
    this.platform = {
      name: null,
      abbriviation: null,
      outline: null,
      information: null,
      aliases: null,
      imageData: null
    }
  }

  savePlatform() {
    this.platformService.savePlatform(this.platform);
  }

  cancel() {
    this.platform.information = null;
    this.platform.imageData= null;
    console.log("Canceled");
  }
}
