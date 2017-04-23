"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductComponent = (function () {
    function ProductComponent(jhiLanguageService, productService, alertService, eventManager, principal) {
        this.jhiLanguageService = jhiLanguageService;
        this.productService = productService;
        this.alertService = alertService;
        this.eventManager = eventManager;
        this.principal = principal;
        this.jhiLanguageService.setLocations(['product']);
    }
    ProductComponent.prototype.loadAll = function () {
        var _this = this;
        var directory = "/content/images/products";
        this.productService.query().subscribe(function (res) {
            var products = res.json();
            products.map(_this.productService.transformImageUri);
            _this.products = products;
        }, function (res) { return _this.onError(res.json()); });
    };
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAll();
        this.principal.identity().then(function (account) {
            _this.currentAccount = account;
        });
        this.registerChangeInProducts();
    };
    ProductComponent.prototype.ngOnDestroy = function () {
        this.eventManager.destroy(this.eventSubscriber);
    };
    ProductComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    ProductComponent.prototype.registerChangeInProducts = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('productListModification', function (response) { return _this.loadAll(); });
    };
    ProductComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    return ProductComponent;
}());
ProductComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product',
        templateUrl: './product.component.html'
    })
], ProductComponent);
exports.ProductComponent = ProductComponent;
