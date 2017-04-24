import {Component, Input, OnInit} from "@angular/core";
import {PortfolioEntry} from "../../entities/portfolio-entry/portfolio-entry.model";

@Component({
    selector: 'jhi-portfolio',
    templateUrl: './portfolio.component.html',
    styles: [`
        .portfolio-image {
            height: 6rem;
            width: auto;
        }
    `]
})
export class PortfolioComponent implements OnInit {

    @Input('portfolio')
    private portfolio: Array<PortfolioEntry>;

    @Input('portfolioSize')
    private portfolioSize: number;

    constructor() {

    }

    ngOnInit() {

    }


}
