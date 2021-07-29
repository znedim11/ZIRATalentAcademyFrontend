import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DateFormatterService } from 'src/app/pages/shared/date-formatter.service';

import { Release, ReleaseDetail } from '../../shared/release.model';


@Component({
    selector: 'release-item',
    templateUrl: './release-item.component.html',
    styleUrls: ['./release-item.component.scss']

})

export class ReleaseItemComponent implements OnInit {
    @Input() release: ReleaseDetail;

    constructor(private router: Router, private dateService:DateFormatterService) { }
    ngOnInit(): void {
        console.log(this.release);
    }

    handleClick(params: any) {
        console.log(params);
        var span = document.createElement('span');
        span.innerHTML = `<p> ${params.value} </p> `;
        span.addEventListener('click', () => {
          
          this.router.navigateByUrl('/game/' + params.value.toLowerCase() + '/overview');
        });
        return span;
    }
}