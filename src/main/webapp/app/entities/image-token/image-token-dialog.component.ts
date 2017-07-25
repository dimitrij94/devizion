import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ImageToken } from './image-token.model';
import { ImageTokenPopupService } from './image-token-popup.service';
import { ImageTokenService } from './image-token.service';

@Component({
    selector: 'jhi-image-token-dialog',
    templateUrl: './image-token-dialog.component.html'
})
export class ImageTokenDialogComponent implements OnInit {

    imageToken: ImageToken;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private imageTokenService: ImageTokenService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['imageToken']);
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
        if (this.imageToken.id !== undefined) {
            this.imageTokenService.update(this.imageToken)
                .subscribe((res: ImageToken) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.imageTokenService.create(this.imageToken)
                .subscribe((res: ImageToken) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: ImageToken) {
        this.eventManager.broadcast({ name: 'imageTokenListModification', content: 'OK'});
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
    selector: 'jhi-image-token-popup',
    template: ''
})
export class ImageTokenPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private imageTokenPopupService: ImageTokenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.imageTokenPopupService
                    .open(ImageTokenDialogComponent, params['id']);
            } else {
                this.modalRef = this.imageTokenPopupService
                    .open(ImageTokenDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
