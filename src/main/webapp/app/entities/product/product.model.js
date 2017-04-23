"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = (function () {
    function Product(id, productName, productPrice, productDescription, productImageUri, userOrder, productCategory) {
        this.id = id;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
        this.productImageUri = productImageUri;
        this.userOrder = userOrder;
        this.productCategory = productCategory;
    }
    return Product;
}());
exports.Product = Product;
