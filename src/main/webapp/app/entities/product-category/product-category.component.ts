import {Component, OnDestroy, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Subscription} from 'rxjs/Rx';
import {AlertService, EventManager, JhiLanguageService} from 'ng-jhipster';
import {ProductCategory} from './product-category.model';
import {ProductCategoryService} from './product-category.service';
import {Principal} from '../../shared';
import {ImageService} from '../../shared/image.service';

@Component({
    selector: 'jhi-product-category',
    templateUrl: './product-category.component.html',
    styleUrls:['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
    productCategories: ProductCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private jhiLanguageService: JhiLanguageService,
                private productCategoryService: ProductCategoryService,
                private alertService: AlertService,
                private eventManager: EventManager,
                private principal: Principal) {
        this.jhiLanguageService.setLocations(['productCategory']);
    }

    loadAll() {
        this.productCategoryService.query().subscribe(
            (res: Response) => {
                let productCategories = <ProductCategory[]> res.json();
                productCategories.forEach((productCategory)=> {
                    productCategory.categoryPhotoUri = ImageService.getCategoryImage(productCategory.categoryPhotoUri);
                });
                this.productCategories = productCategories;
            },
            (res: Response) => this.onError(res.json())
        );
    }


    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProductCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductCategory) {
        return item.id;
    }


    registerChangeInProductCategories() {
        this.eventSubscriber = this.eventManager.subscribe('productCategoryListModification', (response) => this.loadAll());
    }


    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
