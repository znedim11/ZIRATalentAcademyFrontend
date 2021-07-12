import { Router } from '@angular/router';
import { Component, Input } from '@angular/core'

@Component({
    selector: 'platform-item',
    templateUrl: './platform-item.component.html',
    styleUrls: ['./platform-item.component.scss']
})
export class PlatformItemComponent {
    @Input() platform;

    constructor(private router: Router){

    }

    onDoubleClick(){
        console.log("TEST");
        this.router.navigate(['platform',this.platform.id]);
    }
}