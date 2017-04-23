"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ImageTokenDetailComponent = (function () {
    function ImageTokenDetailComponent(eventManager, jhiLanguageService, imageTokenService, route) {
        this.eventManager = eventManager;
        this.jhiLanguageService = jhiLanguageService;
        this.imageTokenService = imageTokenService;
        this.route = route;
        this.jhiLanguageService.setLocations(['imageToken']);
    }
    ImageTokenDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.load(params['id']);
        });
        this.registerChangeInImageTokens();
    };
    ImageTokenDetailComponent.prototype.load = function (id) {
        var _this = this;
        this.imageTokenService.find(id).subscribe(function (imageToken) {
            _this.imageToken = imageToken;
        });
    };
    ImageTokenDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    ImageTokenDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    };
    ImageTokenDetailComponent.prototype.registerChangeInImageTokens = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('imageTokenListModification', function (response) { return _this.load(_this.imageToken.id); });
    };
    return ImageTokenDetailComponent;
}());
ImageTokenDetailComponent = __decorate([
    core_1.Component({
        selector: 'jhi-image-token-detail',
        templateUrl: './image-token-detail.component.html'
    })
], ImageTokenDetailComponent);
exports.ImageTokenDetailComponent = ImageTokenDetailComponent;
