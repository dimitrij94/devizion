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
        this.serviceActive = "inactive";
    }
    ServiceCardComponent.prototype.disableService = function () {
        this.serviceActive = 'inactive';
    };
    ServiceCardComponent.prototype.activateService = function () {
        this.serviceActive = 'active';
    };
    ServiceCardComponent.prototype.ngOnInit = function () {
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
            animations_1.trigger("serviceHover", [
                animations_1.state("active", animations_1.style({
                    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                    'transform': 'scale(1.15) translateY(-2rem)',
                })),
                animations_1.state("inactive", animations_1.style({
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                    transform: 'scale(1) translateY(0)'
                })),
                animations_1.transition("active<=>inactive", [animations_1.animate("300ms")])
            ])
        ]
    })
], ServiceCardComponent);
exports.ServiceCardComponent = ServiceCardComponent;
