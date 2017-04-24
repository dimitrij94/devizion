import { UserOrder } from '../user-order';
import { PortfolioEntry } from '../portfolio-entry';
import { ProductCategory } from '../product-category';
export class Product {
    constructor(
        public id?: number,
        public productName?: string,
        public productPrice?: number,
        public productDescription?: string,
        public productImageUri?: string,
        public userOrder?: UserOrder,
        public portfolioEntry?: PortfolioEntry,
        public productCategory?: ProductCategory,
    ) {
    }
}
