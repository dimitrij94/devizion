import {UserOrder} from "../user-order";
import {ProductCategory} from "../product-category";
import {Page} from "../../shared/page.model";
export class Product {
    constructor(public id?: number,
                public productName?: string,
                public productPrice?: number,
                public productDescription?: string,
                public productImageUri?: string,
                public croppedImageUri?: string,
                public productSelfCost?: number,
                public orderedProduct?: UserOrder[],
                public productCategory?: ProductCategory) {
    }
}
export class ProductWithPortfolio extends Product {
    constructor(public id?: number,
                public productName?: string,
                public productPrice?: number,
                public productDescription?: string,
                public productImageUri?: string,
                public croppedImageUri?: string,
                public productSelfCost?: number,
                public orderedProduct?: UserOrder[],
                public categoryProductsPage?: Page<UserOrder>,
                public productCategory?: ProductCategory) {
        super(id, productName, productPrice, productDescription, productImageUri, croppedImageUri, productSelfCost, orderedProduct, productCategory);
    }
}
