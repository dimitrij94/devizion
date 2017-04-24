import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { PortfolioEntry } from './portfolio-entry.model';
import { PortfolioEntryPopupService } from './portfolio-entry-popup.service';
import { PortfolioEntryService } from './portfolio-entry.service';
import { Product, ProductService } from '../product';
import {ImageToken} from "../image-token/image-token.model";
import {AuthServerProvider} from "../../shared/auth/auth-jwt.service";

@Component({
    selector: 'jhi-portfolio-entry-dialog',
    templateUrl: './portfolio-entry-dialog.component.html'
})
export class PortfolioEntryDialogComponent implements OnInit {

    portfolioEntry: PortfolioEntry;
    authorities: any[];
    isSaving: boolean;
    imageToken:ImageToken;

    products: Product[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private portfolioEntryService: PortfolioEntryService,
        private productService: ProductService,
        private authServiceProvider: AuthServerProvider,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['portfolioEntry']);
    }

    onRemove($event) {
        this.productService
            .productImageUploadCancel(this.imageToken[$event.file.name].id)
            .subscribe(() => {
                delete this.imageToken[$event.file.name];
            });
    }


    onLoad($event: any) {
        if ($event.serverResponse.status == 200) {
            let imageToken = JSON.parse($event.serverResponse.response);
            this.portfolioEntry.photoUri = imageToken.path;
            this.imageToken[$event.file.name] = imageToken;
        }
        else
            this.onError($event.serverResponse.json());
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.productService.query().subscribe(
            (res: Response) => { this.products = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.portfolioEntry.id !== undefined) {
            this.portfolioEntryService.update(this.portfolioEntry)
                .subscribe((res: PortfolioEntry) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.portfolioEntryService.create(this.portfolioEntry)
                .subscribe((res: PortfolioEntry) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: PortfolioEntry) {
        this.eventManager.broadcast({ name: 'portfolioEntryListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-portfolio-entry-popup',
    template: ''
})
export class PortfolioEntryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private portfolioEntryPopupService: PortfolioEntryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.portfolioEntryPopupService
                    .open(PortfolioEntryDialogComponent, params['id']);
            } else {
                this.modalRef = this.portfolioEntryPopupService
                    .open(PortfolioEntryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
