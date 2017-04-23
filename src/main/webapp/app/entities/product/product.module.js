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
var angular2_image_upload_1 = require("angular2-image-upload");
var ENTITY_STATES = _1.productRoute.concat(_1.productPopupRoute);
var DevizionProductModule = (function () {
    function DevizionProductModule() {
    }
    return DevizionProductModule;
}());
DevizionProductModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_1.DevizionSharedModule,
            angular2_image_upload_1.ImageUploadModule.forRoot(),
            router_1.RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        ],
        declarations: [
            _1.ProductComponent,
            _1.ProductDetailComponent,
            _1.ProductDialogComponent,
            _1.ProductDeleteDialogComponent,
            _1.ProductPopupComponent,
            _1.ProductDeletePopupComponent,
        ],
        entryComponents: [
            _1.ProductComponent,
            _1.ProductDialogComponent,
            _1.ProductPopupComponent,
            _1.ProductDeleteDialogComponent,
            _1.ProductDeletePopupComponent,
        ],
        providers: [
            _1.ProductService,
            _1.ProductPopupService,
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], DevizionProductModule);
exports.DevizionProductModule = DevizionProductModule;
