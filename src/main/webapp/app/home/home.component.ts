import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Inject,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlertService, EventManager, JhiLanguageService} from "ng-jhipster";
import {Account, LoginModalService, Principal} from "../shared";
import {ProductService} from "../entities/product/product.service";
import {ProductCategory, ProductCategoryWithProducts} from "../entities/product-category/product-category.model";
import {DOCUMENT, DomSanitizer} from "@angular/platform-browser";
import {Observable, Subject} from "rxjs";
import {UserOrder} from "../entities/user-order/user-order.model";
import {UserOrderService} from "../entities/user-order/user-order.service";
import {ActivatedRoute} from "@angular/router";
import {PortfolioComponent} from "../portfolio/portfolio-cards-grid-component/portfolio.component";
import {LampsComponent, scrollElasticX} from "./lapm-component/lamps.component";
import {Product} from "../entities/product/product.model";
import {Page} from "../shared/page.model";

const numberOfPages = 5;
const scrollMaxDuration = 7000;
export const widthOfServiceCard = 300; //px
export const widthOfPortfolioCard = 200;
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
    numberOfServices: number;
    showMobileNavbar = false;
    navbarPositionY: any;

    account: Account;
    modalRef: NgbModalRef;
    categories: ProductCategory[] = [];
    categoryTabIndex = 1;


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

    @ViewChild('portfolioWindowEl')
    portfolioWindowEl: ElementRef;

    parallaxStripsStyle: { marginTop?: string } = {};

    perPxlScrollStripsParalllax: number;

    lampsRun = true;

    @ViewChild('portfolioWrapperEl')
    portfolioWrapperEl: ElementRef;

    @ViewChild('aboutUsWrapperEL')
    aboutUsWrapperEL: ElementRef;


    navbarIdentifierPosition = 0;
    navbarPositionSubject = new Subject<number>();

    navbarPositionBreakpoints: Array<number>;

    navbarHeight = window.innerHeight * 0.11;
    perPxlScrollTime: number;
    categoryTabLoading: boolean = false;
    showCategoryRow: Array<boolean>;
    nextServicesTabIndex: number;
    isNavbarTransparent = true;
    isNavbarLogoShown = false;
    isNavbarFixed = false;

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
        this.onResize();

    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        let resolvedData = this.route.snapshot.data;

        this.portfolio = this.userOrderService
            .parsePortfolioCroppedImages(resolvedData['portfolio'].json(),
                this.domSanitizer,
                (100 / this.numberOfPortfolioCols) / 100);

        let categories = <Array<ProductCategory>> resolvedData['categories'].json();
        let firstCategory = <ProductCategoryWithProducts> resolvedData['firstCategory'];
        firstCategory.categoryProducts = this.parseLoadedProducts(firstCategory.categoryProductsPage);
        categories[0] = firstCategory;
        this.showCategoryRow = categories.map(this.isCategoryNotEmpty);
        this.categories = categories;
    }

    ngAfterViewInit(): void {

        this.navbarPositionY = this.navbarElementRef.nativeElement.getBoundingClientRect().top;

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


    }

    @HostListener('window:resize', ['$event'])
    onResize($event?: any) {
        let windowWidth = window.innerWidth;
        let oldNumOfPortfolios = this.numberOfPortfolioCols;
        let newNumOfPortfolios;

        let oldNumOfServices = this.numberOfServices;
        let newNumOfServices;

        if (windowWidth <= 599) {
            newNumOfServices = 1;
            newNumOfPortfolios = 2;
            this.showMobileNavbar = true;
        }

        if (windowWidth > 599) {
            newNumOfServices = Math.floor((windowWidth * 0.95) / widthOfServiceCard);
            newNumOfPortfolios = Math.floor((windowWidth * 0.9) / widthOfPortfolioCard);
            this.showMobileNavbar = false;
        }

        if (oldNumOfPortfolios != newNumOfPortfolios) {
            this.numberOfPortfolioCols = newNumOfPortfolios;
        }

        if (oldNumOfServices != newNumOfServices) {
            this.numberOfServices = newNumOfServices;
        }
    }

    @HostListener('window:scroll', ['$event'])
    onScroll($event) {
        let scrollTop = this.document.body.scrollTop;
        this.parallaxStrips(scrollTop);
        if (!this.showMobileNavbar) {
            let viewPointMargin = 70;
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

                    this.isNavbarLogoShown = true;
                    this.isNavbarFixed = true;
                    this.isNavbarTransparent = false;
                }
            }

            else {
                if (!this.lampsRun) {
                    this.lampsComponentElementRef.disableEnableComponent.next(true);
                    this.lampsRun = true;

                    this.isNavbarLogoShown = false;
                    this.isNavbarFixed = false;
                    this.isNavbarTransparent = true;
                }
            }
        }
    }

    parallaxStrips(scrollTop) {
        // this.productWindowEl.nativeElement.style.marginTop = scrollTop * this.prodWindowPerPxlChange + 'px ';
        window.requestAnimationFrame((function () {
            this.parallaxStripsStyle.marginTop = -scrollTop / 1.5 + 'px';
        }).bind(this));
    }

    isCategoryNotEmpty(category: ProductCategory): boolean {
        return category.categoryProducts != null && category.categoryProducts !== []
    }

    parseLoadedProducts(productsPage: Page<Product>): Product[] {
        return this.productService.parseProductCroppedImageUrls(productsPage.content, this.domSanitizer, (100 / this.numberOfServices) / 100);
    }


    switchShowCategoryRowTo(index: number) {
        let row = this.showCategoryRow;
        for (let i = 0; i < row.length; i++) {
            row[i] = this.isCategoryNotEmpty(this.categories[i]);
        }
    }

    selectActiveTabIndex($event) {
        let newIndex = $event.index;
        let newCategory = this.categories[newIndex];

        if (!this.isCategoryNotEmpty(newCategory)) {
            this.categoryTabLoading = true;
            this.loadCategoryProducts(newIndex)
                .subscribe((products: Page<Product>) => {
                    this.categories[newIndex].categoryProducts = this.parseLoadedProducts(products);
                    this.switchShowCategoryRowTo(newIndex);
                    this.nextServicesTabIndex = newIndex;
                });
        }
        else {
            this.switchShowCategoryRowTo(newIndex);
            this.categoryTabIndex = newIndex;
        }
        return false;
    }

    productsRowLoaded(index: number) {
        this.showCategoryRow[index] = true;
        this.categoryTabIndex = this.nextServicesTabIndex;
        this.categoryTabLoading = false;
    }


    loadCategoryProducts(index: number): Observable<Page<Product>> {
        return this.productService.findByCategoryId(this.categories[index].id, 0);
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

