import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserOrder } from './user-order.model';
import { UserOrderService } from './user-order.service';
@Injectable()
export class UserOrderPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private userOrderService: UserOrderService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.userOrderService.find(id).subscribe(userOrder => {
                if (userOrder.orderedAt) {
                    userOrder.orderedAt = {
                        year: userOrder.orderedAt.getFullYear(),
                        month: userOrder.orderedAt.getMonth() + 1,
                        day: userOrder.orderedAt.getDate()
                    };
                }
                this.userOrderModalRef(component, userOrder);
            });
        } else {
            return this.userOrderModalRef(component, new UserOrder());
        }
    }

    userOrderModalRef(component: Component, userOrder: UserOrder): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userOrder = userOrder;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
