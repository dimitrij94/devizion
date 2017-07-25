import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Custumer } from './custumer.model';
import { CustumerPopupService } from './custumer-popup.service';
import { CustumerService } from './custumer.service';

@Component({
    selector: 'jhi-custumer-delete-dialog',
    templateUrl: './custumer-delete-dialog.component.html'
})
export class CustumerDeleteDialogComponent {

    custumer: Custumer;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private custumerService: CustumerService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['custumer']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.custumerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'custumerListModification',
                content: 'Deleted an custumer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-custumer-delete-popup',
    template: ''
})
export class CustumerDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private custumerPopupService: CustumerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.custumerPopupService
                .open(CustumerDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
