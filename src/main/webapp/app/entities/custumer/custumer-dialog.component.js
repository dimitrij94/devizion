"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CustumerDialogComponent = (function () {
    function CustumerDialogComponent(activeModal, jhiLanguageService, alertService, custumerService, eventManager) {
        this.activeModal = activeModal;
        this.jhiLanguageService = jhiLanguageService;
        this.alertService = alertService;
        this.custumerService = custumerService;
        this.eventManager = eventManager;
        this.jhiLanguageService.setLocations(['custumer']);
    }
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
