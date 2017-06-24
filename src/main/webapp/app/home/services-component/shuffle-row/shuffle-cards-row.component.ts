/**
 * Created by Dmitrij on 07.06.2017.
 */

import {
    Component,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
    Inject, AfterViewInit
} from "@angular/core";
import {Observable, Subject, Subscription} from "rxjs";
import {Product} from "../../../entities/product/product.model";
import {Timer} from "../../../shared/timer";
import {DOCUMENT} from "@angular/platform-browser";
import {widthOfServiceCard} from "../../home.component";

export const paddingPrcnt = 0.35;

@Component({
    selector: 'shuffle-cards-row',
    moduleId: module.id,
    template: `
        <div id="wrapper">
            <div id="row-wrapper" #rowWrapperEl
                 [ngStyle]="{marginLeft: rowMarginLeft + '%',width: rowWidth + '%'}">
                <div class="scroller left" (click)="backward()"></div>
                <animated-card
                    class="animated-card"
                    *ngFor="let rowCard of cardsRow; let i = index"
                    [moveObservable]="moveSubject"
                    [numberOfCards]="numberOfServices"
                    [appearObservable]="appearSubject"
                    [service]="rowCard"
                    [startIndex]="i">
                </animated-card>
                <div class="scroller right" (click)="forward()"></div>
            </div>
        </div>
    `,
    styleUrls: ['./shuffle-cards-row.component.scss']
})
export class ShuffleCardsRowComponent implements OnInit, AfterViewInit {
    componentEnabled: boolean = false;

    scrollingTimer: Timer;

    @Input('allProducts')
    products: Array<Product>;


    cardsRow: Array<Product>;

    numberOfServices: number = 3;

    moveSubject: Subject<{ product: Product, forward: boolean }> = new Subject();

    lastProductIndex: number;

    rowMarginLeft: number = -25;

    rowWidth: number;

    hasAppeared = false;

    appearSubject: Subject<boolean> = new Subject();
    offsetTop: number;
    viewPointMargin: number;


    constructor(private elRef: ElementRef, @Inject(DOCUMENT) private document: Document) {

    }


    ngOnInit(): void {
        //let w = this.rowWrapperEl.nativeElement.innerWidth;
        //this.perCardMargin = w / this.numberOfServices;
        this.lastProductIndex = this.numberOfServices - 1;
        this.cardsRow = this.getCardsRow();
        this.onResize();

        this.scrollingTimer = new Timer(6000, this.forward.bind(this));
        this.pauseTimer();

    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        let windowWidth = window.innerWidth;
        let oldNumOfServices = this.numberOfServices;
        let newNumOfServices;
        if (windowWidth <= 599) {
            newNumOfServices = 1;
        }
        if (windowWidth > 599) {
            newNumOfServices = Math.floor((windowWidth * 0.95) / widthOfServiceCard);
        }

        if (oldNumOfServices != newNumOfServices) {
            this.numberOfServices = newNumOfServices;
            this.ngOnChanges();
        }
    }

    ngAfterViewInit(): void {
        this.offsetTop = this.elRef.nativeElement.getBoundingClientRect().top;
        this.viewPointMargin = (window.innerHeight * 0.45);

        let scrollObservable = Observable.fromEvent(window, 'scroll').skip(5);
        scrollObservable.subscribe(this.onScrollEnableDisable.bind(this));
    }

    disableComponent(): void {
        this.pauseTimer();
        this.componentEnabled = false;
    }

    enableComponent(): void {
        if (!this.hasAppeared) {
            this.appearSubject.next(true);
        }
        this.resumeTimer();
        this.componentEnabled = true;
    }

    onScrollEnableDisable($event) {
        let offsetTop = this.elRef.nativeElement.getBoundingClientRect().top;
        let scrollTop = this.document.body.scrollTop;
        if (scrollTop < offsetTop) {
            this.componentEnabled && this.disableComponent();
        }
        if (scrollTop >= offsetTop + this.viewPointMargin && scrollTop < offsetTop + window.innerHeight) {
            !this.componentEnabled && this.enableComponent();
        }
        if (scrollTop >= offsetTop + window.innerHeight) {
            this.componentEnabled && this.disableComponent();
        }
    }


    pauseTimer() {
        this.scrollingTimer.pause();
    }

    resumeTimer() {
        //this.scrollingTimer.resume();
    }

    ngOnChanges(): void {
        this.cardsRow = this.getCardsRow();
        this.lastProductIndex = this.numberOfServices - 1;

        let cardWidthPrcnt = 100 / this.numberOfServices;
        this.rowWidth = cardWidthPrcnt * (this.numberOfServices + 2);
        this.rowMarginLeft = -cardWidthPrcnt;
    }

    getCardsRow() {
        let cardsRow = this.products.slice(0, this.numberOfServices);
        cardsRow.push(this.getNextCard());
        return cardsRow;
    }

    getRowMarginLeft() {
        return -100 / this.numberOfServices;
    }

    optimizeCardsSize() {
        this.applyToEachCard((card) => (<HTMLElement>card).style.width = this.getCardWidthPrcnt() + '%')
    }

    applyToEachCard(callback: (card: Element) => void) {
        let cards = (<HTMLElement>this.elRef.nativeElement).getElementsByTagName('animated-card');
        for (let i = 0; i < cards.length; i++)
            callback(cards.item(i));
    }

    getCardWidthPrcnt() {
        return 100 / (this.numberOfServices + 2);
    }

    getNextCard() {
        let nextIndex = this.lastProductIndex + 1;
        let numberOfProducts = this.products.length;
        nextIndex = nextIndex >= numberOfProducts ? nextIndex % numberOfProducts : nextIndex;
        return this.products[nextIndex];
    }

    getPreviousCard() {
        let previousIndex = (this.lastProductIndex - this.numberOfServices) - 1;
        let numberOfProd = this.products.length;
        previousIndex = previousIndex < 0 ? (numberOfProd - 1) - (numberOfProd % Math.abs(previousIndex)) : previousIndex;
        return this.products[previousIndex];
    }

    forward() {
        this.moveSubject.next({product: this.getNextCard(), forward: true});
        this.lastProductIndex += 1;
    }

    backward() {
        this.moveSubject.next({product: this.getPreviousCard(), forward: false});
        this.lastProductIndex -= 1;
    }
}
