import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {EventManager, JhiLanguageService} from "ng-jhipster";

import {UserOrder} from "./user-order.model";
import {UserOrderService} from "./user-order.service";

@Component({
    selector: 'jhi-user-order-detail',
    templateUrl: './user-order-detail.component.html'
})
export class UserOrderDetailComponent implements OnInit, OnDestroy {

    userOrder: UserOrder;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private userOrderService: UserOrderService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['userOrder']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInUserOrders();
    }

    load (id) {
        this.userOrderService.find(id).subscribe(userOrder => {
            this.userOrder = userOrder;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserOrders() {
        this.eventSubscriber = this.eventManager.subscribe('userOrderListModification', response => this.load(this.userOrder.id));
    }

}
