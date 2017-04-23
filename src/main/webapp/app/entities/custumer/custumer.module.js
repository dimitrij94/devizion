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
var ENTITY_STATES = _1.custumerRoute.concat(_1.custumerPopupRoute);
var DevizionCustumerModule = (function () {
    function DevizionCustumerModule() {
    }
    return DevizionCustumerModule;
}());
DevizionCustumerModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_1.DevizionSharedModule,
            router_1.RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        ],
        declarations: [
            _1.CustumerComponent,
            _1.CustumerDetailComponent,
            _1.CustumerDialogComponent,
            _1.CustumerDeleteDialogComponent,
            _1.CustumerPopupComponent,
            _1.CustumerDeletePopupComponent,
        ],
        entryComponents: [
            _1.CustumerComponent,
            _1.CustumerDialogComponent,
            _1.CustumerPopupComponent,
            _1.CustumerDeleteDialogComponent,
            _1.CustumerDeletePopupComponent,
        ],
        providers: [
            _1.CustumerService,
            _1.CustumerPopupService,
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], DevizionCustumerModule);
exports.DevizionCustumerModule = DevizionCustumerModule;
