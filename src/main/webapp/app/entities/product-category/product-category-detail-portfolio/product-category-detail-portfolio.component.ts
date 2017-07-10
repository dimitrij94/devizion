import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductCategory} from "../product-category.model";
import {UserOrder} from "../../user-order/user-order.model";
import {Subscription} from "rxjs/Subscription";
import {UserOrderService} from "../../user-order/user-order.service";
import {Page} from "../../../shared/page.model";
import {widthOfPortfolioCard} from "../../../home/home.component";
import {DOCUMENT, DomSanitizer} from "@angular/platform-browser";
import {ProductCategoryService} from "../product-category.service";
import {Observable} from "rxjs/Observable";
import {PortfolioComponent} from "../../../portfolio/portfolio-cards-grid-component/portfolio.component";
import {Product} from "../../product/product.model";
import {FormControl} from "@angular/forms";
import {GenericResponse} from "@angular/http/src/static_response";
import {JhiLanguageService} from "ng-jhipster";
@Component({
    selector: 'jhi-product-category-detail-portfolio',
    templateUrl: './product-category-detail-portfolio.component.html',
    styleUrls: ['./product-category-detail-portfolio.component.scss']
})
export class ProductCategoryDetailPortfolioComponent implements OnInit, OnDestroy {
    activeCategoryId: number;
    loadMoreOrdersSubscription: Subscription;
    loading: boolean;
    lastPortfolioPage: number;
    categoryRouteSubscription: Subscription;
    numOfPortfolioCols: number;
    sidenavOpened: boolean;
    routeOrdersSubscription: Subscription;
    productNameQuery: string = '';
    productCategory: ProductCategory;
    categoryPortfolio: UserOrder[];
    allCategories: ProductCategory[];
    initiallyResolvedCategoryParsed: boolean;
    initiallyResolvedPortfolioParsed: boolean;
    uniqueProducts: Product[];
    filteredUniqueProducts: Observable<Product[]>;
    searchControl = new FormControl();
    searchChipsPrefix: Product[] = [];

    nothingToShowAlert = false;
    loadMoreAlert = false;
    showPortfolio = true;

    numberOfFilteredPortfolios: { count: number } = {count: 0};
    totalNumberOfCategoryPortfolios: number;
    docW: number;

    constructor(private route: ActivatedRoute,
                private domSanitizer: DomSanitizer,
                private router: Router,
                private jhiLanguageService: JhiLanguageService,
                @Inject(DOCUMENT) private document: Document,
                private productCategoryService: ProductCategoryService,
                private userOrderService: UserOrderService) {
        this.jhiLanguageService.setLocations(['product']);
    }

    ngOnInit() {
        this.docW = this.document.body.clientWidth;
        PortfolioComponent.hasScrollAppeared = true;
        let routeData = this.route.snapshot.data;

        let categoryPortfolioPage = routeData['categoryPortfolio'].json();
        this.categoryPortfolio = this.parseCategoryOrders(categoryPortfolioPage);

        this.uniqueProducts = this.userOrderService.getUniqueProductsOfOrders(this.categoryPortfolio);

        let category = routeData['category'];
        this.productCategory = this.parseCategory(category);

        this.allCategories = routeData['allCategories'].json();


        this.routeOrdersSubscription = this.route.params.switchMap((params: Params) => {
            let id = params['id'];
            if (id != this.productCategory.id) {
                this.initiallyResolvedPortfolioParsed = false;
                return this.userOrderService.findOrdersOfCategory(id)
                    .map((res) => res.json());
            }
            else {
                this.initiallyResolvedPortfolioParsed = true;
                return Promise.resolve(categoryPortfolioPage);
            }
        })
            .subscribe(
                (userOrdersPage: Page<UserOrder>) => {
                    if (!this.initiallyResolvedPortfolioParsed) {
                        this.searchChipsPrefix = [];
                        this.categoryPortfolio = this.parseCategoryOrders(userOrdersPage);
                        this.uniqueProducts = this.userOrderService.getUniqueProductsOfOrders(this.categoryPortfolio);
                    }
                });

        this.categoryRouteSubscription = this.route.params.switchMap((params: Params) => {
            let id = params['id'];
            if (id != this.productCategory.id) {
                this.initiallyResolvedCategoryParsed = false;
                return this.productCategoryService.find(id);
            }
            else {
                this.initiallyResolvedCategoryParsed = true;
                return Promise.resolve(category);
            }
        })
            .subscribe((category: ProductCategory) => {
                if (!this.initiallyResolvedCategoryParsed)
                    this.productCategory = this.parseCategory(category);
            });

        this.filteredUniqueProducts = this.searchControl
            .valueChanges
            .startWith(null)
            .map((val) => val ? this.filterAutocompleteProducts(val) : this.uniqueProducts.slice());

        this.activeCategoryId = this.productCategory.id;
    }


    onAutocompleteSelectionChange(product: Product) {
        this.searchChipsPrefix = this.searchChipsPrefix.concat([product]);
        this.uniqueProducts = this.uniqueProducts.filter((val) => val.id != product.id);
        this.searchControl.setValue('');
    }

    filterAutocompleteProducts(query: string) {
        return this.uniqueProducts.filter((product: Product) => product.productName.indexOf(query) != -1);
    }

    deleteChip(product: Product) {
        this.searchChipsPrefix = this.searchChipsPrefix.filter((chipProd) => chipProd.id != product.id);
        this.uniqueProducts.push(product);
    }

    ngOnDestroy(): void {
        this.categoryRouteSubscription && this.categoryRouteSubscription.unsubscribe();
        this.routeOrdersSubscription && this.routeOrdersSubscription.unsubscribe();
        this.loadMoreOrdersSubscription && this.loadMoreOrdersSubscription.unsubscribe();
    }

    changeCategory(categoryId: number) {
        this.router.navigate(['/product-category/portfolio', categoryId]);
    }

    toggleNothingToShowAlert(show = true) {
        this.nothingToShowAlert = show;
        this.loadMoreAlert = !show;
        this.showPortfolio = !show;
    }


    toggleShowPortfolio(show = true) {
        this.showPortfolio = show;
        this.nothingToShowAlert = !show;
    }


    parseCategoryOrders(userOrdersPage: Page<UserOrder>) {
        this.totalNumberOfCategoryPortfolios = userOrdersPage.totalElements;
        this.numberOfFilteredPortfolios.count = this.totalNumberOfCategoryPortfolios;
        //if product has no orders show nothing to show alert
        if (userOrdersPage.totalElements == 0) {
            this.toggleNothingToShowAlert();
            return [];
        }
        else {
            this.lastPortfolioPage = userOrdersPage.number;
            this.toggleShowPortfolio();
            //if page is not last show load more toggle
            this.loadMoreAlert = !userOrdersPage.last;
            let orderedProducts = userOrdersPage.content;
            this.numOfPortfolioCols = this.getOptimalNumberOfPortfolioCols();
            this.userOrderService
                .parsePortfolioCroppedImages(orderedProducts, this.domSanitizer, (100 / this.numOfPortfolioCols) / 100);

            return orderedProducts;
        }
    }

    nextPage() {
        this.lastPortfolioPage += 1;
        this.loadOrders(this.lastPortfolioPage);
    }

    previousPage() {
        this.lastPortfolioPage -= 1;
        this.loadOrders(this.lastPortfolioPage);
    }

    loadOrders(page: number) {
        this.loading = true;
        this.loadMoreOrdersSubscription = this.userOrderService
            .findOrdersOfCategory(this.productCategory.id, page)
            .subscribe((res: GenericResponse<Page<UserOrder>>) => {
                if (res.status === 200) {
                    let page = res.json();
                    this.loadMoreAlert = !page.last;
                    this.loading = false;
                    this.categoryPortfolio = this.parseCategoryOrders(page);
                }
            });
    }

    parseCategory(newCategory: ProductCategory): ProductCategory {
        //newCategory.categoryPhotoUri = this.productCategoryService.parsePhotoUrl(newCategory.categoryPhotoUri, 300 / this.docW, this.docW, this.domSanitizer);
        newCategory.categoryPhotoUri = this.productCategoryService
            .parsePhotoUrl(newCategory.categoryPhotoUri, this.domSanitizer, 1.0, 300);

        return newCategory;
    }

    getOptimalNumberOfPortfolioCols() {
        this.docW = this.document.body.clientWidth;
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

}
