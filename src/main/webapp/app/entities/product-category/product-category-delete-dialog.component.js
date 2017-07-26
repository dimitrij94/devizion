"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductCategoryDeleteDialogComponent = (function () {
    function ProductCategoryDeleteDialogComponent(jhiLanguageService, productCategoryService, activeModal, eventManager) {
        this.jhiLanguageService = jhiLanguageService;
        this.productCategoryService = productCategoryService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
        this.jhiLanguageService.setLocations(['productCategory']);
    }
    ProductCategoryDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    ProductCategoryDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.productCategoryService.delete(id).subscribe(function (response) {
            _this.eventManager.broadcast({
                name: 'productCategoryListModification',
                content: 'Deleted an productCategory'
            });
            _this.activeModal.dismiss(true);
        });
    };
    return ProductCategoryDeleteDialogComponent;
}());
ProductCategoryDeleteDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-category-delete-dialog',
        templateUrl: './product-category-delete-dialog.component.html'
    })
], ProductCategoryDeleteDialogComponent);
exports.ProductCategoryDeleteDialogComponent = ProductCategoryDeleteDialogComponent;
var ProductCategoryDeletePopupComponent = (function () {
    function ProductCategoryDeletePopupComponent(route, productCategoryPopupService) {
        this.route = route;
        this.productCategoryPopupService = productCategoryPopupService;
    }
    ProductCategoryDeletePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.modalRef = _this.productCategoryPopupService
                .open(ProductCategoryDeleteDialogComponent, params['id']);
        });
    };
    ProductCategoryDeletePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return ProductCategoryDeletePopupComponent;
}());
ProductCategoryDeletePopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-category-delete-popup',
        template: ''
    })
], ProductCategoryDeletePopupComponent);
exports.ProductCategoryDeletePopupComponent = ProductCategoryDeletePopupComponent;
