import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EventManager, AlertService, JhiLanguageService} from 'ng-jhipster';

import {ProductCategory} from './product-category.model';
import {ProductCategoryPopupService} from './product-category-popup.service';
import {ProductCategoryService} from './product-category.service';
import {AuthServerProvider} from "../../shared/auth/auth-jwt.service";

@Component({
    selector: 'jhi-product-category-dialog',
    templateUrl: './product-category-dialog.component.html'
})
export class ProductCategoryDialogComponent implements OnInit {

    productCategory: ProductCategory;
    authorities: any[];
    isSaving: boolean;
    imageToken = {};

    constructor(public activeModal: NgbActiveModal,
                private jhiLanguageService: JhiLanguageService,
                private alertService: AlertService,
                private productCategoryService: ProductCategoryService,
                private eventManager: EventManager,
                private authServiceProvider: AuthServerProvider) {
        this.jhiLanguageService.setLocations(['productCategory']);
    }

    onLoad($event) {
        if ($event.serverResponse.status == 200) {
            let imageToken = JSON.parse($event.serverResponse.response);
            this.productCategory.categoryPhotoUri = imageToken.path;
            this.imageToken[$event.file.name] = imageToken;
        }
        else
            this.onError($event.serverResponse.json());
    }

    onRemove($event) {
        this.productCategoryService
            .categoryImageUploadCancel(this.imageToken[$event.file.name].id)
            .subscribe(() => {
                delete this.imageToken[$event.file.name];
            });
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productCategory.id !== undefined) {
            this.productCategoryService.update(this.productCategory)
                .subscribe((res: ProductCategory) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.productCategoryService.create(this.productCategory)
                .subscribe((res: ProductCategory) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ProductCategory) {
        this.eventManager.broadcast({name: 'productCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-product-category-popup',
    template: ''
})
export class ProductCategoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(private route: ActivatedRoute,
                private productCategoryPopupService: ProductCategoryPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.modalRef = this.productCategoryPopupService
                    .open(ProductCategoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.productCategoryPopupService
                    .open(ProductCategoryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
