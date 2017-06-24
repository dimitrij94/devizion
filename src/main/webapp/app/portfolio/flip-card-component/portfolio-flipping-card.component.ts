/**
 * Created by Dmitrij on 29.04.2017.
 */
import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {UserOrder} from "../../entities/user-order/user-order.model";
import {Subject} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FlipCardSubscriptionDto} from "./flip-card-subscription-dto";
import {PortfolioComponent} from "../portfolio-cards-grid-component/portfolio.component";
@Component({
    selector: 'portfolio-flipping-card',
    templateUrl: './portfolio-flipping-card.component.html',
    moduleId: module.id,
    styleUrls: ['/flip-card.component.styles.scss'],
    animations: [
        trigger('showHideGridTile', [
            state('shown', style({opacity: '1.0', transform: 'scale(1)'})),
            state('hidden', style({opacity: '0.0', transform: 'scale(0.7)'})),
            transition('shown<=>hidden', animate('150ms ease-in'))
        ]),

        trigger('flipCard', [
            state('frontSideActive', style({
                transform: 'rotateY(0)'
            })),
            state('backSideActive', style({
                transform: 'rotateY(180deg)'
            })),
            transition('frontSideActive <=> backSideActive', [
                //style({transformStyle:'preserve-3d'}),
                animate('600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')
            ])
            /*,
             transition('backSideActive => frontSideActive', [
             //style({transformStyle:'preserve-3d'}),
             animate('600ms cubic-bezier(0.6, -0.28, 0.735, 0.045)')
             ])*/
        ])
    ]
})
export class PortfolioFlippingCard implements OnInit {
    showDescAfterFlipAnimationFinish: boolean = false;

    flipReady = false;

    @Input("initialValue")
    frontSidePortfolio: UserOrder;

    backSidePortfolio: UserOrder;

    activeCard: UserOrder;

    flipStatus = 'frontSideActive';

    isFlipAnimationRunning = false;

    @Input('index')
    index: number;

    @Input('showTileSubject')
    showSubject: Subject<boolean>;

    isHovered = false;

    frontImageScaleStatus = 'hidden';

    backImageScaleStatus = 'hidden';

    frontCardIsActive = true;
    backCardIsActive = false;

    @Output('modalSwitch')
    modalSwitch: EventEmitter<{ order: UserOrder, index: number }> = new EventEmitter();

    @Input('togglingObservable')
    flipObservable: Subject<FlipCardSubscriptionDto>;

    tileShown: string;

    constructor(private changeDetector: ChangeDetectorRef) {

    }

    openModal() {
        this.modalSwitch.emit({order: this.activeCard, index: this.index});
    }

    ngOnInit(): void {
        this.tileShown = PortfolioComponent.hasScrollAppeared ? 'shown' : 'hidden';
        this.backSidePortfolio = this.frontSidePortfolio;
        this.activeCard = this.frontSidePortfolio;
        this.flipObservable.subscribe(
            (flipDto) => {
                //index is selected at random and if it matches the card index it is being flipped
                if (this.index === flipDto.index) {
                    //card can not be flipped when the user hovers his mouse over it
                    if (!this.isHovered) {
                        this.setNextCard(flipDto.nextEntity);
                        this.flipReady = true;
                    }
                    //if user does hover his mouse over the card, card resend the event to other cards
                    else {
                        let nextIndex = this.index !== 0 ? flipDto.index - 1 : flipDto.index + 1;
                        this.flipObservable.next({index: nextIndex, nextEntity: flipDto.nextEntity});
                    }
                }
            });
        this.showSubject.subscribe((val) => {
            val && setTimeout(this.showTile.bind(this), this.index * 150)
        });
    }

    setNextCard(portfolio: UserOrder) {
        this.activeCard = portfolio;
        if (this.flipStatus === 'frontSideActive') {
            this.backCardIsActive = true;
            this.backSidePortfolio = portfolio;
        }
        else {
            this.frontCardIsActive = true;
            this.frontSidePortfolio = portfolio;
        }
    }

    showTile() {
        this.tileShown = 'shown';
    }

    scaleImage() {
        this.isHovered = true;
        if (this.flipStatus === 'frontSideActive') {
            this.frontImageScaleStatus = 'shown';
        }
        else {
            this.backImageScaleStatus = 'shown';
        }
    }

    reverseScaleImage() {
        this.isHovered = false;
        if (this.flipStatus === 'frontSideActive') {
            this.frontImageScaleStatus = 'hidden';
        }
        else {
            this.backImageScaleStatus = 'hidden';
        }
    }


    //being toggled by (onLoad) event of the img to prevent the flipping before the img has loaded
    toggleFlip() {
        if (this.flipReady) {
            if (this.flipStatus === 'frontSideActive') {
                this.flipStatus = 'backSideActive';
                this.frontCardIsActive = false;
                this.backCardIsActive = true;
            } else {
                this.flipStatus = 'frontSideActive';
                this.frontCardIsActive = true;
                this.backCardIsActive = false;
            }
        }
    }

    flipAnimationStarted() {
        this.isFlipAnimationRunning = true;
    }

    flipAnimationFinished() {
        if (this.showDescAfterFlipAnimationFinish) {
            this.scaleImage();
        }
        /*
         WTF IS THIS
         if (this.flipStatus === 'frontSideActive')
         this.backSidePortfolio = null;
         else
         this.frontSidePortfolio = null;*/

        this.isFlipAnimationRunning = false;
    }


}
