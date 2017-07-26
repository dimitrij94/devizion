import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EventManager, JhiLanguageService} from "ng-jhipster";

import {UserOrder} from "./user-order.model";
import {UserOrderPopupService} from "./user-order-popup.service";
import {UserOrderService} from "./user-order.service";

@Component({
    selector: 'jhi-user-order-delete-dialog',
    templateUrl: './user-order-delete-dialog.component.html'
})
export class UserOrderDeleteDialogComponent {

    userOrder: UserOrder;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private userOrderService: UserOrderService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['userOrder']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.userOrderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userOrderListModification',
                content: 'Deleted an userOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-order-delete-popup',
    template: ''
})
export class UserOrderDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private userOrderPopupService: UserOrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.userOrderPopupService
                .open(UserOrderDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
