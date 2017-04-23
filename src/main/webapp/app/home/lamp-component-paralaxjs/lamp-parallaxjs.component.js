"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../../typings/globals/jquery/index.d.ts"/>
/**
 * Created by Dmitrij on 12.04.2017.
 */
var core_1 = require("@angular/core");
var LampParallaxJSComponent = (function () {
    function LampParallaxJSComponent() {
    }
    LampParallaxJSComponent.prototype.ngAfterViewInit = function () {
        //$(this.sceneView.nativeElement)
    };
    return LampParallaxJSComponent;
}());
__decorate([
    core_1.ViewChild("scene")
], LampParallaxJSComponent.prototype, "sceneView", void 0);
LampParallaxJSComponent = __decorate([
    core_1.Component({ selector: 'lamps-parralax', templateUrl: "./lamp-parallaxjs.component.html", moduleId: module.id })
], LampParallaxJSComponent);
exports.LampParallaxJSComponent = LampParallaxJSComponent;
