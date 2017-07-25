import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { SlidePage } from './slide-page.model';
import { SlidePagePopupService } from './slide-page-popup.service';
import { SlidePageService } from './slide-page.service';

@Component({
    selector: 'jhi-slide-page-dialog',
    templateUrl: './slide-page-dialog.component.html'
})
export class SlidePageDialogComponent implements OnInit {

    slidePage: SlidePage;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private slidePageService: SlidePageService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['slidePage']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.slidePage.id !== undefined) {
            this.slidePageService.update(this.slidePage)
                .subscribe((res: SlidePage) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.slidePageService.create(this.slidePage)
                .subscribe((res: SlidePage) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: SlidePage) {
        this.eventManager.broadcast({ name: 'slidePageListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-slide-page-popup',
    template: ''
})
export class SlidePagePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private slidePagePopupService: SlidePagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.slidePagePopupService
                    .open(SlidePageDialogComponent, params['id']);
            } else {
                this.modalRef = this.slidePagePopupService
                    .open(SlidePageDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
