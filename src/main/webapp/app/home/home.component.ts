import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlertService, EventManager, JhiLanguageService} from "ng-jhipster";
import {Account, LoginModalService, Principal} from "../shared";
import {ProductService} from "../entities/product/product.service";
import {ProductCategory, ProductCategoryWithProducts} from "../entities/product-category/product-category.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DOCUMENT, DomSanitizer} from "@angular/platform-browser";
import {Observable, Subject, Subscription} from "rxjs";
import {UserOrder} from "../entities/user-order/user-order.model";
import {UserOrderService} from "../entities/user-order/user-order.service";
import {ActivatedRoute} from "@angular/router";

import "fullpage.js/dist/jquery.fullpage.js";
import {PortfolioComponent} from "../portfolio/portfolio-cards-grid-component/portfolio.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import {LampsComponent, scrollElasticX} from "./lapm-component/lamps.component";
import {Product} from "../entities/product/product.model";
import {Page} from "../shared/page.model";

const numberOfPages = 5;
const scrollMaxDuration = 7000;
export const widthOfServiceCard = 300; //px
enum PagesNames{
    firsPage, secondPage, thirdPage
}
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
    showMobileNavbar = false;
    parallaxScrollSubscription: Subscription;
    navbarPositionY: any;
    navbarPosition = 'relative';
    windowScrollSubscription: Subscription;

    account: Account;
    modalRef: NgbModalRef;
    categories: ProductCategory[] = [];
    categoryTabIndex = 0;
    numberOfServicesDisplayed = 3;


    widthOfPortfolioCard = 200;
    numberOfPortfolioCols = 3;
    portfolio: Array<UserOrder>;

    @ViewChild('portfolioElRef')
    portfolioElRef: PortfolioComponent;

    @ViewChild('lampsComponentElementRef')
    lampsComponentElementRef: LampsComponent;

    @ViewChild('navbarElementRef')
    navbarElementRef: ElementRef;

    @ViewChild('whyUsElement')
    whyUsElement: ElementRef;

    @ViewChild('servicesElementRef')
    servicesElementRef: ElementRef;

    @ViewChild('servicesElementRef')
    productsEl: ElementRef;

    @ViewChild('navbarComponentElRef')
    navbarComponentElRef: NavbarComponent;

    /*@ViewChild('productWindowEl')
     productWindowEl: ElementRef;*/

    @ViewChild('portfolioWindowEl')
    portfolioWindowEl: ElementRef;

    @ViewChild('parallaxStripsElRef')
    parallaxStripsElRef: ElementRef;

    perPxlScrollStripsParalllax: number;

    private windowResizeSubscription: Subscription;
    private portfolioOffsetsY: number;

    lampsRun = true;

    @ViewChild('portfolioWrapperEl')
    portfolioWrapperEl: ElementRef;

    @ViewChild('aboutUsWrapperEL')
    aboutUsWrapperEL: ElementRef;

    prodWindowPerPxlChange: number;

    navbarIdentifierPosition = 0;
    navbarPositionSubject = new Subject<number>();

    navbarPositionBreakpoints: Array<number>;

    navbarHeight = window.innerHeight * 0.11;
    perPxlScrollTime: number;
    categoryTabLoading: boolean = false;
    showCategoryRow: Array<boolean>;


    constructor(private jhiLanguageService: JhiLanguageService,
                private principal: Principal,
                @Inject(DOCUMENT) private document: Document,
                private route: ActivatedRoute,
                private loginModalService: LoginModalService,
                private productService: ProductService,
                private eventManager: EventManager,
                private alertService: AlertService,
                private userOrderService: UserOrderService,
                private domSanitizer: DomSanitizer) {
        this.jhiLanguageService.setLocations(['home']);

        let resolvedData = this.route.snapshot.data;
        let categories = <Array<ProductCategory>> resolvedData['categories'].json();
        let firstCategory = <ProductCategoryWithProducts> resolvedData['firstCategory'];
        categories[0].categoryProducts = this.productService.mapProductImageUrls(firstCategory.categoryProductsPage.content, domSanitizer);
        //let indexOfFirst = categories.indexOf(categories.find((category) => category.id === firstCategory.id));
        //delete categories[indexOfFirst];


        this.showCategoryRow = categories.map(this.isCategoryNotEmpty);
        this.categories = [categories[0]];
        this.portfolio = this.userOrderService.parsePortfolio(this.route.snapshot.data['portfolio'].json(), this.domSanitizer);
    }


    ngOnDestroy(): void {
        this.windowResizeSubscription.unsubscribe();
        this.windowScrollSubscription.unsubscribe();
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.onResize();
    }

    ngAfterViewInit(): void {
        this.navbarPositionY = this.navbarElementRef.nativeElement.getBoundingClientRect().top;
        this.portfolioOffsetsY = this.productsEl.nativeElement.getBoundingClientRect().top;

        let body = this.document.body,
            html = this.document.documentElement;

        let documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        let productsOffsetTop = this.servicesElementRef.nativeElement.getBoundingClientRect().top;

        /*let productsHeight = window.innerHeight;
         let productsWindowHeight = window.innerHeight*0.8;
         let prodWindowFinalMargin = -(productsHeight - (productsHeight - productsWindowHeight) / 2);
         let headerHeight = window.innerHeight * 0.1;
         this.prodWindowPerPxlChange = prodWindowFinalMargin / (productsOffsetTop + headerHeight); */

        this.navbarPositionBreakpoints = [
            0,//lamps header
            this.whyUsElement.nativeElement.getBoundingClientRect().top + 20,
            productsOffsetTop,
            this.portfolioWrapperEl.nativeElement.getBoundingClientRect().top,
            this.aboutUsWrapperEL.nativeElement.getBoundingClientRect().top,
            documentHeight
        ];

        this.perPxlScrollTime = scrollMaxDuration / this.navbarPositionBreakpoints[this.navbarPositionBreakpoints.length - 1];


        this.perPxlScrollStripsParalllax = (window.innerHeight * 8) / documentHeight;


        this.windowResizeSubscription = Observable.fromEvent(window, 'resize')
            .subscribe(this.onResize.bind(this));

        let scrollObservable = Observable.fromEvent(window, 'scroll');
        this.windowScrollSubscription = scrollObservable
            .skip(10)
            .subscribe(this.onScroll.bind(this));

        this.parallaxScrollSubscription = scrollObservable
            .subscribe(this.parallaxElements.bind(this));
    }


    onResize() {
        let windowWidth = window.innerWidth;
        let oldNumOfPortfolios = this.numberOfPortfolioCols;
        let newNumOfPortfolios;

        if (windowWidth <= 599) {
            newNumOfPortfolios = 2;
            this.showMobileNavbar = true;
        }

        if (windowWidth > 599) {
            this.showMobileNavbar = false;
            newNumOfPortfolios = Math.floor((windowWidth * 0.9) / this.widthOfPortfolioCard)
        }

        if (oldNumOfPortfolios != newNumOfPortfolios) {
            this.numberOfPortfolioCols = newNumOfPortfolios;
        }
    }

    onScroll(event) {
        if (!this.showMobileNavbar) {
            let viewPointMargin = 70;
            let scrollTop = this.document.body.scrollTop;
            let viewPointPosition = scrollTop + this.navbarHeight + viewPointMargin;

            for (let i = 0; i < this.navbarPositionBreakpoints.length - 1; i++) {
                if (this.navbarPositionBreakpoints[i + 1] > viewPointPosition &&
                    this.navbarPositionBreakpoints[i] <= viewPointPosition) {
                    if (i != this.navbarIdentifierPosition) {
                        this.navbarPositionSubject.next(i);
                        this.navbarIdentifierPosition = i;
                        break;
                    }
                }
            }

            if (scrollTop >= this.navbarPositionY) {
                if (this.lampsRun) {
                    this.lampsComponentElementRef.disableEnableComponent.next(false);
                    this.lampsRun = false;
                }
                this.navbarComponentElRef.toggleFixedState();
            }

            else {
                if (!this.lampsRun) {
                    this.lampsComponentElementRef.disableEnableComponent.next(true);
                    this.lampsRun = true;
                }
                this.navbarComponentElRef.toggleRelativeState();
            }
        }
    }

    isCategoryNotEmpty(category: ProductCategory) {
        return category.categoryProducts && category.categoryProducts !== []
    }

    parallaxElements($event) {
        let scrollTop = this.document.body.scrollTop;
        // this.productWindowEl.nativeElement.style.marginTop = scrollTop * this.prodWindowPerPxlChange + 'px ';
        this.parallaxStripsElRef.nativeElement.style.marginTop = -scrollTop / 1.5 + 'px';
    }

    switchShowCategoryRowTo(index: number) {
        this.showCategoryRow.forEach((val: boolean, i: number) => {
            val = i === index;
        })
    }

    selectActiveTabIndex($event) {
        let newIndex = $event.index;
        let newCategory = this.categories[newIndex];

        if (this.isCategoryNotEmpty(newCategory)) {
            this.categoryTabLoading = true;
            this.loadCategoryProducts(newIndex)
                .subscribe((products: Page<Array<Product>>) => {
                    this.categories[newIndex].categoryProducts = products.content;
                    this.categoryTabLoading = false;
                    this.switchShowCategoryRowTo(newIndex);
                    this.categoryTabIndex = newIndex;
                });
            return false;
        }
        else {
            this.switchShowCategoryRowTo(newIndex);
            this.categoryTabIndex = newIndex;
        }
    }


    loadCategoryProducts(index: number): Observable<Page<Array<Product>>> {
        return this.productService.findByCategoryId(this.categories[index].id, {page: 0});
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

    scrollToPosition(position: number) {
        let finishPageScroll = this.navbarPositionBreakpoints[position] - this.navbarHeight;
        let scrollStart = this.document.body.scrollTop;
        let animationStart = performance.now();
        //true => moving up | false => moving down
        //let direction = scrollStart < finishPageScroll;

        let breakpointsLength = this.navbarPositionBreakpoints.length;

        let easingFunction =
            (position < breakpointsLength - 2) ?
                this.bowEaseIn : this.circ;

        let easingFunctionWithDirection = this.makeEaseOut(easingFunction, scrollElasticX);
        let delta = finishPageScroll - scrollStart;
        let scrollDuration = Math.abs(finishPageScroll - scrollStart) * this.perPxlScrollTime;

        window.requestAnimationFrame(function animateScrollStep(time) {
            let animationPrcnt = (time - animationStart) / scrollDuration;
            if (animationPrcnt <= 1) {
                let increment = easingFunctionWithDirection(animationPrcnt);
                window.scrollTo(0, scrollStart + (increment * delta));
                window.requestAnimationFrame(animateScrollStep);
            }
        })
    }

    bowEaseIn(timeFraction, x) {
        return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
    }

    circ(timeFraction) {
        return timeFraction ** 3;
    }

    makeEaseOut(timing, x?) {
        return function (timeFraction) {
            return 1 - timing(1 - timeFraction, x);
        }
    }
}

