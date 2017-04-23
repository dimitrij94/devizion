"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductCategoryDetailComponent = (function () {
    function ProductCategoryDetailComponent(eventManager, jhiLanguageService, productCategoryService, route) {
        this.eventManager = eventManager;
        this.jhiLanguageService = jhiLanguageService;
        this.productCategoryService = productCategoryService;
        this.route = route;
        this.jhiLanguageService.setLocations(['productCategory']);
    }
    ProductCategoryDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.load(params['id']);
        });
        this.registerChangeInProductCategories();
    };
    ProductCategoryDetailComponent.prototype.load = function (id) {
        var _this = this;
        this.productCategoryService.find(id).subscribe(function (productCategory) {
            _this.productCategory = productCategory;
        });
    };
    ProductCategoryDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    ProductCategoryDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    };
    ProductCategoryDetailComponent.prototype.registerChangeInProductCategories = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('productCategoryListModification', function (response) { return _this.load(_this.productCategory.id); });
    };
    return ProductCategoryDetailComponent;
}());
ProductCategoryDetailComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-category-detail',
        templateUrl: './product-category-detail.component.html'
    })
], ProductCategoryDetailComponent);
exports.ProductCategoryDetailComponent = ProductCategoryDetailComponent;
