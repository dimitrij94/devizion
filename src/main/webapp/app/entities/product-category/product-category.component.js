"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductCategoryComponent = (function () {
    function ProductCategoryComponent(jhiLanguageService, productCategoryService, alertService, eventManager, principal) {
        this.jhiLanguageService = jhiLanguageService;
        this.productCategoryService = productCategoryService;
        this.alertService = alertService;
        this.eventManager = eventManager;
        this.principal = principal;
        this.jhiLanguageService.setLocations(['productCategory']);
    }
    ProductCategoryComponent.prototype.loadAll = function () {
        var _this = this;
        this.productCategoryService.query().subscribe(function (res) {
            var productCategories = res.json();
            productCategories.map(_this.productCategoryService.transformCategoryImageUri);
            _this.productCategories = productCategories;
        }, function (res) { return _this.onError(res.json()); });
    };
    ProductCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAll();
        this.principal.identity().then(function (account) {
            _this.currentAccount = account;
        });
        this.registerChangeInProductCategories();
    };
    ProductCategoryComponent.prototype.ngOnDestroy = function () {
        this.eventManager.destroy(this.eventSubscriber);
    };
    ProductCategoryComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    ProductCategoryComponent.prototype.registerChangeInProductCategories = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('productCategoryListModification', function (response) { return _this.loadAll(); });
    };
    ProductCategoryComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    return ProductCategoryComponent;
}());
ProductCategoryComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-category',
        templateUrl: './product-category.component.html'
    })
], ProductCategoryComponent);
exports.ProductCategoryComponent = ProductCategoryComponent;
