"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var UserOrderService = (function () {
    function UserOrderService(http, dateUtils) {
        this.http = http;
        this.dateUtils = dateUtils;
        this.resourceUrl = 'api/user-orders';
    }
    UserOrderService.prototype.create = function (userOrder) {
        var copy = Object.assign({}, userOrder);
        copy.orderedAt = this.dateUtils
            .convertLocalDateToServer(userOrder.orderedAt);
        return this.http.post(this.resourceUrl, copy).map(function (res) {
            return res.json();
        });
    };
    UserOrderService.prototype.update = function (userOrder) {
        var copy = Object.assign({}, userOrder);
        copy.orderedAt = this.dateUtils
            .convertLocalDateToServer(userOrder.orderedAt);
        return this.http.put(this.resourceUrl, copy).map(function (res) {
            return res.json();
        });
    };
    UserOrderService.prototype.find = function (id) {
        var _this = this;
        return this.http.get(this.resourceUrl + "/" + id).map(function (res) {
            var jsonResponse = res.json();
            jsonResponse.orderedAt = _this.dateUtils
                .convertLocalDateFromServer(jsonResponse.orderedAt);
            return jsonResponse;
        });
    };
    UserOrderService.prototype.query = function (req) {
        var _this = this;
        var options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map(function (res) { return _this.convertResponse(res); });
    };
    UserOrderService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id);
    };
    UserOrderService.prototype.convertResponse = function (res) {
        var jsonResponse = res.json();
        for (var i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].orderedAt = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].orderedAt);
        }
        res._body = jsonResponse;
        return res;
    };
    UserOrderService.prototype.createRequestOption = function (req) {
        var options = new http_1.BaseRequestOptions();
        if (req) {
            var params = new http_1.URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);
            options.search = params;
        }
        return options;
    };
    return UserOrderService;
}());
UserOrderService = __decorate([
    core_1.Injectable()
], UserOrderService);
exports.UserOrderService = UserOrderService;
