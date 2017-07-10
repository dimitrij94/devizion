/*
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Product} from "../../entities/product/product.model";
import {Account, LoginModalService, Principal} from "../shared";
import {ProductService} from "../entities/product/product.service";
import {ProductCategory} from "../entities/product-category/product-category.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Subject} from "rxjs";
import {UserOrder} from "../entities/user-order/user-order.model";
import {UserOrderService} from "../entities/user-order/user-order.service";

import "fullpage.js/dist/jquery.fullpage.js";
import {PortfolioComponent} from "../portfolio/portfolio-cards-grid-component/portfolio.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import {LampsComponent, scrollElasticX} from "./lapm-component/lamps.component";
const shuffleAnimationTime = 600;
/**
 * Created by Dmitrij on 14.06.2017.
 */
/*
@Component({
    selector: 'jhi-home',
    templateUrl: './old-services-row.html',
    styleUrls: [
    ],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('animateCardsGroupShift', [
            state('forward', style({})),
            state('backward', style({})),

            transition('void => forward', [
                style({left: '100%', opacity: '0'}),
                animate('6000ms ease-in-out', style({left: '0%', opacity: 1}))
            ]),
            transition('forward => void', [
                style({left: '0%', opacity: '1'}),
                animate('6000ms ease-in-out', style({left: '-100%', 'opacity': '0'}))
            ]),

            transition('void => backward', [
                style({left: '-100%', opacity: '0'}),
                animate('6000ms ease-in-out', style({left: '0%', opacity: '1'}),)
            ]),
            transition('backward => void', [
                style({left: '0%', opacity: '1'}),
                animate('6000ms ease-in-out', style({left: '100%', 'opacity': '0'}))
            ]),
        ])
    ]
})
export class Old implements OnInit {
    shuffleForwardAnimationSubject: Subject<Array<Product>>;
    shuffleBackwardAnimationSubject: Subject<Array<Product>>;

    cardsGroups = [];

    constructor() {

    }


    ngOnInit(): void {
        this.shuffleForwardAnimationSubject
            .throttleTime(shuffleAnimationTime)
            .subscribe(
                () => {
                    this.orientation = 'forward';
                    let products = this.getNextProducts();
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
                    this.orientation = 'backward';
                    this.changeDetector.detectChanges();
                    let products = this.getPreciousProducts();
                    this.cardsGroups.pop();
                    this.cardsGroups.unshift(products);
                }
            );
    }

    loadAll() {
        this.userOrderService.query().subscribe(
            (res: Response) => {
                this.portfolio = <UserOrder[]> res.json();
            }
        );

        this.productService.query().subscribe(
            (res: Response) => {
                let products = <Product[]> res.json();
                let categories = {};
                products.forEach((product: Product) => {
                    //product.productImageUri = ImageService.getProductImageUri(product.productImageUri);
                    product.productImageUri = MyImageService.getImagePathOfSize(
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
                this.onResize();
                this.scrollingTimer = new Timer(6000, this.scrollFroward.bind(this));
            },
            (res: Response) => this.onError(res.json())
        );
    }

    getNextProducts(): Product[] {
        let activeCategoryProducts = this.categories[this.activeTabIndex].categoryProducts;
        let n = this.numberOfServicesDisplayed;
        let newProductsGroup = [];
        let firstActiveIndex = activeCategoryProducts.indexOf(this.cardsGroups[0][0]);
        let index;
        for (let i = 0; i < n; i++) {
            index = firstActiveIndex + n + i;
            index = index > activeCategoryProducts.length - 1 ?
                index % activeCategoryProducts.length :
                index;
            newProductsGroup.push(activeCategoryProducts[index]);
        }
        return newProductsGroup;
    }

    scrollFroward() {
        this.shuffleForwardAnimationSubject.next();
    }

    getPreciousProducts(): Product[] {
        let activeCategoryProducts = this.categories[this.activeTabIndex].categoryProducts;
        let n = this.numberOfServicesDisplayed;

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

    getStartingActiveServices() {
        let activeCategory = this.categories[this.activeTabIndex];
        let products = activeCategory.categoryProducts;
        let selectedProducts = [];
        let index = 0;
        for (let i = 0; i < this.numberOfServicesDisplayed; i++) {
            index = i > products.length ? i % products.length : i;
            selectedProducts.push(products[index]);
        }
        this.cardsGroups = [selectedProducts];
    }


    selectActiveTabIndex($event) {
        this.orientation = 'none';
        this.activeTabIndex = $event.index;
        this.getStartingActiveServices();
    }

    /*
     onPageLeave(index: any, nextIndex: any, direction: any) {
     this.cubePagePosition = PagesNames[index - index > nextIndex ? 1 : -1 - 1];
     if (index === 1) {
     this.cubePosition = 'back';

     }
     if (index === 2) {
     this.pauseTimer();
     this.cubePosition = 'top';
     }
     if (index === 3) {
     this.runFlipAnimationToggler.next(false);
     this.cubePosition = 'bottom';
     }
     }

     onPageLoad(anchorLink: any, index: any) {
     if (index === 2) this.resumeTimer();
     if (index === 3) this.runFlipAnimationToggler.next(true);
     }
     */
/*
}
 */

