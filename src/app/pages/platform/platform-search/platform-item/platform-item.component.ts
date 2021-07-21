import { Router } from '@angular/router';
import { Component, Input } from '@angular/core'
import { ViewEncapsulation } from '@angular/core';
import { Platform } from '../../shared/platform.model';

@Component({
  selector: 'platform-item',
  templateUrl: './platform-item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./platform-item.component.scss']
})
export class PlatformItemComponent {
  @Input() platform: Platform;

  constructor(private router: Router) {

  }

  onDoubleClick() {
    this.router.navigate(['platform', this.platform.id]);
  }
}