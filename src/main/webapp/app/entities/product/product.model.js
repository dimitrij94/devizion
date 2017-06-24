"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = (function () {
    function Product(id, productName, productPrice, productDescription, productImageUri, croppedImageUri, productSelfCost, orderedProduct, productCategory) {
        this.id = id;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
        this.productImageUri = productImageUri;
        this.croppedImageUri = croppedImageUri;
        this.productSelfCost = productSelfCost;
        this.orderedProduct = orderedProduct;
        this.productCategory = productCategory;
    }
    return Product;
}());
exports.Product = Product;
