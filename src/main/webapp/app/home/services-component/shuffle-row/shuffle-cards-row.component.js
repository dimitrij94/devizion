/**
 * Created by Dmitrij on 07.06.2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var product_model_1 = require("../../../entities/product/product.model");
exports.paddingPrcnt = 0.01;
var ShuffleCardsComponent = (function () {
    function ShuffleCardsComponent() {
        this.moveSubject = new rxjs_1.Subject();
        this.forwardTogglerActive = true;
        this.backwardTogglerActive = false;
    }
    ShuffleCardsComponent.prototype.ngOnInit = function () {
        //let w = this.rowWrapperEl.nativeElement.innerWidth;
        //this.perCardMargin = w / this.numberOfServices;
        this.lastProductIndex = this.numberOfServices - 1;
        var placeholderCard = new product_model_1.Product();
        this.cardsRow = this.products.slice(0, this.numberOfServices);
        this.cardsRow.push(placeholderCard);
    };
    ShuffleCardsComponent.prototype.forward = function () {
        var nextIndex = this.lastProductIndex + 1;
        var lastIndex = this.products.length - 1;
        if (nextIndex >= lastIndex) {
            this.moveSubject.next({ product: this.products[nextIndex], forward: true });
            this.lastProductIndex += 1;
        }
    };
    ShuffleCardsComponent.prototype.backward = function () {
        var previousIndex = (this.lastProductIndex - this.numberOfServices) - 1;
        if (previousIndex >= 0) {
            this.moveSubject.next({ product: this.products[previousIndex], forward: false });
            this.lastProductIndex -= 1;
        }
    };
    return ShuffleCardsComponent;
}());
__decorate([
    core_1.Input('allProducts')
], ShuffleCardsComponent.prototype, "products", void 0);
__decorate([
    core_1.Input('numberOfCards')
], ShuffleCardsComponent.prototype, "numberOfServices", void 0);
ShuffleCardsComponent = __decorate([
    core_1.Component({
        selector: 'shuffle-cards-row',
        moduleId: module.id,
        template: "\n        <div id=\"row-wrapper\" #rowWrapperEl>\n            <div class=\"scroller left\"></div>\n            <animated-card\n                class=\"animated-card\"\n                *ngFor=\"let rowCard of cardsRow; let i = index\"\n                [moveObservable]=\"moveSubject\"\n                [numberOfCards]=\"numberOfServices + 1\"\n                [service]=\"rowCard\"\n                [startIndex]=\"i\">\n            </animated-card>\n            <div class=\"scroller right\"></div>\n        </div>\n    ",
        styleUrls: ['./shuffle-cards-row.component.scss']
    })
], ShuffleCardsComponent);
exports.ShuffleCardsComponent = ShuffleCardsComponent;
