import {Component, Input, OnInit} from "@angular/core";
import {UserOrderService} from "../../entities/user-order/user-order.service";
import {ImageScalar} from "../../shared/image/image-size.model";
import {UserOrder} from "../../entities/user-order/user-order.model";

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
    private portfolio: Array<UserOrder>;

    @Input('portfolioSize')
    private portfolioSize: number;

    private portfolioWithDesc: Array<{ portfolio: UserOrder, descActive: boolean }>;

    constructor(private portfolioService: UserOrderService) {

    }

    ngOnInit() {
        this.portfolio.forEach((portfolio) => {
            portfolio.photoUri = this.portfolioService.getImageUri(portfolio.photoUri, this.getImageScalar(), window.innerWidth);
            this.portfolioWithDesc.push({portfolio: portfolio, descActive: false});
        });
    }

    private getImageScalar() {
        return ImageScalar.getFillScreenScalar(this.portfolioSize);
    }
}
