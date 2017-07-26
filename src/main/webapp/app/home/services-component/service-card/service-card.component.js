"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var ServiceCardComponent = (function () {
    function ServiceCardComponent() {
        this.serviceActive = 'inactive';
    }
    ServiceCardComponent.prototype.disableService = function () {
        this.serviceActive = 'inactive';
    };
    ServiceCardComponent.prototype.activateService = function () {
        this.serviceActive = 'hovered';
    };
    return ServiceCardComponent;
}());
__decorate([
    core_1.Input()
], ServiceCardComponent.prototype, "service", void 0);
ServiceCardComponent = __decorate([
    core_1.Component({
        selector: 'jhi-service-card',
        templateUrl: './service-card.component.html',
        styleUrls: ['./service-card.styles.scss'],
        animations: [
            animations_1.trigger('serviceHover', [
                animations_1.state('hovered', animations_1.style({
                    'filter': 'drop-shadow(0 21px 16px rgba(0, 0, 0, .18))',
                    'transform': 'translateY(-0.8rem)',
                })),
                animations_1.state('inactive', animations_1.style({
                    'filter': 'drop-shadow(0 1px 1px rgba(0, 0, 0, .27))',
                    transform: 'translateY(0rem)'
                })),
                animations_1.transition('hovered <=> inactive', [
                    animations_1.animate('275ms')
                ])
            ])
        ]
    })
], ServiceCardComponent);
exports.ServiceCardComponent = ServiceCardComponent;
