"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ImageTokenComponent = (function () {
    function ImageTokenComponent(jhiLanguageService, imageTokenService, alertService, eventManager, principal) {
        this.jhiLanguageService = jhiLanguageService;
        this.imageTokenService = imageTokenService;
        this.alertService = alertService;
        this.eventManager = eventManager;
        this.principal = principal;
        this.jhiLanguageService.setLocations(['imageToken']);
    }
    ImageTokenComponent.prototype.loadAll = function () {
        var _this = this;
        this.imageTokenService.query().subscribe(function (res) {
            _this.imageTokens = res.json();
        }, function (res) { return _this.onError(res.json()); });
    };
    ImageTokenComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAll();
        this.principal.identity().then(function (account) {
            _this.currentAccount = account;
        });
        this.registerChangeInImageTokens();
    };
    ImageTokenComponent.prototype.ngOnDestroy = function () {
        this.eventManager.destroy(this.eventSubscriber);
    };
    ImageTokenComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    ImageTokenComponent.prototype.registerChangeInImageTokens = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('imageTokenListModification', function (response) { return _this.loadAll(); });
    };
    ImageTokenComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    return ImageTokenComponent;
}());
ImageTokenComponent = __decorate([
    core_1.Component({
        selector: 'jhi-image-token',
        templateUrl: './image-token.component.html'
    })
], ImageTokenComponent);
exports.ImageTokenComponent = ImageTokenComponent;
