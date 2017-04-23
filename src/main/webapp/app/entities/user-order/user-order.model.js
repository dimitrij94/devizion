"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserOrder = (function () {
    function UserOrder(id, orderNotes, orderedAt, orderedProduct, custumer) {
        this.id = id;
        this.orderNotes = orderNotes;
        this.orderedAt = orderedAt;
        this.orderedProduct = orderedProduct;
        this.custumer = custumer;
    }
    return UserOrder;
}());
exports.UserOrder = UserOrder;
