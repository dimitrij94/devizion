"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductDialogComponent = (function () {
    function ProductDialogComponent(activeModal, jhiLanguageService, alertService, productService, authServiceProvider, productCategoryService, eventManager) {
        this.activeModal = activeModal;
        this.jhiLanguageService = jhiLanguageService;
        this.alertService = alertService;
        this.productService = productService;
        this.authServiceProvider = authServiceProvider;
        this.productCategoryService = productCategoryService;
        this.eventManager = eventManager;
        this.imageToken = {};
        this.jhiLanguageService.setLocations(['product']);
    }
    ProductDialogComponent.prototype.onRemove = function ($event) {
        var _this = this;
        this.productService
            .productImageUploadCancel(this.imageToken[$event.file.name].id)
            .subscribe(function () {
            delete _this.imageToken[$event.file.name];
        });
    };
    ProductDialogComponent.prototype.onLoad = function ($event) {
        if ($event.serverResponse.status == 200) {
            var imageToken = JSON.parse($event.serverResponse.response);
            this.product.productImageUri = imageToken.path;
            this.imageToken[$event.file.name] = imageToken;
        }
        else
            this.onError($event.serverResponse.json());
    };
    ProductDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.productCategoryService.query().subscribe(function (res) {
            _this.productcategories = res.json();
        }, function (res) { return _this.onError(res.json()); });
    };
    ProductDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    ProductDialogComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.productService.update(this.product)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
        else {
            this.productService.create(this.product)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
    };
    ProductDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'productListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    ProductDialogComponent.prototype.onSaveError = function (error) {
        try {
            error.json();
        }
        catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    };
    ProductDialogComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    ProductDialogComponent.prototype.trackProductCategoryById = function (index, item) {
        return item.id;
    };
    return ProductDialogComponent;
}());
ProductDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-dialog',
        templateUrl: './product-dialog.component.html'
    })
], ProductDialogComponent);
exports.ProductDialogComponent = ProductDialogComponent;
var ProductPopupComponent = (function () {
    function ProductPopupComponent(route, productPopupService) {
        this.route = route;
        this.productPopupService = productPopupService;
    }
    ProductPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.modalRef = _this.productPopupService
                    .open(ProductDialogComponent, params['id']);
            }
            else {
                _this.modalRef = _this.productPopupService
                    .open(ProductDialogComponent);
            }
        });
    };
    ProductPopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return ProductPopupComponent;
}());
ProductPopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-popup',
        template: ''
    })
], ProductPopupComponent);
exports.ProductPopupComponent = ProductPopupComponent;
