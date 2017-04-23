import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategory } from './product-category.model';
import { ProductCategoryService } from './product-category.service';
@Injectable()
export class ProductCategoryPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private productCategoryService: ProductCategoryService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.productCategoryService.find(id).subscribe(productCategory => {
                this.productCategoryModalRef(component, productCategory);
            });
        } else {
            return this.productCategoryModalRef(component, new ProductCategory());
        }
    }

    productCategoryModalRef(component: Component, productCategory: ProductCategory): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productCategory = productCategory;
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
