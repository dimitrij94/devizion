import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {EventManager, JhiLanguageService} from "ng-jhipster";

import {ProductCategory, ProductCategoryWithProducts} from "./product-category.model";
import {ProductCategoryService} from "./product-category.service";
import {ProductService} from "../product/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Product} from "../product/product.model";
import {MdSliderChange} from "@angular/material";
import {Page} from "../../shared/page.model";

@Component({
    selector: 'jhi-product-category-detail',
    templateUrl: './product-category-detail.component.html',
    styleUrls: ['./product-category-detail.component.scss']
})
export class ProductCategoryDetailComponent implements OnInit, OnDestroy {
    productCategory: ProductCategoryWithProducts;
    eventSubscriber: Subscription;

    isActiveCategoryProductsPageParsed = false;
    minPrice: number;
    maxPrice: number;
    selectedMinPrice: number = 1;
    selectedMaxPrice: number = 1000000000;
    searchQuery: string = '';
    allCategories: ProductCategory[];
    activeCategoryId: number;

    categoryPhotoUrl: string;
    totalNumberOfCategoryProducts: number;
    numberOfFilteredProducts: { count: number } = {count: 0};

    loadMoreAlert: boolean;
    nothingToShowAlert: boolean;
    lastPageNumber: number = 0;
    loadMoreProductsSubscription: Subscription;

    productsLoading = false;

    constructor(private eventManager: EventManager,
                private router: Router,
                private jhiLanguageService: JhiLanguageService,
                private productCategoryService: ProductCategoryService,
                private productService: ProductService,
                private domSanitizer: DomSanitizer,
                private route: ActivatedRoute) {
        this.jhiLanguageService.setLocations(['productCategory']);
    }

    ngOnInit() {

        let data = this.route.snapshot.data;
        let productCategory = <ProductCategoryWithProducts>data['category'];
        this.allCategories = data['allCategories'].json();
        productCategory = this.parseNewCategory(productCategory);
        this.productCategory = productCategory;
        this.isActiveCategoryProductsPageParsed = true;
        //this.registerChangeInProductCategories();

        this.route.params.switchMap((params: Params) => {
            let id = params['id'];
            if (id != this.productCategory.id) {
                this.isActiveCategoryProductsPageParsed = false;
                return this.productCategoryService.findWithProducts(id);
            }
            else return Promise.resolve(this.productCategory);
        }).subscribe((category: ProductCategoryWithProducts) => {
            let newCategory = category;
            if (!this.isActiveCategoryProductsPageParsed) {
                newCategory = this.parseNewCategory(newCategory);
                this.isActiveCategoryProductsPageParsed = true;
                this.findMinAndMaxPrices(newCategory.categoryProducts);
            }
            this.productCategory = newCategory;
        });

        this.findMinAndMaxPrices(this.productCategory.categoryProducts);

        this.activeCategoryId = this.productCategory.id;
    }

    ngOnDestroy() {
        //if (this.eventSubscriber) this.eventManager.destroy(this.eventSubscriber);
        this.loadMoreProductsSubscription && this.loadMoreProductsSubscription.unsubscribe();
    }


    getNumberOfCardsDisplayed() {
        let vw = window.innerWidth;
        if (vw <= 599)
            return 1;
        if (vw <= 959)
            return 2;
        if (vw <= 1921)
            return 3;
        if (vw > 1921)
            return 4;
    }

    findMinAndMaxPrices(categoryProducts: Product[]) {
        let maxPrice = categoryProducts[0].productPrice;
        let minPrice = 0;
        for (let i = 0; i < categoryProducts.length; i++) {
            let productPrice = categoryProducts[i].productPrice;
            if (productPrice < minPrice) minPrice = productPrice;
            if (productPrice > maxPrice) maxPrice = productPrice;
        }

        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.minPrice = 0;
        this.selectedMaxPrice = this.maxPrice;
    }

    maxPriceChanged($event: MdSliderChange) {
        this.selectedMaxPrice = $event.value;
    }

    minPriceChanged($event: MdSliderChange) {
        this.selectedMinPrice = $event.value;
    }


    load(id) {
        this.productCategoryService
            .findWithProducts(id).subscribe(productCategory => {
            this.productCategory = productCategory;
        });
    }

    changeCategory(categoryId: number) {
        this.router.navigate(['/product-category', categoryId]);
    }

    previousState() {
        window.history.back();
    }


    registerChangeInProductCategories() {
        this.eventSubscriber = this.eventManager.subscribe('productCategoryListModification', response => this.load(this.productCategory.id));
    }

    loadMoreProducts() {
        if (this.productsLoading) return;
        this.productsLoading = true;
        this.lastPageNumber += 1;
        this.loadMoreProductsSubscription = this.productService.findByCategoryId(this.productCategory.id, this.lastPageNumber, 1)
            .subscribe((newProductsPage: Page<Product>) => {
                let parsedProducts =
                    this.productCategory.categoryProducts.concat(this.parseCategoryProducts(newProductsPage));
                this.findMinAndMaxPrices(parsedProducts);
                this.productCategory.categoryProducts = parsedProducts;
                this.productsLoading = false;
            });
    }

    parseNewCategory(newCategory: ProductCategoryWithProducts): ProductCategoryWithProducts {
        //newCategory.categoryPhotoUri = this.productCategoryService.parsePhotoUrl(newCategory.categoryPhotoUri, 300 / window.innerWidth, window.innerWidth, this.domSanitizer);
        newCategory.categoryPhotoUri = this.productCategoryService
            .parsePhotoUrl(newCategory.categoryPhotoUri, this.domSanitizer, 1.0, 300);
        //this.categoryPhotoUrl = `url(${newCategory.categoryPhotoUri}) center center`;
        newCategory.categoryProducts = this.parseCategoryProducts(newCategory.categoryProductsPage);
        return newCategory;
    }

    parseCategoryProducts(categoryPage: Page<Product>) {
        this.nothingToShowAlert = categoryPage.totalElements === 0;
        this.loadMoreAlert = !categoryPage.last;
        this.lastPageNumber = categoryPage.number;
        this.totalNumberOfCategoryProducts = categoryPage.totalElements;
        return this.productService.parseProductCroppedImageUrls(
            categoryPage.content,
            this.domSanitizer,
            (100 / this.getNumberOfCardsDisplayed()) / 100
        );
    }
}
