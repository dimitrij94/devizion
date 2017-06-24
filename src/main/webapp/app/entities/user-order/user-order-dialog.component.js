"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var image_service_1 = require("../../shared/image/image.service");
var UserOrderDialogComponent = (function () {
    function UserOrderDialogComponent(activeModal, jhiLanguageService, alertService, userOrderService, productService, custumerService, eventManager, authServiceProvider, imageService) {
        this.activeModal = activeModal;
        this.jhiLanguageService = jhiLanguageService;
        this.alertService = alertService;
        this.userOrderService = userOrderService;
        this.productService = productService;
        this.custumerService = custumerService;
        this.eventManager = eventManager;
        this.authServiceProvider = authServiceProvider;
        this.imageService = imageService;
        this.jhiLanguageService.setLocations(['userOrder']);
    }
    UserOrderDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.productService.query().subscribe(function (res) {
            _this.products = res.json();
        }, function (res) { return _this.onError(res.json()); });
        this.custumerService.query().subscribe(function (res) {
            _this.custumers = res.json();
        }, function (res) { return _this.onError(res.json()); });
    };
    UserOrderDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    UserOrderDialogComponent.prototype.onCroppedImageRemove = function (i) {
        this.imageService
            .imageUploadCancel(this.croppedImageToken.id, image_service_1.portfolioSubdirectory);
    };
    UserOrderDialogComponent.prototype.onOriginalImageRemove = function () {
        this.imageService.imageUploadCancel(this.originalImageToken.id, image_service_1.portfolioSubdirectory);
    };
    UserOrderDialogComponent.prototype.onOriginalImageLoad = function (imageToken) {
        this.userOrder.photoUri = imageToken.path;
        this.originalImageToken = imageToken;
    };
    UserOrderDialogComponent.prototype.onCroppedImageLoad = function (imageToken) {
        this.userOrder.cropedUri = imageToken.path;
        this.croppedImageToken = imageToken;
    };
    UserOrderDialogComponent.prototype.assignCropBounds = function ($event) {
        this.userOrder.croppCoordinateX1 = $event.cropX1;
        this.userOrder.croppCoordinateX2 = $event.cropX2;
        this.userOrder.croppCoordinateY1 = $event.cropY1;
        this.userOrder.croppCoordinateY2 = $event.cropY2;
    };
    UserOrderDialogComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        if (this.userOrder.id !== undefined) {
            this.userOrderService.update(this.userOrder)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
        else {
            this.userOrderService.create(this.userOrder)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
    };
    UserOrderDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'userOrderListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    UserOrderDialogComponent.prototype.onSaveError = function (error) {
        try {
            error.json();
        }
        catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    };
    UserOrderDialogComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    UserOrderDialogComponent.prototype.trackProductById = function (index, item) {
        return item.id;
    };
    UserOrderDialogComponent.prototype.trackCustumerById = function (index, item) {
        return item.id;
    };
    return UserOrderDialogComponent;
}());
UserOrderDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-user-order-dialog',
        templateUrl: './user-order-dialog.component.html'
    })
], UserOrderDialogComponent);
exports.UserOrderDialogComponent = UserOrderDialogComponent;
var UserOrderPopupComponent = (function () {
    function UserOrderPopupComponent(route, userOrderPopupService) {
        this.route = route;
        this.userOrderPopupService = userOrderPopupService;
    }
    UserOrderPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.modalRef = _this.userOrderPopupService
                    .open(UserOrderDialogComponent, params['id']);
            }
            else {
                _this.modalRef = _this.userOrderPopupService
                    .open(UserOrderDialogComponent);
            }
        });
    };
    UserOrderPopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return UserOrderPopupComponent;
}());
UserOrderPopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-user-order-popup',
        template: ''
    })
], UserOrderPopupComponent);
exports.UserOrderPopupComponent = UserOrderPopupComponent;
