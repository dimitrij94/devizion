import {Component, OnDestroy, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {Subscription} from "rxjs/Rx";
import {AlertService, EventManager, JhiLanguageService} from "ng-jhipster";

import {UserOrder} from "./user-order.model";
import {UserOrderService} from "./user-order.service";
import {Principal} from "../../shared";
import {MyImageService, portfolioSubdirectory} from "../../shared/image/image.service";

@Component({
    selector: 'jhi-user-order',
    templateUrl: './user-order.component.html',
    styleUrls: ['/user-order.style.scss']
})
export class UserOrderComponent implements OnInit, OnDestroy {
    userOrders: UserOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private jhiLanguageService: JhiLanguageService,
                private userOrderService: UserOrderService,
                private alertService: AlertService,
                private imageService: MyImageService,
                private eventManager: EventManager,
                private principal: Principal) {
        this.jhiLanguageService.setLocations(['userOrder']);
    }

    loadAll() {
        this.userOrderService.query().subscribe(
            (res: Response) => {
                let userOrders = <UserOrder[]> res.json();
                userOrders.forEach((order) => {
                    order.photoUri = this.imageService.getImagePathOfSize(
                        portfolioSubdirectory,
                        order.photoUri,
                        window.innerWidth,
                        20);
                });
                this.userOrders = userOrders;
            },
            (res: Response) => this.onError(res.json())
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserOrder) {
        return item.id;
    }


    registerChangeInUserOrders() {
        this.eventSubscriber = this.eventManager.subscribe('userOrderListModification', (response) => this.loadAll());
    }


    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
