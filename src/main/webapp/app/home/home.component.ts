import {AfterViewInit, Component, HostListener, OnInit} from "@angular/core";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlertService, EventManager, JhiLanguageService} from "ng-jhipster";
import {Response} from "@angular/http";
import {Account, LoginModalService, Principal} from "../shared";
import {ProductService} from "../entities/product/product.service";
import {Product} from "../entities/product/product.model";
import {ProductCategory} from "../entities/product-category/product-category.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ImageService, productSubdirectory} from "../shared/image/image.service";
import {Timer} from "../shared/timer";
import {DomSanitizer} from "@angular/platform-browser";
import {Subject} from "rxjs";
import {sixtyScalar} from "../shared/image/image-size.model";
import {UserOrder} from "../entities/user-order/user-order.model";
import {UserOrderService} from "../entities/user-order/user-order.service";
const shuffleAnimationTime = 600;
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ],
    animations: [trigger('animateCardsGroupShift', [
        state('forward', style({left: '0', opacity: 1})),

        state('backward', style({left: '0', opacity: 1})),

        transition('void => forward', [
            style({left: '-100%', opacity: '0'}),
            animate('600ms')
        ]),

        transition('void => backward', [
            style({left: '100%', opacity: '0'}),
            animate('600ms')
        ]),

        transition('backward=>void', [
            animate('600ms', style({'left': '-100%', 'opacity': '0'}))
        ]),
        transition('forward=>void', [
            animate('600ms', style({'left': '100%', 'opacity': '0'}))
        ])
    ])]
})
export class HomeComponent implements OnInit, AfterViewInit {
    numberOfPortfoliosGroupsDisplaed: any;
    scrollingTimer: Timer;
    orientation = 'none';
    account: Account;
    modalRef: NgbModalRef;
    categories: ProductCategory[] = [];
    activeTabIndex = 0;
    numberOfServicesDisplayed = 2;
    cardsGroups = [];
    leftChevronUrl = require('../../content/images/icons/ic_chevron_left_24px.svg');
    rightChevronUrl = require('../../content/images/icons/ic_chevron_right_24px.svg');
    oneServiceCardSize = 400; //px

    shuffleForwardAnimationSubject: Subject<Array<Product>>;
    shuffleBackwardAnimationSubject: Subject<Array<Product>>;

    portfolioGroups: Array<Array<UserOrder>>;
    portfolioSize: [number] = [4, 3, 4];

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        let windowWidth = event.target.innerWidth;
        let oldNum = this.numberOfServicesDisplayed;
        if (windowWidth <= 599) {
            this.numberOfServicesDisplayed = 1;
        }
        if (windowWidth >= 600 && windowWidth <= 959) {
            this.numberOfServicesDisplayed = Math.floor(windowWidth / this.oneServiceCardSize);
        }
        if (windowWidth >= 960) {
            this.numberOfServicesDisplayed = Math.floor((windowWidth * 0.8) / this.oneServiceCardSize);
        }
        if (oldNum != this.numberOfServicesDisplayed) {
            this.getStartingActiveServices();
        }
    }

    constructor(private jhiLanguageService: JhiLanguageService,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private productService: ProductService,
                private eventManager: EventManager,
                private alertService: AlertService,
                private portfolioService: UserOrderService,
                private domSanitizer: DomSanitizer) {
        this.jhiLanguageService.setLocations(['home']);
        this.shuffleForwardAnimationSubject = new Subject();
        this.shuffleBackwardAnimationSubject = new Subject();
    }


    ngAfterViewInit(): void {
        this.shuffleForwardAnimationSubject
            .throttleTime(shuffleAnimationTime)
            .subscribe(
                () => {
                    let products = this.getNextProducts();
                    this.orientation = 'forward';
                    this.cardsGroups.shift();
                    this.cardsGroups.push(products);
                },
                (error) => {
                    console.log(error);
                });

        this.shuffleBackwardAnimationSubject
            .throttleTime(shuffleAnimationTime)
            .subscribe(
                () => {
                    let products = this.getPreciousProducts();
                    this.orientation = 'backward';
                    this.cardsGroups.pop();
                    this.cardsGroups.unshift(products);
                }
            );
    }


    pauseTimer() {
        this.scrollingTimer.pause();
    }

    resumeTimer() {
        this.scrollingTimer.resume();
    }

    getNextProducts(): Product[] {
        let activeCategoryProducts = this.categories[this.activeTabIndex].categoryProducts;
        let n = this.numberOfServicesDisplayed;
        if (activeCategoryProducts.length > n) {
            let newProductsGroup = [];
            let firstActiveIndex = activeCategoryProducts.indexOf(this.cardsGroups[0][0]);
            let index;
            for (let i = 0; i < n; i++) {
                index = firstActiveIndex + n + i;
                index = index > activeCategoryProducts.length - 1 ?
                    index - activeCategoryProducts.length :
                    index;
                newProductsGroup.push(activeCategoryProducts[index]);
            }
            return newProductsGroup;
        }
    }

    getPreciousProducts(): Product[] {
        let activeCategoryProducts = this.categories[this.activeTabIndex].categoryProducts;
        let n = this.numberOfServicesDisplayed;

        if (activeCategoryProducts.length > n) {
            let newProductsGroup = [];
            let lastActiveIndex = activeCategoryProducts.indexOf(this.cardsGroups[0][n - 1]);
            let index;
            for (let i = n - 1; i >= 0; i--) {
                index = lastActiveIndex - i - n;
                index = index < 0 ?
                    activeCategoryProducts.length + index :
                    index;
                newProductsGroup.push(activeCategoryProducts[index]);
            }
            return newProductsGroup;
        }
    }


    scrollFroward() {
        this.shuffleForwardAnimationSubject.next();
    }

    selectActiveTabIndex($event) {
        this.orientation = 'none';
        this.activeTabIndex = $event.index;
        this.getStartingActiveServices();
    }


    loadAll() {
        this.portfolioService.query().subscribe(
            (res: Response) => {
                let portfolio = <UserOrder[]>res.json();

                let len = portfolio.length;
                let n = this.numberOfPortfoliosGroupsDisplaed;
                let i = 0;
                while (i < len) {
                    let size = Math.ceil((len - i) / n--);
                    this.portfolioGroups.push(portfolio.slice(i, i += size));
                }
            }
        );
        this.productService.query().subscribe(
            (res: Response) => {
                let products = <Product[]> res.json();
                let categories = {};
                products.forEach((product: Product) => {
                    //product.productImageUri = ImageService.getProductImageUri(product.productImageUri);
                    product.productImageUri = ImageService.getImagePathOfSize(
                        productSubdirectory,
                        product.productImageUri,
                        window.innerWidth,
                        sixtyScalar
                    );
                    this.domSanitizer.bypassSecurityTrustUrl(product.productImageUri);
                    let cId = product.productCategory.id;
                    if (!categories[cId]) categories[cId] = product.productCategory;
                    delete product.productCategory;
                    if (!categories[cId].categoryProducts) categories[cId].categoryProducts = [];
                    categories[cId].categoryProducts.push(product);
                });
                for (let category in categories) {
                    this.categories.push(categories[category]);
                }
                this.getStartingActiveServices();
                this.scrollingTimer = new Timer(6000, this.scrollFroward.bind(this));
            },
            (res: Response) => this.onError(res.json())
        );
    }

    getStartingActiveServices() {
        let activeCategory = this.categories[this.activeTabIndex];
        let products = activeCategory.categoryProducts;
        this.cardsGroups = [products.slice(0,
            this.numberOfServicesDisplayed <= products.length ? this.numberOfServicesDisplayed : products.length)];
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }


    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}

