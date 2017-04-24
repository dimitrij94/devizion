import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioEntry } from './portfolio-entry.model';
import { PortfolioEntryService } from './portfolio-entry.service';
@Injectable()
export class PortfolioEntryPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private portfolioEntryService: PortfolioEntryService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.portfolioEntryService.find(id).subscribe(portfolioEntry => {
                this.portfolioEntryModalRef(component, portfolioEntry);
            });
        } else {
            return this.portfolioEntryModalRef(component, new PortfolioEntry());
        }
    }

    portfolioEntryModalRef(component: Component, portfolioEntry: PortfolioEntry): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.portfolioEntry = portfolioEntry;
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
