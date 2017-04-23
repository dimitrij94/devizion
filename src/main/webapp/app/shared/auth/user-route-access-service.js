"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserRouteAccessService = (function () {
    function UserRouteAccessService(router, loginModalService, principal, stateStorageService) {
        this.router = router;
        this.loginModalService = loginModalService;
        this.principal = principal;
        this.stateStorageService = stateStorageService;
    }
    UserRouteAccessService.prototype.canActivate = function (route, state) {
        return this.checkLogin(route.data['authorities'], state.url);
    };
    UserRouteAccessService.prototype.checkLogin = function (authorities, url) {
        var _this = this;
        return Promise.resolve(this.principal.hasAnyAuthority(authorities).then(function (isOk) {
            if (isOk) {
                return true;
            }
            else {
                _this.stateStorageService.storeUrl(url);
                _this.router.navigate(['accessdenied']).then(function () {
                    _this.loginModalService.open();
                });
                return false;
            }
        }));
    };
    return UserRouteAccessService;
}());
UserRouteAccessService = __decorate([
    core_1.Injectable()
], UserRouteAccessService);
exports.UserRouteAccessService = UserRouteAccessService;
