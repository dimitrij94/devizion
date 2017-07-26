"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var product_module_1 = require("./product/product.module");
var user_order_module_1 = require("./user-order/user-order.module");
var custumer_module_1 = require("./custumer/custumer.module");
var product_category_module_1 = require("./product-category/product-category.module");
var image_token_module_1 = require("./image-token/image-token.module");
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */
var DevizionEntityModule = (function () {
    function DevizionEntityModule() {
    }
    return DevizionEntityModule;
}());
DevizionEntityModule = __decorate([
    core_1.NgModule({
        imports: [
            product_module_1.DevizionProductModule,
            user_order_module_1.DevizionUserOrderModule,
            custumer_module_1.DevizionCustumerModule,
            product_category_module_1.DevizionProductCategoryModule,
            image_token_module_1.DevizionImageTokenModule,
        ],
        declarations: [],
        entryComponents: [],
        providers: [],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], DevizionEntityModule);
exports.DevizionEntityModule = DevizionEntityModule;
