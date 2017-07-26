"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductCategoryDialogComponent = (function () {
    function ProductCategoryDialogComponent(activeModal, jhiLanguageService, alertService, productCategoryService, eventManager, authServiceProvider) {
        this.activeModal = activeModal;
        this.jhiLanguageService = jhiLanguageService;
        this.alertService = alertService;
        this.productCategoryService = productCategoryService;
        this.eventManager = eventManager;
        this.authServiceProvider = authServiceProvider;
        this.imageToken = {};
        this.jhiLanguageService.setLocations(['productCategory']);
    }
    ProductCategoryDialogComponent.prototype.onLoad = function ($event) {
        if ($event.serverResponse.status == 200) {
            var imageToken = JSON.parse($event.serverResponse.response);
            this.productCategory.categoryPhotoUri = imageToken.path;
            this.imageToken[$event.file.name] = imageToken;
        }
        else
            this.onError($event.serverResponse.json());
    };
    ProductCategoryDialogComponent.prototype.onRemove = function ($event) {
        var _this = this;
        this.productCategoryService
            .categoryImageUploadCancel(this.imageToken[$event.file.name].id)
            .subscribe(function () {
            delete _this.imageToken[$event.file.name];
        });
    };
    ProductCategoryDialogComponent.prototype.ngOnInit = function () {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    };
    ProductCategoryDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    ProductCategoryDialogComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        if (this.productCategory.id !== undefined) {
            this.productCategoryService.update(this.productCategory)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
        else {
            this.productCategoryService.create(this.productCategory)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
    };
    ProductCategoryDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'productCategoryListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    ProductCategoryDialogComponent.prototype.onSaveError = function (error) {
        try {
            error.json();
        }
        catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    };
    ProductCategoryDialogComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    return ProductCategoryDialogComponent;
}());
ProductCategoryDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-category-dialog',
        templateUrl: './product-category-dialog.component.html'
    })
], ProductCategoryDialogComponent);
exports.ProductCategoryDialogComponent = ProductCategoryDialogComponent;
var ProductCategoryPopupComponent = (function () {
    function ProductCategoryPopupComponent(route, productCategoryPopupService) {
        this.route = route;
        this.productCategoryPopupService = productCategoryPopupService;
    }
    ProductCategoryPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.modalRef = _this.productCategoryPopupService
                    .open(ProductCategoryDialogComponent, params['id']);
            }
            else {
                _this.modalRef = _this.productCategoryPopupService
                    .open(ProductCategoryDialogComponent);
            }
        });
    };
    ProductCategoryPopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return ProductCategoryPopupComponent;
}());
ProductCategoryPopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-product-category-popup',
        template: ''
    })
], ProductCategoryPopupComponent);
exports.ProductCategoryPopupComponent = ProductCategoryPopupComponent;
