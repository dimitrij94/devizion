import {Component, OnDestroy, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Subscription} from 'rxjs/Rx';
import {AlertService, EventManager, JhiLanguageService} from 'ng-jhipster';

import {Product} from './product.model';
import {ProductService} from './product.service';
import {Principal} from '../../shared';
import {ImageService} from '../../shared/image.service';

@Component({
    selector: 'jhi-product',
    templateUrl: './product.component.html',
    styleUrls:['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
    products: Product[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private jhiLanguageService: JhiLanguageService,
                private productService: ProductService,
                private alertService: AlertService,
                private eventManager: EventManager,
                private principal: Principal) {
        this.jhiLanguageService.setLocations(['product']);
    }

    loadAll() {
        let directory = '/content/images/products';
        this.productService.query().subscribe(
            (res: Response) => {
                let products = <Product[]> res.json();
                products.forEach((product)=>{
                    product.productImageUri = ImageService.getProductImageUri(product.productImageUri);
                });
                this.products = products;
            },
            (res: Response) => this.onError(res.json())
        );
    }


    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Product) {
        return item.id;
    }


    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe('productListModification', (response) => this.loadAll());
    }


    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
