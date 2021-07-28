import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';

import { Release } from '../../shared/release.model';


@Component({
    selector: 'release-item',
    templateUrl: './release-item.component.html',
    styleUrls: ['./release-item.component.scss']

})

export class ReleaseItemComponent {
    @Input() release: Release;

    constructor(private router: Router) { }


    handleClick() {
    }
}