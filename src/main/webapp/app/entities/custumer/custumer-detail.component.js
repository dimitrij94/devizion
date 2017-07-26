"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CustumerDetailComponent = (function () {
    function CustumerDetailComponent(eventManager, jhiLanguageService, custumerService, authServiceProvider, alertService, imageService, route) {
        this.eventManager = eventManager;
        this.jhiLanguageService = jhiLanguageService;
        this.custumerService = custumerService;
        this.authServiceProvider = authServiceProvider;
        this.alertService = alertService;
        this.imageService = imageService;
        this.route = route;
        this.jhiLanguageService.setLocations(['custumer']);
    }
    CustumerDetailComponent.prototype.onRemove = function ($event) {
        var _this = this;
        this.imageService
            .imageUploadCancel(this.imageToken[$event.file.name].id, "custumer")
            .subscribe(function () {
            delete _this.imageToken[$event.file.name];
        });
    };
    CustumerDetailComponent.prototype.onLoad = function ($event) {
        if ($event.serverResponse.status == 200) {
            var imageToken = JSON.parse($event.serverResponse.response);
            this.custumer.custumerImageUri = imageToken.path;
            this.imageToken[$event.file.name] = imageToken;
        }
        else
            this.onError($event.serverResponse.json());
    };
    CustumerDetailComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    CustumerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.load(params['id']);
        });
        this.registerChangeInCustumers();
    };
    CustumerDetailComponent.prototype.load = function (id) {
        var _this = this;
        this.custumerService.find(id).subscribe(function (custumer) {
            _this.custumer = custumer;
        });
    };
    CustumerDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    CustumerDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    };
    CustumerDetailComponent.prototype.registerChangeInCustumers = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('custumerListModification', function (response) { return _this.load(_this.custumer.id); });
    };
    return CustumerDetailComponent;
}());
CustumerDetailComponent = __decorate([
    core_1.Component({
        selector: 'jhi-custumer-detail',
        templateUrl: './custumer-detail.component.html'
    })
], CustumerDetailComponent);
exports.CustumerDetailComponent = CustumerDetailComponent;
