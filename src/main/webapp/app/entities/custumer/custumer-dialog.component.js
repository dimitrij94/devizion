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
var CustumerDialogComponent = (function () {
    function CustumerDialogComponent(activeModal, jhiLanguageService, alertService, custumerService, eventManager, imageService, authServiceProvider) {
        this.activeModal = activeModal;
        this.jhiLanguageService = jhiLanguageService;
        this.alertService = alertService;
        this.custumerService = custumerService;
        this.eventManager = eventManager;
        this.imageService = imageService;
        this.authServiceProvider = authServiceProvider;
        this.imageToken = {};
        this.jhiLanguageService.setLocations(['custumer']);
    }
    CustumerDialogComponent.prototype.onRemove = function ($event) {
        var _this = this;
        this.imageService
            .imageUploadCancel(this.imageToken[$event.file.name].id, image_service_1.custumerSubdirectory)
            .subscribe(function () {
            delete _this.imageToken[$event.file.name];
        });
    };
    CustumerDialogComponent.prototype.onLoad = function ($event) {
        if ($event.serverResponse.status == 200) {
            var imageToken = JSON.parse($event.serverResponse.response);
            this.custumer.custumerImageUri = imageToken.path;
            this.imageToken[$event.file.name] = imageToken;
        }
        else
            this.onError($event.serverResponse.json());
    };
    CustumerDialogComponent.prototype.ngOnInit = function () {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    };
    CustumerDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    CustumerDialogComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        if (this.custumer.id !== undefined) {
            this.custumerService.update(this.custumer)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
        else {
            this.custumerService.create(this.custumer)
                .subscribe(function (res) {
                return _this.onSaveSuccess(res);
            }, function (res) { return _this.onSaveError(res); });
        }
    };
    CustumerDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'custumerListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    CustumerDialogComponent.prototype.onSaveError = function (error) {
        try {
            error.json();
        }
        catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    };
    CustumerDialogComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    return CustumerDialogComponent;
}());
CustumerDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-custumer-dialog',
        templateUrl: './custumer-dialog.component.html'
    })
], CustumerDialogComponent);
exports.CustumerDialogComponent = CustumerDialogComponent;
var CustumerPopupComponent = (function () {
    function CustumerPopupComponent(route, custumerPopupService) {
        this.route = route;
        this.custumerPopupService = custumerPopupService;
    }
    CustumerPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.modalRef = _this.custumerPopupService
                    .open(CustumerDialogComponent, params['id']);
            }
            else {
                _this.modalRef = _this.custumerPopupService
                    .open(CustumerDialogComponent);
            }
        });
    };
    CustumerPopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return CustumerPopupComponent;
}());
CustumerPopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-custumer-popup',
        template: ''
    })
], CustumerPopupComponent);
exports.CustumerPopupComponent = CustumerPopupComponent;
