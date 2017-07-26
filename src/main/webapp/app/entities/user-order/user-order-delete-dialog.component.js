"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserOrderDeleteDialogComponent = (function () {
    function UserOrderDeleteDialogComponent(jhiLanguageService, userOrderService, activeModal, eventManager) {
        this.jhiLanguageService = jhiLanguageService;
        this.userOrderService = userOrderService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
        this.jhiLanguageService.setLocations(['userOrder']);
    }
    UserOrderDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    UserOrderDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.userOrderService.delete(id).subscribe(function (response) {
            _this.eventManager.broadcast({
                name: 'userOrderListModification',
                content: 'Deleted an userOrder'
            });
            _this.activeModal.dismiss(true);
        });
    };
    return UserOrderDeleteDialogComponent;
}());
UserOrderDeleteDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-user-order-delete-dialog',
        templateUrl: './user-order-delete-dialog.component.html'
    })
], UserOrderDeleteDialogComponent);
exports.UserOrderDeleteDialogComponent = UserOrderDeleteDialogComponent;
var UserOrderDeletePopupComponent = (function () {
    function UserOrderDeletePopupComponent(route, userOrderPopupService) {
        this.route = route;
        this.userOrderPopupService = userOrderPopupService;
    }
    UserOrderDeletePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.modalRef = _this.userOrderPopupService
                .open(UserOrderDeleteDialogComponent, params['id']);
        });
    };
    UserOrderDeletePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return UserOrderDeletePopupComponent;
}());
UserOrderDeletePopupComponent = __decorate([
    core_1.Component({
        selector: 'jhi-user-order-delete-popup',
        template: ''
    })
], UserOrderDeletePopupComponent);
exports.UserOrderDeletePopupComponent = UserOrderDeletePopupComponent;
