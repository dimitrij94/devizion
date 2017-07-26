import {Component, HostListener, Inject, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {EventManager, JhiLanguageService} from "ng-jhipster";

import {Product, ProductWithPortfolio} from "./product.model";
import {ProductService} from "./product.service";
import {AuthServerProvider} from "../../shared/auth/auth-jwt.service";
import {DOCUMENT, DomSanitizer} from "@angular/platform-browser";
import {ProductCategory} from "../product-category/product-category.model";
import {UserOrderService} from "../user-order/user-order.service";
import {widthOfPortfolioCard} from "../../home/home.component";
import {PortfolioComponent} from "../../portfolio/portfolio-cards-grid-component/portfolio.component";
import {UserOrder} from "../user-order/user-order.model";
import {Page} from "../../shared/page.model";

import {GenericResponse} from "../../app.module";
@Component({
    selector: 'jhi-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']

})
export class ProductDetailComponent implements OnInit, OnDestroy {
    loadMoreOrdersSubscription: Subscription;
    sidenavOpened: boolean;
    product: Product;
    subscription: any;
    eventSubscriber: Subscription;
    allCategories: ProductCategory[];
    numberOfPortfolioCards: number;
    routeParamsSubscription: Subscription;
    portfolioGridTitle: string;
    searchQuery: string = '';

    showPortfolio: boolean;
    isNothingToLoad: boolean;
    loadMoreAlert: boolean;
    lastPage: number = 0;
    docW: number;
    loading: boolean = false;

    constructor(private eventManager: EventManager,
                private jhiLanguageService: JhiLanguageService,
                private productService: ProductService,
                private route: ActivatedRoute,
                @Inject(DOCUMENT) private document: Document,
                private domSanitizer: DomSanitizer,
                private userOrderService: UserOrderService,
                private authServiceProvider: AuthServerProvider) {
        this.jhiLanguageService.setLocations(['product']);

    }

    ngOnInit() {
        this.docW = this.document.body.clientWidth;
        PortfolioComponent.hasScrollAppeared = true;
        let data = this.route.snapshot.data;
        this.allCategories = data['allCategories'].json();
        let product = <ProductWithPortfolio> data['product'].json();

        this.parseProduct(product);
        this.product = product;

        this.routeParamsSubscription = this.route.params
            .switchMap((params: Params) => {
                return this.productService.findWithProductPortfolio(params['id'])
                    .map((res) => res.json());
            })
            .subscribe((product: ProductWithPortfolio) => {
                this.parseProduct(product);
                this.product = product;
            });
    }

    ngOnDestroy() {
        this.routeParamsSubscription.unsubscribe();
        if (this.loadMoreOrdersSubscription) this.loadMoreOrdersSubscription.unsubscribe();
        //this.eventManager.destroy(this.eventSubscriber);
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.numberOfPortfolioCards = this.getOptimalNumberOfPortfolioCols();
    }

    loadMoreOrders() {
        this.lastPage += 1;
        this.loading = true;
        this.loadMoreOrdersSubscription = this.userOrderService
            .findOrdersOfProduct(this.product.id, this.lastPage)
            .subscribe((res: GenericResponse<Page<UserOrder>>) => {
                if (res.status === 200) {
                    let page = res.json();
                    this.loadMoreAlert = !page.last;
                    this.loading = false;
                    let newPortfolio = this.product.orderedProduct.concat(this.parseProductOrders(page));
                    this.product.orderedProduct = newPortfolio;
                }
            })
    }

    parseProduct(product: ProductWithPortfolio) {
        this.portfolioGridTitle = product.productName;
        this.productService.parseProductCroppedImageUrls([product], this.domSanitizer, 300 / this.docW);
        product.orderedProduct = this.parseProductOrders(product.categoryProductsPage);
    }

    parseProductOrders(userOrdersPage: Page<UserOrder>) {
        //if product has no orders show nothing to show alert
        if (userOrdersPage.totalElements == 0) {
            this.showNothingToShowAlert();
        }
        else {
            this.toggleShowPortfolio();
            //if page is not last show load more toggle
            if (!userOrdersPage.last) this.loadMoreAlert = true;
            let orderedProducts = userOrdersPage.content;
            this.optimizePortfolioSize(orderedProducts);
            this.userOrderService.parsePortfolioModalImages(orderedProducts);
            this.userOrderService
                .parsePortfolioCroppedImages(orderedProducts, this.domSanitizer, (100 / this.numberOfPortfolioCards) / 100);

            return orderedProducts;
        }
    }

    optimizePortfolioSize(orders: UserOrder[]) {
        let numberOfOrders = orders.length;
        let optimalnumberOfCols = this.getOptimalNumberOfPortfolioCols();
        this.numberOfPortfolioCards = optimalnumberOfCols;
    }

    showNothingToShowAlert() {
        this.showPortfolio = false;
        this.loadMoreAlert = false;
        this.isNothingToLoad = true;
    }

    toggleShowPortfolio() {
        this.showPortfolio = true;
        this.isNothingToLoad = false;
    }


    getOptimalNumberOfPortfolioCols() {
        this.sidenavOpened = this.docW >= 1015;
        let returnValue;
        let vw = this.sidenavOpened ? this.docW - 300 : this.docW;
        if (vw <= 599) {
            returnValue = 2;
        }

        if (vw > 599) {
            returnValue = Math.floor((vw * 0.9) / widthOfPortfolioCard);
        }
        return returnValue;
    }

    load(id) {
        this.productService.find(id).subscribe(product => {
            this.product = product;
        });
    }

    previousState() {
        window.history.back();
    }


    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe('productListModification', response => this.load(this.product.id));
    }

}
