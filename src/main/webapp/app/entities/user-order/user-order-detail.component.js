"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserOrderDetailComponent = (function () {
    function UserOrderDetailComponent(eventManager, jhiLanguageService, userOrderService, route) {
        this.eventManager = eventManager;
        this.jhiLanguageService = jhiLanguageService;
        this.userOrderService = userOrderService;
        this.route = route;
        this.jhiLanguageService.setLocations(['userOrder']);
    }
    UserOrderDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.load(params['id']);
        });
        this.registerChangeInUserOrders();
    };
    UserOrderDetailComponent.prototype.load = function (id) {
        var _this = this;
        this.userOrderService.find(id).subscribe(function (userOrder) {
            _this.userOrder = userOrder;
        });
    };
    UserOrderDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    UserOrderDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    };
    UserOrderDetailComponent.prototype.registerChangeInUserOrders = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('userOrderListModification', function (response) { return _this.load(_this.userOrder.id); });
    };
    return UserOrderDetailComponent;
}());
UserOrderDetailComponent = __decorate([
    core_1.Component({
        selector: 'jhi-user-order-detail',
        templateUrl: './user-order-detail.component.html'
    })
], UserOrderDetailComponent);
exports.UserOrderDetailComponent = UserOrderDetailComponent;
