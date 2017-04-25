import { UserOrder } from '../user-order';
import { ProductCategory } from '../product-category';
export class Product {
    constructor(
        public id?: number,
        public productName?: string,
        public productPrice?: number,
        public productDescription?: string,
        public productSelfCost?: number,
        public productImageUri?: string,
        public userOrder?: UserOrder,
        public productCategory?: ProductCategory,
    ) {
    }
}
