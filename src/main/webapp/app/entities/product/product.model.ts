import { UserOrder } from '../user-order';
export class Product {
    constructor(
        public id?: number,
        public productName?: string,
        public productPrice?: number,
        public productDescription?: string,
        public userOrder?: UserOrder,
    ) {
    }
}
