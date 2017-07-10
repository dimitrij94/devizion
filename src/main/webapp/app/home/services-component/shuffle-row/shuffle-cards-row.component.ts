/**
 * Created by Dmitrij on 07.06.2017.
 */

import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output
} from "@angular/core";
import {Subject} from "rxjs";
import {Product} from "../../../entities/product/product.model";
import {Timer} from "../../../shared/timer";
import {DOCUMENT} from "@angular/platform-browser";
export const servicesRowWidthPrcnt = 0.9;
export const paddingPrcnt = 0.35;

@Component({
    selector: 'shuffle-cards-row',
    moduleId: module.id,
    template: `
        <div id="wrapper">
            <div id="row-wrapper" #rowWrapperEl
                 [ngStyle]="{marginLeft: rowMarginLeft + '%',width: rowWidth + '%'}">
                <div class="scroller left" mdTooltip="Попередній продукт" (click)="backward()"></div>
                <animated-card
                    class="animated-card"
                    *ngFor="let rowCard of cardsRow; let i = index"
                    [moveObservable]="moveSubject"
                    [numberOfCards]="numberOfServices"
                    [appearObservable]="appearSubject"
                    [service]="rowCard"
                    (productImageLoaded)="productImageLoaded(i)"
                    [startIndex]="i">
                </animated-card>
                <div class="scroller right" mdTooltip="Наступний продукт" (click)="forward()"></div>
            </div>
        </div>
    `,
    styleUrls: ['./shuffle-cards-row.component.scss']
})
export class ShuffleCardsRowComponent implements OnInit, AfterViewInit, OnChanges {
    public static showCardsOnInit = false;

    componentEnabled: boolean = false;

    scrollingTimer: Timer;

    @Input('allProducts')
    products: Array<Product>;


    cardsRow: Array<Product>;
    @Input('numOfServices')
    numberOfServices: number = 3;

    moveSubject: Subject<{ product: Product, forward: boolean }> = new Subject();

    lastProductIndex: number;

    rowMarginLeft: number = -25;

    rowWidth: number;

    hasAppeared = false;

    appearSubject: Subject<boolean> = new Subject();
    offsetTop: number;
    viewPointMargin: number;
    private loaddedCards: any = {};
    private numOfCardsLoaded: number = 0;

    @Output('onRowImagesLoaded')
    private onRowLoaded: EventEmitter<boolean> = new EventEmitter();


    constructor(private elRef: ElementRef, @Inject(DOCUMENT) private document: Document) {

    }


    ngOnInit(): void {
        //let w = this.rowWrapperEl.nativeElement.innerWidth;
        //this.perCardMargin = w / this.numberOfServices;
        this.lastProductIndex = this.numberOfServices - 1;
        this.cardsRow = this.getCardsRow();
        this.ngOnChanges();

        this.scrollingTimer = new Timer(6000, this.forward.bind(this));
        this.pauseTimer();

    }


    ngAfterViewInit(): void {
        this.offsetTop = this.elRef.nativeElement.getBoundingClientRect().top;
        this.viewPointMargin = (window.innerHeight * 0.45);
    }

    ngOnChanges(): void {
        this.cardsRow = this.getCardsRow();
        this.lastProductIndex = this.numberOfServices - 1;

        let cardWidthPrcnt = 100 / this.numberOfServices;
        this.rowWidth = cardWidthPrcnt * (this.numberOfServices + 2);
        this.rowMarginLeft = -cardWidthPrcnt;
    }



    disableComponent(): void {
        this.pauseTimer();
        this.componentEnabled = false;
    }

    enableComponent(): void {
        if (!this.hasAppeared) {
            this.appearSubject.next(true);
            this.hasAppeared = true;
            ShuffleCardsRowComponent.showCardsOnInit = true;
        }
        this.resumeTimer();
        this.componentEnabled = true;
    }

    @HostListener('window:scroll', ['$event'])
    onScroll($event) {
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

    productImageLoaded(cardIndex: number) {
        this.loaddedCards[cardIndex] = true;
        this.numOfCardsLoaded += 1;
        if (this.numOfCardsLoaded === this.numberOfServices - 1)
            this.onRowLoaded.emit(true);
    }

    pauseTimer() {
        this.scrollingTimer.pause();
    }

    resumeTimer() {
        //this.scrollingTimer.resume();
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
