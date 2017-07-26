"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CustumerDeleteDialogComponent = (function () {
    function CustumerDeleteDialogComponent(jhiLanguageService, custumerService, activeModal, eventManager) {
        this.jhiLanguageService = jhiLanguageService;
        this.custumerService = custumerService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
        this.jhiLanguageService.setLocations(['custumer']);
    }
    CustumerDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    CustumerDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.custumerService.delete(id).subscribe(function (response) {
            _this.eventManager.broadcast({
                name: 'custumerListModification',
                content: 'Deleted an custumer'
            });
            _this.activeModal.dismiss(true);
        });
    };
    return CustumerDeleteDialogComponent;
}());
CustumerDeleteDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-custumer-delete-dialog',
        templateUrl: './custumer-delete-dialog.component.html'
    })
], CustumerDeleteDialogComponent);
exports.CustumerDeleteDialogComponent = CustumerDeleteDialogComponent;
var CustumerDeletePopupComponent = (function () {
    function CustumerDeletePopupComponent(route, custumerPopupService) {
        this.route = route;
        this.custumerPopupService = custumerPopupService;
    }
    CustumerDeletePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.modalRef = _this.custumerPopupService
                .open(CustumerDeleteDialogComponent, params['id']);
        });
    };
    CustumerDeletePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return CustumerDeletePopupComponent;
}());
CustumerDeletePopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-custumer-delete-popup',
        template: ''
    })
], CustumerDeletePopupComponent);
exports.CustumerDeletePopupComponent = CustumerDeletePopupComponent;
