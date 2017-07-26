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
var image_size_model_1 = require("../../shared/image/image-size.model");
var CustumerComponent = (function () {
    function CustumerComponent(jhiLanguageService, custumerService, alertService, eventManager, imageService, principal) {
        this.jhiLanguageService = jhiLanguageService;
        this.custumerService = custumerService;
        this.alertService = alertService;
        this.eventManager = eventManager;
        this.imageService = imageService;
        this.principal = principal;
        this.jhiLanguageService.setLocations(['custumer']);
    }
    CustumerComponent.prototype.loadAll = function () {
        var _this = this;
        this.custumerService.query().subscribe(function (res) {
            var custumers = res.json();
            custumers.forEach(function (custumer) {
                custumer.custumerImageUri = image_service_1.MyImageService.getImagePathOfSize(image_service_1.custumerSubdirectory, custumer.custumerImageUri, window.innerWidth, image_size_model_1.twentyScalar);
            });
            _this.custumers = custumers;
        }, function (res) { return _this.onError(res.json()); });
    };
    CustumerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAll();
        this.principal.identity().then(function (account) {
            _this.currentAccount = account;
        });
        this.registerChangeInCustumers();
    };
    CustumerComponent.prototype.ngOnDestroy = function () {
        this.eventManager.destroy(this.eventSubscriber);
    };
    CustumerComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    CustumerComponent.prototype.registerChangeInCustumers = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('custumerListModification', function (response) { return _this.loadAll(); });
    };
    CustumerComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    return CustumerComponent;
}());
CustumerComponent = __decorate([
    core_1.Component({
        selector: 'jhi-custumer',
        templateUrl: './custumer.component.html',
        styleUrls: ['./custumer.component.style.scss']
    })
], CustumerComponent);
exports.CustumerComponent = CustumerComponent;
