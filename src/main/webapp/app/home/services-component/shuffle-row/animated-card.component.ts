import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from "@angular/core";
import {Product} from "../../../entities/product/product.model";
import {Subject} from "rxjs";
import {servicesRowWidthPrcnt, ShuffleCardsRowComponent} from "./shuffle-cards-row.component";
import {DOCUMENT} from "@angular/platform-browser";
import {Subscription} from "rxjs/Subscription";

const upfrontPosition = true;
const endPosition = false;
/**
 * Created by Dmitrij on 08.06.2017.
 */
@Component({
    selector: 'animated-card',
    template: `
        <div class="card-wrapper">
            <div class="shadow-wrapper">
                <jhi-service-card (onProductPhotoLoaded)="productImageLoaded.emit(true)"
                                  [service]="service">
                </jhi-service-card>
            </div>
        </div>`,
    styleUrls: ['./animated-card.component.scss']
})
export class AnimatedCardComponent implements OnInit, OnDestroy {

    isDisplayed: boolean;
    @Input()
    service: Product;


    @Output('productImageLoaded')
    productImageLoaded: EventEmitter<boolean> = new EventEmitter();
    /*
     start position determines the position of the card on initialization determined by its position inside of the array
     and starts with 1 but can take value from the 0 to num of cards + 1 */
    @Input('startIndex')
    startPosition: number;

    position: number;

    //number of cards does not including the placeholder card and starts with 1
    @Input('numberOfCards')
    numberOfCards: number;

    @Input('moveObservable')
    moveObservable: Subject<{ product: Product, forward: boolean }>;

    @Input('appearObservable')
    appearObservable: Subject<boolean>;

    perCardMargin: number;

    animationEnabled: boolean;
    private moveSubscription: Subscription;
    private appearSubscription: Subscription;

    constructor(private cardsRef: ElementRef,
                @Inject(DOCUMENT) private document: any,) {

    }

    ngOnInit(): void {
        this.assighnStartingPosition();

        this.moveSubscription = this.moveObservable.subscribe((moveTo: { product: Product, forward: boolean }) => {
            if (moveTo.forward) this.shuffleForward(moveTo.product);
            else this.shuffleBackward(moveTo.product);
        });


        if (ShuffleCardsRowComponent.showCardsOnInit)
            this.appear(true);
        else
            this.appearSubscription = this.appearObservable.subscribe(this.appear.bind(this));
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.assighnStartingPosition();
    }


    ngOnDestroy(): void {
        this.moveSubscription && this.moveSubscription.unsubscribe();
        this.appearSubscription && this.appearSubscription.unsubscribe();
    }

    @HostListener('window:resize', ['$event'])
    assighnStartingPosition() {
        this.position = this.startPosition;
        this.isDisplayed = this.position != this.numberOfCards;

        this.animationEnabled = this.isDisplayed;
        if (this.animationEnabled)
            this.enableAnimation();

        this.optimizePositioning();
        this.moveToPosition(this.position + 1, false);
    }

    appear(appear: boolean) {
        setTimeout((function () {
            !this.animationEnabled && this.enableAnimation();
            (<HTMLElement>this.cardsRef.nativeElement).classList.add('shown');
        }).bind(this), this.position * 250)
    }

    optimizePositioning() {
        this.assignCardWidthAndPerCardMargin(this.document.body.clientWidth * servicesRowWidthPrcnt);
    }

    assignCardWidthAndPerCardMargin(rowWidth: number) {
        let perCardMarginPrcnt = ((100 / this.numberOfCards) / 100);
        //let padding = (paddingPrcnt / 100) * rowWidth;
        let cardWidth = (perCardMarginPrcnt * rowWidth);
        this.perCardMargin = cardWidth;
        this.cardsRef.nativeElement.style.width = cardWidth + 'px';
    }

    getPerCardMargin() {
        let cardSizePrcnt = 100 / this.numberOfCards;
        this.perCardMargin = window.innerWidth * cardSizePrcnt;
    }

    shuffleForward(nextProduct: Product) {
        //if card is a placeholder put it into position based on direction of the shuffling without animating the movement
        if (!this.isDisplayed) {
            //change the product of the card to the one emited by the Subject
            this.service = nextProduct;

            //make the next last card move into placeholder position
            if (this.position != 0)
                this.moveToPosition(0, false);
            //this.putAtPosition('first', false);

            //card is now is no longer a placeholder
            this.isDisplayed = true;
            this.assignOpacity('1');
        }

        //every other card except of the first and last have to move one position to the right
        this.moveToPosition(this.position + 1, true);
        if (this.position >= this.numberOfCards + 1 || this.position == 0) {
            this.isDisplayed = false;
            this.assignOpacity('0');
        }
    }

    shuffleBackward(previousProduct: Product) {
        //if card is a placeholder put it into position based on direction of the shuffling without animating the movement
        if (!this.isDisplayed) {
            //change the product of the card to the one emited by the Subject
            this.service = previousProduct;

            if (this.position != this.numberOfCards + 1)
            //this.putAtPosition('last', false);
                this.moveToPosition(this.numberOfCards + 1, false);

            //card is now is no longer a placeholder
            this.isDisplayed = true;
            this.assignOpacity('1');
        }
        this.moveToPosition(this.position - 1, true);

        if (this.position >= this.numberOfCards + 1 || this.position == 0) {
            this.isDisplayed = false;
            this.assignOpacity('0');
        }
    }

    assignOpacity(opacity: string) {
        (<HTMLElement>this.cardsRef.nativeElement).style.opacity = opacity;
    }

    moveToPosition(position: number, animate) {
        /*let maxPosition = this.numberOfCards + 1;
         position = position >= maxPosition ? position % maxPosition : position;*/

        //cards are positioned relatively and the change of the position should be made based of the starting index of the card
        let delta = position - this.startPosition;
        if (animate && !this.animationEnabled)
            this.enableAnimation();
        if (!animate && this.animationEnabled) {
            this.disableAnimation();
        }
        //animation of the movement is described with the css transition proprety
        this.cardsRef.nativeElement.style.left = this.perCardMargin * delta + 'px';
        this.position = position;
    }

    enableAnimation() {
        let classList = this.cardsRef.nativeElement.classList;
        classList.remove('not-animated');
        void this.cardsRef.nativeElement.offsetWidth;
        classList.add('animated');
        this.animationEnabled = true;
    }

    disableAnimation() {
        let classList = this.cardsRef.nativeElement.classList;
        classList.remove('animated');
        void this.cardsRef.nativeElement.offsetWidth;
        classList.add('not-animated');
        this.animationEnabled = false;
    }

    /*
     putAtPosition(position: string, animate: boolean) {
     let [removeClass, addClass] = position === 'first' ? ['last', 'first'] : ['first', 'last'];
     let classList = this.cardsRef.nativeElement.classList;

     !animate && classList.remove('animated');
     animate && classList.add('animated');
     classList.remove(removeClass);
     classList.add(addClass);

     this.placeholderPosition = endPosition;
     this.isDisplayed = false;
     }
     */
    /*
     hideElement(){
     this.cardsRef.nativeElement.style.display = 'none';
     }

     showElement(){
     this.cardsRef.nativeElement.style.display = 'inline-block';
     }*/
}
