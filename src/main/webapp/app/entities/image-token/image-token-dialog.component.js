"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ImageTokenDialogComponent = (function () {
    function ImageTokenDialogComponent(activeModal, jhiLanguageService, alertService, imageTokenService, eventManager) {
        this.activeModal = activeModal;
        this.jhiLanguageService = jhiLanguageService;
        this.alertService = alertService;
        this.imageTokenService = imageTokenService;
        this.eventManager = eventManager;
        this.jhiLanguageService.setLocations(['imageToken']);
    }
    ImageTokenDialogComponent.prototype.ngOnInit = function () {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    };
    ImageTokenDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    ImageTokenDialogComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        if (this.imageToken.id !== undefined) {
            this.imageTokenService.update(this.imageToken)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
        else {
            this.imageTokenService.create(this.imageToken)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
    };
    ImageTokenDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'imageTokenListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    ImageTokenDialogComponent.prototype.onSaveError = function (error) {
        try {
            error.json();
        }
        catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    };
    ImageTokenDialogComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    return ImageTokenDialogComponent;
}());
ImageTokenDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-image-token-dialog',
        templateUrl: './image-token-dialog.component.html'
    })
], ImageTokenDialogComponent);
exports.ImageTokenDialogComponent = ImageTokenDialogComponent;
var ImageTokenPopupComponent = (function () {
    function ImageTokenPopupComponent(route, imageTokenPopupService) {
        this.route = route;
        this.imageTokenPopupService = imageTokenPopupService;
    }
    ImageTokenPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.modalRef = _this.imageTokenPopupService
                    .open(ImageTokenDialogComponent, params['id']);
            }
            else {
                _this.modalRef = _this.imageTokenPopupService
                    .open(ImageTokenDialogComponent);
            }
        });
    };
    ImageTokenPopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return ImageTokenPopupComponent;
}());
ImageTokenPopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-image-token-popup',
        template: ''
    })
], ImageTokenPopupComponent);
exports.ImageTokenPopupComponent = ImageTokenPopupComponent;
