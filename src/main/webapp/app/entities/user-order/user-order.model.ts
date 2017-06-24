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
        public croppCoordinateX1?:number,
        public croppCoordinateX2?:number,
        public croppCoordinateY1?:number,
        public croppCoordinateY2?:number,
    ) {
    }
}
