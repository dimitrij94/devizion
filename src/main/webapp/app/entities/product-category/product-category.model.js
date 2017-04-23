"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductCategory = (function () {
    function ProductCategory(id, categoryName, categoryPhotoUri, categoryProducts) {
        this.id = id;
        this.categoryName = categoryName;
        this.categoryPhotoUri = categoryPhotoUri;
        this.categoryProducts = categoryProducts;
    }
    return ProductCategory;
}());
exports.ProductCategory = ProductCategory;
