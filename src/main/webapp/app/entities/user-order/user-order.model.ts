import { Product } from '../product';
import { Custumer } from '../custumer';
export class UserOrder {
    constructor(
        public id?: number,
        public orderNotes?: string,
        public orderedAt?: any,
        public orderedProduct?: Product,
        public custumer?: Custumer,
    ) {
    }
}
