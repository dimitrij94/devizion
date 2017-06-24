"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_size_model_1 = require("./image-size.model");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * Created by Dmitrij on 19.04.2017.
 */
exports.productSubdirectory = "/products";
exports.categorySubdirectory = "/categories";
exports.portfolioSubdirectory = "/portfolio";
exports.custumerSubdirectory = '/custumer';
exports.imageRootPath = '/api/image';
var MyCropBounds = (function () {
    function MyCropBounds(bounds) {
        this.left = bounds.left;
        this.right = bounds.right;
        this.top = bounds.top;
        this.bottom = bounds.bottom;
        this.width = bounds.width;
        this.height = bounds.height;
    }
    return MyCropBounds;
}());
exports.MyCropBounds = MyCropBounds;
var MyImageService = MyImageService_1 = (function () {
    function MyImageService(http) {
        this.http = http;
    }
    MyImageService.prototype.postCropBounds = function (bounds, subdir) {
        var copy = Object.assign({}, bounds);
        return this.http.post('/api' + subdir + '/image/cropped', copy)
            .map(function (res) {
            return res.json();
        });
    };
    MyImageService.prototype.postImage = function (url, image, headers, progressCallback) {
        if (!url || url === '') {
            throw new Error('Url is not set! Please set it before doing queries');
        }
        return rxjs_1.Observable.create(function (observer) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append('image', image);
            if (progressCallback)
                xhr.onprogress = function (event) {
                    progressCallback(event.loaded / event.total);
                };
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next({ response: xhr.response, status: xhr.status });
                        observer.complete();
                    }
                    else {
                        observer.error({ response: xhr.response, status: xhr.status });
                    }
                }
            };
            xhr.open('POST', url, true);
            if (headers)
                for (var i = 0; i < headers.length; i++) {
                    var header = headers[i];
                    xhr.setRequestHeader(header.header, header.value);
                }
            xhr.send(formData);
        });
    };
    MyImageService.prototype.imageUploadCancel = function (tokenId, subdirectory) {
        var requestParams = new URLSearchParams();
        requestParams.set('token_id', tokenId.toString());
        return this.http.delete('api/' + subdirectory + '/image', { search: requestParams });
    };
    MyImageService.getProductImageUri = function (fileName) {
        return '/api/image/products?imageName=' + fileName;
    };
    MyImageService.getCategoryImage = function (fileName) {
        return '/api/image/categories?imageName=' + fileName;
    };
    MyImageService.getImagePathOfSize = function (subdirectory, fileName, windowWidth, scalar) {
        var imageSize = MyImageService_1.getImageSize(windowWidth, scalar);
        return exports.imageRootPath + '/size' + subdirectory +
            "?imageName=" + fileName +
            "&imageScalarSize=" + imageSize.scalar.toString() +
            "&screenSize=" + image_size_model_1.ScreenSize[imageSize.screenSize];
    };
    MyImageService.getImageSize = function (windowWidth, scalar) {
        var imageSize = { scalar: scalar };
        if (windowWidth <= 599) {
            imageSize.screenSize = image_size_model_1.ScreenSize.xs;
        }
        if (windowWidth >= 600 && windowWidth <= 959) {
            imageSize.screenSize = image_size_model_1.ScreenSize.sm;
        }
        if (windowWidth >= 960 && windowWidth <= 1279) {
            imageSize.screenSize = image_size_model_1.ScreenSize.md;
        }
        if (windowWidth >= 1280) {
            imageSize.screenSize = image_size_model_1.ScreenSize.lg;
        }
        return imageSize;
    };
    return MyImageService;
}());
MyImageService = MyImageService_1 = __decorate([
    core_1.Injectable()
], MyImageService);
exports.MyImageService = MyImageService;
var MyImageService_1;
