import {UserOrder} from "../user-order";
export class Custumer {
    constructor(
        public id?: number,
        public custumerName?: string,
        public custumerSurname?: string,
        public custumerContactNumber?: string,
        public custumerImageUri?: string,
        public custumerOrders?: UserOrder,
    ) {
    }
}
