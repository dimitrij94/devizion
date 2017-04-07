import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { UserOrder } from './user-order.model';
import { UserOrderPopupService } from './user-order-popup.service';
import { UserOrderService } from './user-order.service';
import { Product, ProductService } from '../product';
import { Custumer, CustumerService } from '../custumer';

@Component({
    selector: 'jhi-user-order-dialog',
    templateUrl: './user-order-dialog.component.html'
})
export class UserOrderDialogComponent implements OnInit {

    userOrder: UserOrder;
    authorities: any[];
    isSaving: boolean;

    products: Product[];

    custumers: Custumer[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private userOrderService: UserOrderService,
        private productService: ProductService,
        private custumerService: CustumerService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['userOrder']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.productService.query().subscribe(
            (res: Response) => { this.products = res.json(); }, (res: Response) => this.onError(res.json()));
        this.custumerService.query().subscribe(
            (res: Response) => { this.custumers = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.userOrder.id !== undefined) {
            this.userOrderService.update(this.userOrder)
                .subscribe((res: UserOrder) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.userOrderService.create(this.userOrder)
                .subscribe((res: UserOrder) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: UserOrder) {
        this.eventManager.broadcast({ name: 'userOrderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackCustumerById(index: number, item: Custumer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-order-popup',
    template: ''
})
export class UserOrderPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private userOrderPopupService: UserOrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.userOrderPopupService
                    .open(UserOrderDialogComponent, params['id']);
            } else {
                this.modalRef = this.userOrderPopupService
                    .open(UserOrderDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
