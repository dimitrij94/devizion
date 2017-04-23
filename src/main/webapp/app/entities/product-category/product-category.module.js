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
var ENTITY_STATES = _1.productCategoryRoute.concat(_1.productCategoryPopupRoute);
var DevizionProductCategoryModule = (function () {
    function DevizionProductCategoryModule() {
    }
    return DevizionProductCategoryModule;
}());
DevizionProductCategoryModule = __decorate([
    core_1.NgModule({
        imports: [
            angular2_image_upload_1.ImageUploadModule.forRoot(),
            shared_1.DevizionSharedModule,
            router_1.RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        ],
        declarations: [
            _1.ProductCategoryComponent,
            _1.ProductCategoryDetailComponent,
            _1.ProductCategoryDialogComponent,
            _1.ProductCategoryDeleteDialogComponent,
            _1.ProductCategoryPopupComponent,
            _1.ProductCategoryDeletePopupComponent,
        ],
        entryComponents: [
            _1.ProductCategoryComponent,
            _1.ProductCategoryDialogComponent,
            _1.ProductCategoryPopupComponent,
            _1.ProductCategoryDeleteDialogComponent,
            _1.ProductCategoryDeletePopupComponent,
        ],
        providers: [
            _1.ProductCategoryService,
            _1.ProductCategoryPopupService,
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], DevizionProductCategoryModule);
exports.DevizionProductCategoryModule = DevizionProductCategoryModule;
