import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { ProductCategory } from './product-category.model';
import { ProductCategoryService } from './product-category.service';

@Component({
    selector: 'jhi-product-category-detail',
    templateUrl: './product-category-detail.component.html'
})
export class ProductCategoryDetailComponent implements OnInit, OnDestroy {

    productCategory: ProductCategory;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private productCategoryService: ProductCategoryService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['productCategory']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInProductCategories();
    }

    load (id) {
        this.productCategoryService.find(id).subscribe(productCategory => {
            this.productCategory = productCategory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductCategories() {
        this.eventSubscriber = this.eventManager.subscribe('productCategoryListModification', response => this.load(this.productCategory.id));
    }

}
