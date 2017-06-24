import {
    AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnChanges, OnInit, SimpleChanges,
    ViewChild
} from "@angular/core";
import {UserOrder} from "../../entities/user-order/user-order.model";
import {DomSanitizer, DOCUMENT} from "@angular/platform-browser";
import {FlipCardSubscriptionDto} from "../flip-card-component/flip-card-subscription-dto";
import {Observable, Subject, Subscription} from "rxjs";
import {Timer} from "../../shared/timer";
import {UserOrderService} from "../../entities/user-order/user-order.service";
import {hundredScalar} from "../../shared/image/image-size.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

interface ModalCoordinates {
    width?: number | string;
    height?: number | string;
    left?: number | string;
    top?: number | string;
}

@Component({
    selector: 'jhi-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.style.scss'],
    animations: [
        trigger('modalDescriptionStatus', [
            state('hidden', style({right: '-14em'})),
            state('shown', style({right: '0em'})),
            transition('hidden => shown', animate('1.5s linear')),
            transition('shown => hidden', animate('0.25s linear'))
        ]),
        trigger('modalShadowStatus', [
            state('hidden', style({boxShadow: '0 0 0 rgba(0, 0, 0, 0.18)'})),
            state('shown', style({boxShadow: '0 21px 16px rgba(0, 0, 0, 0.18)'})),
            transition('hidden => shown', animate('1s linear')),
            transition('shown => hidden', animate('0.25s linear'))
        ])
    ]
})
export class PortfolioComponent implements OnInit, AfterViewInit, OnChanges {
    static hasScrollAppeared = false;
    showHideSubscription: Subscription;

    @Input('portfolio')
    portfolio: Array<UserOrder>;

    @Input('numOfCols')
    numOfCols: number;

    @ViewChild('modalWindow')
    modalWindow: ElementRef;

    @ViewChild('portfolioModalImage')
    portfolioModalImage: ElementRef;

    @ViewChild('portfolioGridWrapper')
    portfolioGridWrapper: ElementRef;

    modalDescriptionStatus = 'hidden';

    numOfRows: number = 3;

    activePortfolio: Array<UserOrder>;

    flipCardToggle: Subject<FlipCardSubscriptionDto>;

    showSubject: Subject<boolean> = new Subject();

    flipTimer: Timer;

    windowScrollSubject = Observable.fromEvent(window, 'scroll');
    modalPortfolio: UserOrder;
    modalWindowStyle: any = {};
    modalImageStyle: any = {};

    showModal: boolean = false;
    modalLoading = false;

    startWindowCoordinates: ModalCoordinates;

    startImageCoordinates: ModalCoordinates;
    //num of cards scrolled by user manualy
    numCardsScrolled = 0;
    numCardsScrolledByTimer = 0;

    constructor(private portfolioEl: ElementRef,
                private userOrderService: UserOrderService,
                @Inject(DOCUMENT) private document: Document) {

    }


    ngOnChanges(changes: SimpleChanges): void {
        this.activePortfolio = this.portfolio.slice(0, (this.numOfCols * this.numOfRows) - 1);
    }

    ngOnInit() {
        this.flipCardToggle = new Subject<FlipCardSubscriptionDto>();
        //2 stands for 1 - absent card in  info block and 1 - index 0 base
        this.activePortfolio = this.portfolio.slice(0, (this.numOfCols * this.numOfRows) - 1);
        this.createFlippingTimer();
        this.pauseFlippingTimer();
        this.portfolio.forEach((portfolio) => {
            portfolio.photoUri = this.userOrderService.getImageUri(portfolio.photoUri, hundredScalar, window.innerWidth);
        });
    }

    ngAfterViewInit(): void {
        this.showHideSubscription = this.windowScrollSubject
            .skip(5)
            .subscribe(this.showScroll.bind(this));

        this.windowScrollSubject
            .skip(5)
            .subscribe(this.flipScroll.bind(this));
    }

    closeModal() {
        this.modalImageStyle = this.startImageCoordinates;
        this.modalWindowStyle = this.startWindowCoordinates;
        this.modalLoading = false;
        this.modalDescriptionStatus = 'hidden';
        let self = this;
        setTimeout(() => {
            self.showModal = false;
            self.flipTimer.resume();
        }, 1000)
    }

    openPortfolioModal(dto: { index: number, order: UserOrder }) {
        if (this.showModal || this.modalLoading) return;
        this.flipTimer.pause();
        let rowNum = Math.floor(dto.index / this.numOfCols);
        let selectedTile = this.document.getElementById('tile_' + dto.index);
        let selectedTilePosition = selectedTile.getBoundingClientRect();
        let tileHeight = selectedTile.offsetHeight;
        let tilesMargin = 2;
        this.modalWindowStyle = {
            width: selectedTile.offsetWidth + 'px',
            height: tileHeight + 'px',
            left: selectedTilePosition.left + 'px',
            top: ((rowNum) * tileHeight) + (rowNum) * tilesMargin + 'px'
        };
        this.modalLoading = true;
        let modalPortfolio = dto.order;
        this.modalPortfolio = modalPortfolio;

        //scalars determine by how much the image size has changed
        let widthScalar = 1 / (modalPortfolio.croppCoordinateX2 - modalPortfolio.croppCoordinateX1);
        let heightScalar = 1 / (modalPortfolio.croppCoordinateY2 - modalPortfolio.croppCoordinateY1);

        //image size inside of the modal view adjusted for difference in size
        let modalImageWidth = tileHeight * widthScalar;
        let modalImageHeight = tileHeight * heightScalar;

        this.modalImageStyle.width = modalImageWidth + 'px';
        this.modalImageStyle.height = modalImageHeight + 'px';

        let x = -modalImageWidth * modalPortfolio.croppCoordinateX1;
        let y = -modalImageHeight * modalPortfolio.croppCoordinateY1;

        this.modalImageStyle.left = x + 'px';
        this.modalImageStyle.top = y + 'px';
        this.startWindowCoordinates = {};
        this.startImageCoordinates = {};
        Object.assign(this.startWindowCoordinates, this.modalWindowStyle);
        Object.assign(this.startImageCoordinates, this.modalImageStyle);

        let newImage = new Image();
        newImage.onload = this.onModalImageLoad.bind(this);
        newImage.onerror = (err) => console.error('image load failed ' + err);
        newImage.src = modalPortfolio.photoUri;
    }

    getWidthFromAspectRatio(width1: number, height1: number, height2: number) {
        return (width1 * height2) / height1;
    }

    getHeightFromAspectRatio(width1: number, height1: number, width2: number) {
        return (height1 * width2) / width1;
    }

    onModalImageLoad($event) {
        let gridHeight = this.portfolioGridWrapper.nativeElement.offsetHeight;
        this.portfolioModalImage.nativeElement.src = $event.target.src;
        let originalImageWidthPx = $event.target.width;
        let originalImageHeightPx = $event.target.height;

        /* final size of the modal window in px after animation finished*/
        /* modal height is determined from the original image proportions in px */
        let documentWidth = this.document.body.clientWidth;
        let modalHeightPx = window.innerHeight * 0.75;
        let modalWidthPx = this.getWidthFromAspectRatio(originalImageWidthPx, originalImageHeightPx, modalHeightPx);
        if (modalWidthPx > documentWidth) {
            modalWidthPx = documentWidth - 48;
            modalHeightPx = this.getHeightFromAspectRatio(originalImageWidthPx, originalImageHeightPx, modalWidthPx);
        }

        let modalX = (window.innerWidth - modalWidthPx) / 2;
        let modalY = 0;

        this.modalWindowStyle.left = modalX + 'px';
        this.modalWindowStyle.top = (gridHeight / 2) - (modalHeightPx / 2) + 'px';
        this.modalWindowStyle.height = modalHeightPx + 'px';
        this.modalWindowStyle.width = modalWidthPx + 'px';

        this.modalImageStyle.width = modalWidthPx + 'px';
        this.modalImageStyle.height = modalHeightPx + 'px';
        this.modalImageStyle.left = 0 + 'px';
        this.modalImageStyle.top = 0 + 'px';

        this.modalLoading = false;
        this.showModal = true;
        this.showHideModalDescription();
    }

    showHideModalDescription() {
        this.modalDescriptionStatus = 'shown';
    }

    closePortfolioModal() {
        this.showModal = false;
        this.modalPortfolio = undefined;
    }

    showScroll(event) {
        let scrollTop = this.document.body.scrollTop;
        let portfolioOffsets = this.portfolioEl.nativeElement.getBoundingClientRect();
        if (scrollTop >= portfolioOffsets.top + (window.innerHeight / 3.3333)) {
            PortfolioComponent.hasScrollAppeared = true;
            this.showSubject.next(true);
            this.showHideSubscription.unsubscribe()
        }
    }


    flipScroll(event) {
        let scrollTop = this.document.body.scrollTop;
        let portfolioOffsets = this.portfolioEl.nativeElement.getBoundingClientRect();

        if (scrollTop >= portfolioOffsets.top + (window.innerHeight / 3)) {
            this.resumeFlipTimer();
        }
        if (scrollTop >= portfolioOffsets.top + (window.innerHeight * 3)) {
            this.pauseFlippingTimer();
        }
    }


    createFlippingTimer() {
        this.flipTimer = new Timer(3000, this.timerScrollForward.bind(this));
    }

    emitNewDto(index) {
        //2 stands for 1 - absent card in  info block and 1 - index 0 base
        let lastCardIndex = this.numOfCols * this.numOfRows - 1;
        //the actual card getting flipped is selected at random and her index is independent from the portfolio entity
        let flippingCardIndex = Math.floor(Math.random() * lastCardIndex);
        //index starts with zero and increases with each timer cycle generating next card index
        let nextCardIndex = lastCardIndex + index + 1;
        //after all cards inside portfolio have bean shown start all over again
        if (nextCardIndex >= this.portfolio.length)
            nextCardIndex = nextCardIndex % this.portfolio.length;

        this.flipCardToggle.next({index: flippingCardIndex, nextEntity: this.portfolio[nextCardIndex]});
    }

    timerScrollForward(index: number) {
        this.numCardsScrolledByTimer += 1;
        index = index + this.numCardsScrolled;
        this.emitNewDto(index);
    }

    manualScrollForward() {
        this.numCardsScrolled += 1;
        let index = this.numCardsScrolledByTimer + this.numCardsScrolled;
        this.emitNewDto(index);
    }

    manualScrollBackward() {
        this.numCardsScrolled -= 1;
        let index = this.numCardsScrolledByTimer + this.numCardsScrolled;
        this.emitNewDto(index);
    }

    pauseFlippingTimer() {
        this.flipTimer.pause();
    }

    resumeFlipTimer() {
        this.flipTimer.resume();
    }

}
