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
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.resourceUrl = 'api/products';
        this.imagesDirectory = '/content/images/products';
    }
    ProductService.prototype.create = function (product) {
        var copy = Object.assign({}, product);
        return this.http.post(this.resourceUrl, copy).map(function (res) {
            return res.json();
        });
    };
    ProductService.prototype.transformImageUri = function (product) {
        var context = require.context(this.imagesDirectory, false, /\.(gif|jpe?g|tiff|png)$/i);
        product.productImageUri = context(product.productImageUri.replace('.' + this.imagesDirectory, ''));
        return product;
    };
    ProductService.prototype.productImageUploadCancel = function (tokenId) {
        var requestParams = new http_1.URLSearchParams();
        requestParams.set('token_id', tokenId.toString());
        return this.http.delete('api/product/image', { search: requestParams });
    };
    ProductService.prototype.update = function (product) {
        var copy = Object.assign({}, product);
        return this.http.put(this.resourceUrl, copy).map(function (res) {
            return res.json();
        });
    };
    ProductService.prototype.find = function (id) {
        return this.http.get(this.resourceUrl + "/" + id).map(function (res) {
            return res.json();
        });
    };
    ProductService.prototype.query = function (req) {
        var options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options);
    };
    ProductService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id);
    };
    ProductService.prototype.createRequestOption = function (req) {
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
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable()
], ProductService);
exports.ProductService = ProductService;
