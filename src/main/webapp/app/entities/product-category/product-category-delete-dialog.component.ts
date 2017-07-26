import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EventManager, JhiLanguageService} from "ng-jhipster";

import {ProductCategory} from "./product-category.model";
import {ProductCategoryPopupService} from "./product-category-popup.service";
import {ProductCategoryService} from "./product-category.service";

@Component({
    selector: 'jhi-product-category-delete-dialog',
    templateUrl: './product-category-delete-dialog.component.html'
})
export class ProductCategoryDeleteDialogComponent {

    productCategory: ProductCategory;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private productCategoryService: ProductCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['productCategory']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.productCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productCategoryListModification',
                content: 'Deleted an productCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-category-delete-popup',
    template: ''
})
export class ProductCategoryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private productCategoryPopupService: ProductCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.productCategoryPopupService
                .open(ProductCategoryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
