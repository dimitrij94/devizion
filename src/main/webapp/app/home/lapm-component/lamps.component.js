"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/switchMap");
var LampsComponent = (function () {
    function LampsComponent() {
        this.backgroundPositionX = 0;
        this.backgroundPositionY = 0;
        this.incrementer = 0.1;
        this.imageOriginalHeight = 1080;
        this.imageOriginalWidth = 1920;
    }
    LampsComponent.prototype.clearLastMousePosition = function () {
        this.lastMousePosition = undefined;
    };
    LampsComponent.prototype.ngOnInit = function () {
        this.screenW = this.stageView.nativeElement.clientWidth;
        this.screenH = (this.imageOriginalHeight / this.imageOriginalWidth) * this.screenW;
        this.hiddenScreenW = this.screenW * 1.10;
        this.hiddenScreenH = this.screenH * 1.10;
        this.backgroundPositionY = -(this.hiddenScreenH - this.screenH) / 2;
        this.backgroundPositionX = -(this.hiddenScreenW - this.screenW) / 2;
        this.perPxlChangeX = (this.hiddenScreenH - this.screenH) / this.screenH;
        this.perPxlChangeY = (this.hiddenScreenW - this.screenW) / this.screenW;
        //this.mouseMove = Observable.fromEvent(this.stageView.nativeElement, 'mousemove');
        //this.mouseMove.subscribe(this.animateShift.bind(this));
    };
    LampsComponent.prototype.animateShift = function (mouseEvent) {
        if (!this.lastMousePosition) {
            this.lastMousePosition = {
                x: mouseEvent.clientX,
                y: mouseEvent.clientY
            };
            return;
        }
        var deltaX = this.lastMousePosition.x - mouseEvent.clientX;
        var deltaY = this.lastMousePosition.y - mouseEvent.clientY;
        if (deltaX === 0 && deltaY === 0)
            return;
        var changeY = this.perPxlChangeY * deltaY;
        var changeX = this.perPxlChangeX * deltaX;
        var desiredPositionX = this.backgroundPositionX + changeX;
        var desiredPositionY = this.backgroundPositionY + changeY;
        var positionReachedY = false;
        var positionReachedX = false;
        var t = 0.1;
        while (!positionReachedY && !positionReachedX) {
            this.changePosition(t, desiredPositionX, desiredPositionY, positionReachedX, positionReachedY);
        }
    };
    LampsComponent.prototype.stopMovement = function () {
        clearInterval(this.movementInterval);
    };
    LampsComponent.prototype.changePosition = function (t, desiredPositionX, desiredPositionY, positionReachedX, positionReachedY) {
        t += this.incrementer;
        if (t >= 2)
            throw "Decrease incrementor or increase the is to big ";
        if (!positionReachedX && ((desiredPositionX >= 0 && this.backgroundPositionX < desiredPositionX) ||
            (desiredPositionX < 0 && this.backgroundPositionX > desiredPositionX)))
            this.backgroundPositionX += t;
        else
            positionReachedX = true;
        if (!positionReachedY && ((desiredPositionY >= 0 && this.backgroundPositionY < desiredPositionY) ||
            (desiredPositionY < 0 && this.backgroundPositionY > desiredPositionY)))
            this.backgroundPositionY += t;
        else
            positionReachedY = true;
    };
    LampsComponent.prototype.easeOut = function (t) {
        return t * (2 - t);
    };
    return LampsComponent;
}());
__decorate([
    core_1.ViewChild('stage')
], LampsComponent.prototype, "stageView", void 0);
LampsComponent = __decorate([
    core_1.Component({
        selector: 'lamps',
        templateUrl: './lamps.component.html',
        moduleId: module.id,
        styleUrls: ['./lamp.component.scss']
    })
], LampsComponent);
exports.LampsComponent = LampsComponent;
