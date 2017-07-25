import { Custumer } from '../custumer';
import { Product } from '../product';
export class UserOrder {
    constructor(
        public id?: number,
        public photoUri?: string,
        public cropedUri?: string,
        public description?: string,
        public orderedAt?: any,
        public custumer?: Custumer,
        public product?: Product,
    ) {
    }
}
