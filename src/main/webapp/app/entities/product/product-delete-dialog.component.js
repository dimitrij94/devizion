"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductDeleteDialogComponent = (function () {
    function ProductDeleteDialogComponent(jhiLanguageService, productService, activeModal, eventManager) {
        this.jhiLanguageService = jhiLanguageService;
        this.productService = productService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
        this.jhiLanguageService.setLocations(['product']);
    }
    ProductDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    ProductDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.productService.delete(id).subscribe(function (response) {
            _this.eventManager.broadcast({
                name: 'productListModification',
                content: 'Deleted an product'
            });
            _this.activeModal.dismiss(true);
        });
    };
    return ProductDeleteDialogComponent;
}());
ProductDeleteDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-delete-dialog',
        templateUrl: './product-delete-dialog.component.html'
    })
], ProductDeleteDialogComponent);
exports.ProductDeleteDialogComponent = ProductDeleteDialogComponent;
var ProductDeletePopupComponent = (function () {
    function ProductDeletePopupComponent(route, productPopupService) {
        this.route = route;
        this.productPopupService = productPopupService;
    }
    ProductDeletePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.modalRef = _this.productPopupService
                .open(ProductDeleteDialogComponent, params['id']);
        });
    };
    ProductDeletePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return ProductDeletePopupComponent;
}());
ProductDeletePopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-delete-popup',
        template: ''
    })
], ProductDeletePopupComponent);
exports.ProductDeletePopupComponent = ProductDeletePopupComponent;
