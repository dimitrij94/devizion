"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var _1 = require("./");
var sidenav_service_1 = require("./sidenav.service");
var image_service_1 = require("./image/image.service");
var DevizionSharedModule = (function () {
    function DevizionSharedModule() {
    }
    return DevizionSharedModule;
}());
DevizionSharedModule = __decorate([
    core_1.NgModule({
        imports: [
            _1.DevizionSharedLibsModule,
            _1.DevizionSharedCommonModule
        ],
        declarations: [
            _1.JhiLoginModalComponent,
            _1.HasAnyAuthorityDirective,
        ],
        providers: [
            cookies_service_1.CookieService,
            _1.LoginService,
            _1.LoginModalService,
            _1.AccountService,
            _1.StateStorageService,
            _1.Principal,
            _1.CSRFService,
            _1.AuthServerProvider,
            _1.AuthService,
            _1.UserService,
            common_1.DatePipe,
            sidenav_service_1.SidenavService,
            image_service_1.MyImageService
        ],
        entryComponents: [_1.JhiLoginModalComponent],
        exports: [
            _1.DevizionSharedCommonModule,
            _1.JhiLoginModalComponent,
            _1.HasAnyAuthorityDirective,
            common_1.DatePipe
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], DevizionSharedModule);
exports.DevizionSharedModule = DevizionSharedModule;
