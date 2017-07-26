"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var shared_1 = require("../../shared");
var _1 = require("./");
var ENTITY_STATES = _1.userOrderRoute.concat(_1.userOrderPopupRoute);
var DevizionUserOrderModule = (function () {
    function DevizionUserOrderModule() {
    }
    return DevizionUserOrderModule;
}());
DevizionUserOrderModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_1.DevizionSharedModule,
            router_1.RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        ],
        declarations: [
            _1.UserOrderComponent,
            _1.UserOrderDetailComponent,
            _1.UserOrderDialogComponent,
            _1.UserOrderDeleteDialogComponent,
            _1.UserOrderPopupComponent,
            _1.UserOrderDeletePopupComponent,
        ],
        entryComponents: [
            _1.UserOrderComponent,
            _1.UserOrderDialogComponent,
            _1.UserOrderPopupComponent,
            _1.UserOrderDeleteDialogComponent,
            _1.UserOrderDeletePopupComponent,
        ],
        providers: [
            _1.UserOrderService,
            _1.UserOrderPopupService,
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], DevizionUserOrderModule);
exports.DevizionUserOrderModule = DevizionUserOrderModule;
