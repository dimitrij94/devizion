"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shuffle_cards_row_component_1 = require("./shuffle-cards-row.component");
var upfrontPosition = true;
var endPosition = false;
/**
 * Created by Dmitrij on 08.06.2017.
 */
var AnimatedCardComponent = (function () {
    function AnimatedCardComponent(cardsRef) {
        this.cardsRef = cardsRef;
        this.placeholderPosition = upfrontPosition;
    }
    AnimatedCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isDisplayed = this.position != this.numberOfCards + 1;
        this.perCardMargin = 100 / this.numberOfCards;
        this.moveObservable.subscribe(function (moveTo) {
            if (moveTo.forward)
                _this.shuffleForward(moveTo.product);
            else
                _this.shuffleBackward(moveTo.product);
        });
    };
    AnimatedCardComponent.prototype.getPerCardMargin = function () {
        var cardSizePrcnt = 100 / this.numberOfCards;
        this.perCardMargin = window.innerWidth * cardSizePrcnt + shuffle_cards_row_component_1.paddingPrcnt * window.innerWidth;
    };
    AnimatedCardComponent.prototype.shuffleForward = function (nextProduct) {
        if (!this.isDisplayed) {
            if (this.placeholderPosition != upfrontPosition)
                this.putAtPosition('first', false);
            //change the product of the card to the one emited by the Subject
            this.service = nextProduct;
            //make a card appear from the left to right
            this.moveToPosition(0);
            //card is now is no longer a placeholder
            this.isDisplayed = true;
        }
        if (this.position == this.numberOfCards - 1) {
            //animate leave of the card from the left to right
            this.putAtPosition('last', true);
        }
        else {
            //every other card except of the first and last have to move one position to the right
            this.moveToPosition(this.position + 1);
        }
    };
    AnimatedCardComponent.prototype.shuffleBackward = function (previousProduct) {
        if (!this.isDisplayed) {
            if (this.placeholderPosition != endPosition)
                this.putAtPosition('last', false);
            //change the product of the card to the one emited by the Subject
            this.service = previousProduct;
            //make a card appear from the left to right
            this.moveToPosition(this.numberOfCards - 1);
            //card is now is no longer a placeholder
            this.isDisplayed = true;
        }
        else if (this.position == 0) {
            this.putAtPosition('first', true);
        }
        else {
            this.moveToPosition(this.position - 1);
        }
    };
    AnimatedCardComponent.prototype.moveToPosition = function (position, animate) {
        if (animate === void 0) { animate = true; }
        var classList = this.cardsRef.nativeElement.classList;
        !animate && classList.removeClass('animated');
        this.cardsRef.nativeElement.style.left = this.perCardMargin * position + 'px';
        this.position = position;
    };
    AnimatedCardComponent.prototype.putAtPosition = function (position, animate) {
        var _a = position === 'first' ? ['last', 'first'] : ['first', 'last'], removeClass = _a[0], addClass = _a[1];
        var classList = this.cardsRef.nativeElement.classList;
        !animate && classList.removeClass('animated');
        animate && classList.addClass('animated');
        classList.removeClass(removeClass);
        classList.addClass(addClass);
        this.placeholderPosition = endPosition;
        this.isDisplayed = false;
    };
    return AnimatedCardComponent;
}());
__decorate([
    core_1.Input('startIndex')
], AnimatedCardComponent.prototype, "position", void 0);
__decorate([
    core_1.Input('numberOfCards')
], AnimatedCardComponent.prototype, "numberOfCards", void 0);
__decorate([
    core_1.Input('moveObservable')
], AnimatedCardComponent.prototype, "moveObservable", void 0);
AnimatedCardComponent = __decorate([
    core_1.Component({
        selector: 'animated-card',
        template: "\n        <div class=\"card-wrapper\">\n            <jhi-service-card *ngIf=\"isDisplayed\" [service]=\"service\"></jhi-service-card>\n        </div>",
        //language=CSS
        styles: ["\n        .cards-wrapper{\n            width:100%;\n            height:100%;\n            padding:" + shuffle_cards_row_component_1.paddingPrcnt + "vw;\n        }\n    "]
    })
], AnimatedCardComponent);
exports.AnimatedCardComponent = AnimatedCardComponent;
