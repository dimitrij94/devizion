import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import {UserOrder} from "../../entities/user-order/user-order.model";
import {DOCUMENT} from "@angular/platform-browser";
import {FlipCardSubscriptionDto} from "../flip-card-component/flip-card-subscription-dto";
import {Observable, Subject, Subscription} from "rxjs";
import {Timer} from "../../shared/timer";
import {UserOrderService} from "../../entities/user-order/user-order.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MySidenavWrapperService} from "../../entities/my-sidenav-wrapper/my-sidenav-wrapper.service";

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
export class PortfolioComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    flipOnOfSubscription: Subscription;
    scrollingContainerObservable: Subscription;
    gridTileHeight: number;
    openModalTileIndex: number;
    tileOfOpenModal: HTMLDivElement;
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
    @Input('title')
    title: string = 'Наше портфоліо';

    @Input('includeSidenavMargin')
    includeSidenavMargin: boolean = false;

    //width of the document
    vw: number;

    @Input('controlsTilePosition')
    controlsTilePosition: number;

    @Input('modalVerticalAlign')
    modalVerticalAlign: string = 'middle';

    @Input('maxRows')
    maxRows: number = 3;
    private scrollOffsetTop: number = 0;

    @Input('scrollEnabled')
    scrollEnabled: boolean = false;

    constructor(private portfolioEl: ElementRef,
                private userOrderService: UserOrderService,
                private mySidenavWrapperService: MySidenavWrapperService,
                @Inject(DOCUMENT) private document: Document) {

    }


    ngOnChanges(changes: SimpleChanges): void {
        let portfolioChanged = changes['portfolio'];
        if (changes['numCols'] || portfolioChanged) {
            this.numOfRows = this.getNumberOfRows();
            this.activePortfolio = this.portfolio.slice(0, (this.numOfCols * this.numOfRows) - 1);
        }
    }


    ngOnInit() {
        this.vw = this.document.body.clientWidth;
        if (this.controlsTilePosition == null)
            this.controlsTilePosition = (this.numOfCols * 2) - 1;
        this.numOfRows = this.getNumberOfRows();
        this.flipCardToggle = new Subject<FlipCardSubscriptionDto>();
        //2 stands for 1 - absent card in  info block and 1 - index 0 base
        this.activePortfolio = this.portfolio.slice(0, (this.numOfCols * this.numOfRows) - 1);
        //this.updateActivePortfolio();
        //this.createFlippingTimer();
        if (this.scrollEnabled) {
            this.flipTimer = new Timer(3000, this.timerScrollForward.bind(this));
            this.pauseFlippingTimer();
        }
        this.userOrderService.parsePortfolioModalImages(this.portfolio);
        if (this.modalVerticalAlign == 'top')
            this.scrollingContainerObservable =
                this.mySidenavWrapperService.scrollingObservable.subscribe(($event) => {
                    this.scrollOffsetTop = $event.target.scrollTop;
                })
    }


    ngOnDestroy(): void {
        this.scrollingContainerObservable && this.scrollingContainerObservable.unsubscribe();
        this.showHideSubscription && this.showHideSubscription.unsubscribe();
        this.flipOnOfSubscription && this.flipOnOfSubscription.unsubscribe();
    }

    updateActivePortfolio() {
        let numberOfCells = this.numOfCols * this.numOfRows;
        if (numberOfCells > (this.controlsTilePosition + 1)) {
            numberOfCells -= 1;
        }
        this.activePortfolio = this.portfolio.slice(0, numberOfCells);
    }

    ngAfterViewInit(): void {
        this.showHideSubscription = this.windowScrollSubject
            .skip(5)
            .subscribe(this.showScroll.bind(this));

        this.flipOnOfSubscription = this.windowScrollSubject
            .skip(5)
            .subscribe(this.flipScroll.bind(this));
    }

    getNumberOfRows() {
        let numOfRows = 1;
        let numOfCols = this.numOfCols;
        let numberOfUserOrders = this.portfolio.length;
        let hasMore = true;
        while (hasMore) {
            hasMore = (numOfRows * numOfCols) < numberOfUserOrders;
            if (hasMore) {
                numOfRows += 1;
            }
            if (!hasMore || numOfRows >= this.maxRows) {
                return numOfRows;
            }
        }
    }

    closeModal() {
        this.modalImageStyle = this.startImageCoordinates;
        this.modalWindowStyle = this.startWindowCoordinates;
        this.modalLoading = false;
        this.modalDescriptionStatus = 'hidden';
        let self = this;
        setTimeout(() => {
            self.tileOfOpenModal.style.display = 'block';
            self.showModal = false;
            this.resumeFlipTimer();
        }, 1000)
    }

    openPortfolioModal(dto: { index: number, order: UserOrder }) {
        this.vw = this.document.body.clientWidth;

        if (this.showModal || this.modalLoading) return;
        this.pauseFlippingTimer();

        let rowNum = Math.floor((dto.index >= this.controlsTilePosition ? dto.index + 1 : dto.index) / this.numOfCols);
        this.openModalTileIndex = dto.index;
        let selectedTile = <HTMLDivElement>this.document.getElementById('tile_' + dto.index);
        let selectedTilePosition = selectedTile.getBoundingClientRect();
        let tileHeight = selectedTile.offsetHeight;
        this.gridTileHeight = tileHeight;
        this.tileOfOpenModal = selectedTile;

        let tilesMargin = 1;

        this.modalWindowStyle = {
            width: selectedTile.offsetWidth + 'px',
            height: tileHeight + 'px',
            left: selectedTilePosition.left - (this.includeSidenavMargin ? 300 : 0) + 'px',
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
        this.modalDescriptionStatus = 'hidden';
        let sidenavMargin = (this.includeSidenavMargin ? 300 : 0);
        let gridHeight = this.portfolioGridWrapper.nativeElement.offsetHeight;
        this.portfolioModalImage.nativeElement.src = $event.target.src;
        let originalImageWidthPx = $event.target.width;
        let originalImageHeightPx = $event.target.height;
        //48 stands for 24 px padding from each side
        let modalMaxWidth = this.vw - sidenavMargin - 48;
        /* final size of the modal window in px after animation finished*/
        /* modal height is determined from the original image proportions in px */
        let modalHeightPx = window.innerHeight * 0.75;
        let modalWidthPx = this.getWidthFromAspectRatio(originalImageWidthPx, originalImageHeightPx, modalHeightPx);
        if (modalWidthPx > modalMaxWidth) {
            modalWidthPx = modalMaxWidth;
            modalHeightPx = this.getHeightFromAspectRatio(originalImageWidthPx, originalImageHeightPx, modalWidthPx);
        }

        let modalX = ((this.vw - sidenavMargin) - modalWidthPx) / 2;
        let modalY = 0;

        this.modalWindowStyle.left = modalX + 'px';
        this.modalWindowStyle.top = this.getModalFinalPositionY(this.modalVerticalAlign, gridHeight, modalHeightPx);
        this.modalWindowStyle.height = modalHeightPx + 'px';
        this.modalWindowStyle.width = modalWidthPx + 'px';

        this.modalImageStyle.width = modalWidthPx + 'px';
        this.modalImageStyle.height = modalHeightPx + 'px';
        this.modalImageStyle.left = 0 + 'px';
        this.modalImageStyle.top = 0 + 'px';

        this.modalLoading = false;
        this.showModal = true;
        this.showModalDescription();
        //hide opened modal original tile
        this.tileOfOpenModal.style.display = 'none';
    }

    getModalFinalPositionY(align: string, gridHeight: number, modalHeightPx: number) {
        switch (align) {
            case 'middle':
                return (gridHeight / 2) - (modalHeightPx / 2) + 'px';
            case 'top':
                return this.scrollOffsetTop + 'px';
            case 'bottom':
                return (gridHeight - modalHeightPx) + 'px';
        }
    }

    showModalDescription() {
        this.modalDescriptionStatus = 'shown';
    }

    closePortfolioModal() {
        this.showModal = false;
        this.tileOfOpenModal.style.display = 'block';
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


    emitNewDto(index) {
        //2 stands for 1 - absent card in  info block and 1 - index 0 base
        let lastCardIndex = this.numOfCols * this.numOfRows - 1;
        //the actual card getting flipped is selected at random and her index is independent from the portfolio entity
        let flippingCardIndex = Math.floor(Math.random() * lastCardIndex);
        //index starts with zero and increases with each timer cycle generating next card index
        let nextCardIndex = lastCardIndex + index + 1;
        //after all cards inside portfolio have bean shown start all over again
        if (nextCardIndex >= this.portfolio.length) {
            nextCardIndex = nextCardIndex % this.portfolio.length;
        }
        else if (nextCardIndex < 0) {
            nextCardIndex = Math.abs(index % this.portfolio.length)
        }
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
        this.flipTimer && this.flipTimer.pause();
    }

    resumeFlipTimer() {
        this.flipTimer && this.flipTimer.resume();
    }

}
