import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { PortfolioEntry } from './portfolio-entry.model';
import { PortfolioEntryPopupService } from './portfolio-entry-popup.service';
import { PortfolioEntryService } from './portfolio-entry.service';

@Component({
    selector: 'jhi-portfolio-entry-delete-dialog',
    templateUrl: './portfolio-entry-delete-dialog.component.html'
})
export class PortfolioEntryDeleteDialogComponent {

    portfolioEntry: PortfolioEntry;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private portfolioEntryService: PortfolioEntryService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['portfolioEntry']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.portfolioEntryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'portfolioEntryListModification',
                content: 'Deleted an portfolioEntry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-portfolio-entry-delete-popup',
    template: ''
})
export class PortfolioEntryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private portfolioEntryPopupService: PortfolioEntryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.portfolioEntryPopupService
                .open(PortfolioEntryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
