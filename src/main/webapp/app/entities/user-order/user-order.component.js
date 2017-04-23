"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserOrderComponent = (function () {
    function UserOrderComponent(jhiLanguageService, userOrderService, alertService, eventManager, principal) {
        this.jhiLanguageService = jhiLanguageService;
        this.userOrderService = userOrderService;
        this.alertService = alertService;
        this.eventManager = eventManager;
        this.principal = principal;
        this.jhiLanguageService.setLocations(['userOrder']);
    }
    UserOrderComponent.prototype.loadAll = function () {
        var _this = this;
        this.userOrderService.query().subscribe(function (res) {
            _this.userOrders = res.json();
        }, function (res) { return _this.onError(res.json()); });
    };
    UserOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAll();
        this.principal.identity().then(function (account) {
            _this.currentAccount = account;
        });
        this.registerChangeInUserOrders();
    };
    UserOrderComponent.prototype.ngOnDestroy = function () {
        this.eventManager.destroy(this.eventSubscriber);
    };
    UserOrderComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    UserOrderComponent.prototype.registerChangeInUserOrders = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('userOrderListModification', function (response) { return _this.loadAll(); });
    };
    UserOrderComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    return UserOrderComponent;
}());
UserOrderComponent = __decorate([
    core_1.Component({
        selector: 'jhi-user-order',
        templateUrl: './user-order.component.html'
    })
], UserOrderComponent);
exports.UserOrderComponent = UserOrderComponent;
