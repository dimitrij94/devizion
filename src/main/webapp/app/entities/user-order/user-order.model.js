"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserOrder = (function () {
    function UserOrder(id, photoUri, cropedUri, description, orderedAt, custumer, product, croppCoordinateX1, croppCoordinateX2, croppCoordinateY1, croppCoordinateY2) {
        this.id = id;
        this.photoUri = photoUri;
        this.cropedUri = cropedUri;
        this.description = description;
        this.orderedAt = orderedAt;
        this.custumer = custumer;
        this.product = product;
        this.croppCoordinateX1 = croppCoordinateX1;
        this.croppCoordinateX2 = croppCoordinateX2;
        this.croppCoordinateY1 = croppCoordinateY1;
        this.croppCoordinateY2 = croppCoordinateY2;
    }
    return UserOrder;
}());
exports.UserOrder = UserOrder;
