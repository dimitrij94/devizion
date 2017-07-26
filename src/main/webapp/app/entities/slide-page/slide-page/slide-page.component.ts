import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'jhi-slide-page',
    templateUrl: './slide-page.component.html',
    styleUrls: []
})
export class SlidePageComponent implements OnInit {


    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
    }


}
