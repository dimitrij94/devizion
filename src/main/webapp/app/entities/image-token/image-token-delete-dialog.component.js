"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ImageTokenDeleteDialogComponent = (function () {
    function ImageTokenDeleteDialogComponent(jhiLanguageService, imageTokenService, activeModal, eventManager) {
        this.jhiLanguageService = jhiLanguageService;
        this.imageTokenService = imageTokenService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
        this.jhiLanguageService.setLocations(['imageToken']);
    }
    ImageTokenDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    ImageTokenDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.imageTokenService.delete(id).subscribe(function (response) {
            _this.eventManager.broadcast({
                name: 'imageTokenListModification',
                content: 'Deleted an imageToken'
            });
            _this.activeModal.dismiss(true);
        });
    };
    return ImageTokenDeleteDialogComponent;
}());
ImageTokenDeleteDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-image-token-delete-dialog',
        templateUrl: './image-token-delete-dialog.component.html'
    })
], ImageTokenDeleteDialogComponent);
exports.ImageTokenDeleteDialogComponent = ImageTokenDeleteDialogComponent;
var ImageTokenDeletePopupComponent = (function () {
    function ImageTokenDeletePopupComponent(route, imageTokenPopupService) {
        this.route = route;
        this.imageTokenPopupService = imageTokenPopupService;
    }
    ImageTokenDeletePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.modalRef = _this.imageTokenPopupService
                .open(ImageTokenDeleteDialogComponent, params['id']);
        });
    };
    ImageTokenDeletePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return ImageTokenDeletePopupComponent;
}());
ImageTokenDeletePopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-image-token-delete-popup',
        template: ''
    })
], ImageTokenDeletePopupComponent);
exports.ImageTokenDeletePopupComponent = ImageTokenDeletePopupComponent;
