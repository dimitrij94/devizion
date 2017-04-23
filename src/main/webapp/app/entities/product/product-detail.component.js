"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductDetailComponent = (function () {
    function ProductDetailComponent(eventManager, jhiLanguageService, productService, route) {
        this.eventManager = eventManager;
        this.jhiLanguageService = jhiLanguageService;
        this.productService = productService;
        this.route = route;
        this.jhiLanguageService.setLocations(['product']);
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.load(params['id']);
        });
        this.registerChangeInProducts();
    };
    ProductDetailComponent.prototype.load = function (id) {
        var _this = this;
        this.productService.find(id).subscribe(function (product) {
            _this.product = product;
        });
    };
    ProductDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    ProductDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    };
    ProductDetailComponent.prototype.registerChangeInProducts = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('productListModification', function (response) { return _this.load(_this.product.id); });
    };
    return ProductDetailComponent;
}());
ProductDetailComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-detail',
        templateUrl: './product-detail.component.html'
    })
], ProductDetailComponent);
exports.ProductDetailComponent = ProductDetailComponent;
